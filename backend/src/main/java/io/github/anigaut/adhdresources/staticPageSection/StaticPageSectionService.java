package io.github.anigaut.adhdresources.staticPageSection;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.staticPage.StaticPage;
import io.github.anigaut.adhdresources.staticPage.StaticPageRepository;
import io.github.anigaut.adhdresources.staticPageSection.dto.*;
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
public class StaticPageSectionService {
    private final StaticPageSectionRepository staticPageSectionRepository;
    private final StaticPageRepository staticPageRepository;
    private final StaticPageSectionMapper staticPageSectionMapper;

    @Transactional
    public StaticPageSectionResponseDTO createStaticPageSection(StaticPageSectionRequestDTO dto) {
        if (staticPageSectionRepository.existsByTitle(dto.getTitle())) {
            throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    "A section with this title already exists, please enter a different one"
            );
        }

        StaticPage page = staticPageRepository.findById(dto.getStaticPageId())
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A page with this ID doesn't exist."
                        )
                );

        if (staticPageSectionRepository.existsByOrderIndexAndStaticPage(dto.getOrderIndex(), page)) {
            throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    "A section with this order index already exists, please enter a different one or edit the existing one"
            );
        }

        StaticPageSection newSection = staticPageSectionRepository.save(staticPageSectionMapper.toEntity(dto, page));

        return staticPageSectionMapper.toDto(newSection);
    }

    public List<StaticPageSectionResponseDTO> findAllSectionsInPage(int staticPageId) {
        if (!staticPageRepository.existsById(staticPageId)) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND,
                    "A page with this ID doesn't exist."
            );
        }

        List<StaticPageSection> sections = staticPageSectionRepository.findAllByStaticPageId(staticPageId);
        return staticPageSectionMapper.toDtoList(sections);
    }

    @Transactional
    public StaticPageSectionResponseDTO updateStaticPageSectionTitle(int id, StaticPageSectionTitleUpdateDTO dto) {
        StaticPageSection section = staticPageSectionRepository.findById(id)
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A section with this ID doesn't exist."
                        )
                );


        staticPageSectionMapper.updateEntity(dto, section);
        staticPageSectionRepository.save(section);

        return staticPageSectionMapper.toDto(section);
    }

    @Transactional
    public List<StaticPageSectionResponseDTO> updateStaticPageSectionsOrder(List<StaticPageSectionOrderUpdateDTO> newOrderDTO) {
        List<StaticPageSectionResponseDTO> updatedSections = new ArrayList<>();
        Set<Integer> indices = new HashSet<>();

        for (StaticPageSectionOrderUpdateDTO dto : newOrderDTO) {
            StaticPageSection section = staticPageSectionRepository.findById(dto.getId())
                    .orElseThrow(
                            () -> new HttpException(
                                    HttpStatus.NOT_FOUND,
                                    "A section with this ID doesn't exist."
                            )
                    );

            if (dto.getOrderIndex() > newOrderDTO.size() || dto.getOrderIndex() < 1 || indices.contains(dto.getOrderIndex())) {
                throw new HttpException(
                        HttpStatus.BAD_REQUEST,
                        "Invalid order index"
                );
            }

            indices.add(dto.getOrderIndex());

            staticPageSectionMapper.updateEntity(dto, section);
            staticPageSectionRepository.save(section);
            updatedSections.add(staticPageSectionMapper.toDto(section));
        }
        return updatedSections;
    }

    @Transactional
    public String deleteStaticPageSection(int id) {
        StaticPageSection section =  staticPageSectionRepository.findById(id)
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A section with this ID doesn't exist."
                        )
                );
        staticPageSectionRepository.delete(section);
        return ("Section Deleted Successfully");
    }
}
