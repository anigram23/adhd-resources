package io.github.anigaut.adhdresources.sectionBlock;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockRequestDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockResponseDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockUpdateDTO;
import io.github.anigaut.adhdresources.staticPageSection.StaticPageSection;
import io.github.anigaut.adhdresources.staticPageSection.StaticPageSectionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

@Service
public class SectionBlockService {
    private final SectionBlockRepository sectionBlockRepository;
    private final StaticPageSectionRepository  staticPageSectionRepository;

    @Autowired
    public SectionBlockService(
            SectionBlockRepository sectionBlockRepository,
            StaticPageSectionRepository staticPageSectionRepository
    ) {
        this.sectionBlockRepository = sectionBlockRepository;
        this.staticPageSectionRepository = staticPageSectionRepository;
    }

    @Transactional
    public SectionBlockResponseDTO createSectionBlock(SectionBlockRequestDTO sectionBlockRequestDTO) {
        if (sectionBlockRepository.existsByOrderIndex(sectionBlockRequestDTO.getOrderIndex())) {
            throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    "A section block already exists with the same order index"
            );
        }

        StaticPageSection section = staticPageSectionRepository.findById(sectionBlockRequestDTO.getStaticPageSectionId())
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A section with this ID doesn't exist"
                        )
                );

        SectionBlock sectionBlock = new SectionBlock();
        sectionBlock.setContent(sectionBlockRequestDTO.getContent());
        sectionBlock.setOrderIndex(sectionBlockRequestDTO.getOrderIndex());
        sectionBlock.setStaticPageSection(section);

        SectionBlock newBlock = sectionBlockRepository.save(sectionBlock);
        return new SectionBlockResponseDTO(
                newBlock.getId(), newBlock.getContent(), newBlock.getOrderIndex()
        );
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


        if (sectionBlockUpdateDTO.getOrderIndex() != null &&  !sectionBlockUpdateDTO.getOrderIndex().equals(block.getOrderIndex())) {
            if (sectionBlockRepository.existsByOrderIndex(sectionBlockUpdateDTO.getOrderIndex())) {
                throw new HttpException(
                        HttpStatus.BAD_REQUEST,
                        "A section block already exists with the same order index"
                );
            } else {
                block.setOrderIndex(sectionBlockUpdateDTO.getOrderIndex());
            }
        }

        if (sectionBlockUpdateDTO.getContent() != null && sectionBlockUpdateDTO.getContent().length() > 0) {
            block.setContent(sectionBlockUpdateDTO.getContent());
        }

        sectionBlockRepository.save(block);
        return new SectionBlockResponseDTO(block.getId(), block.getContent(), block.getOrderIndex());
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
