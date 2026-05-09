package io.github.anigaut.adhdresources.sectionBlock;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockContentUpdateDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockOrderUpdateDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockRequestDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockResponseDTO;
import io.github.anigaut.adhdresources.staticPageSection.StaticPageSection;
import io.github.anigaut.adhdresources.staticPageSection.StaticPageSectionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public SectionBlockResponseDTO updateSectionBlockContent(int id, SectionBlockContentUpdateDTO dto) {
        SectionBlock block = sectionBlockRepository.findById(id)
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A section block with this ID doesn't exist"
                        )
                );

        sectionBlockMapper.updateEntity(dto, block);
        sectionBlockRepository.save(block);
        return sectionBlockMapper.toDto(block);
    }

    @Transactional
    public List<SectionBlockResponseDTO> updateSectionBlocksOrder(List<SectionBlockOrderUpdateDTO> newOrderDTO) {
        List<SectionBlockResponseDTO> updatedBlocks = new ArrayList<>();
        Set<Integer> indices = new HashSet<>();

        for (SectionBlockOrderUpdateDTO dto : newOrderDTO) {
            SectionBlock block = sectionBlockRepository.findById(dto.getId())
                    .orElseThrow(
                            () -> new HttpException(
                                    HttpStatus.NOT_FOUND,
                                    "A section block with this ID doesn't exist"
                            )
                    );

            if (dto.getOrderIndex() > newOrderDTO.size() || dto.getOrderIndex() < 1 || indices.contains(dto.getOrderIndex())) {
                throw new HttpException(
                        HttpStatus.BAD_REQUEST,
                        "Invalid order index"
                );
            }

            indices.add(dto.getOrderIndex());

            sectionBlockMapper.updateEntity(dto, block);
            sectionBlockRepository.save(block);
            updatedBlocks.add(sectionBlockMapper.toDto(block));
        }
        return updatedBlocks;
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
