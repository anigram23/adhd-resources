package io.github.anigaut.adhdresources.sectionBlock;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockRequestDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockResponseDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockUpdateDTO;
import io.github.anigaut.adhdresources.staticPageSection.StaticPageSection;
import io.github.anigaut.adhdresources.staticPageSection.StaticPageSectionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SectionBlockService {
    private final SectionBlockRepository sectionBlockRepository;
    private final StaticPageSectionRepository staticPageSectionRepository;
    private final SectionBlockMapper sectionBlockMapper;

    @Transactional
    public SectionBlockResponseDTO createSectionBlock(SectionBlockRequestDTO sectionBlockRequestDTO) {

        StaticPageSection section = staticPageSectionRepository.findById(sectionBlockRequestDTO.getStaticPageSectionId())
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A section with this ID doesn't exist"
                        )
                );

        if (sectionBlockRepository.existsByOrderIndexAndStaticPageSection(sectionBlockRequestDTO.getOrderIndex(), section)) {
            throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    "A section block already exists with the same order index"
            );
        }

        SectionBlock newBlock = sectionBlockRepository.save(sectionBlockMapper.toEntity(sectionBlockRequestDTO, section));
        return sectionBlockMapper.toDto(newBlock);
    }

    @Transactional
    public SectionBlockResponseDTO updateSectionBlock(int id, SectionBlockUpdateDTO sectionBlockUpdateDTO) {
        SectionBlock block =  sectionBlockRepository.findById(id)
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A section block with this ID doesn't exist"
                        )
                );


        if (sectionBlockUpdateDTO.getOrderIndex() != null && !sectionBlockUpdateDTO.getOrderIndex().equals(block.getOrderIndex())) {
            if (sectionBlockRepository.existsByOrderIndexAndStaticPageSection(sectionBlockUpdateDTO.getOrderIndex(), block.getStaticPageSection())) {
                throw new HttpException(
                        HttpStatus.BAD_REQUEST,
                        "A section block already exists with the same order index"
                );
            }
        }

        sectionBlockMapper.updateEntity(sectionBlockUpdateDTO, block);
        sectionBlockRepository.save(block);
        return sectionBlockMapper.toDto(block);
    }

    @Transactional
    public String deleteSectionBlock(int id) {
        SectionBlock sectionBlock = sectionBlockRepository.findById(id)
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A section block with this ID doesn't exist"
                        )
                );

        sectionBlockRepository.delete(sectionBlock);
        return "Section block deleted successfully";
    }
}
