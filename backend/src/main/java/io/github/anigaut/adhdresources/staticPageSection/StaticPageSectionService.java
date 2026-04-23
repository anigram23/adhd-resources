package io.github.anigaut.adhdresources.staticPageSection;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.staticPage.StaticPage;
import io.github.anigaut.adhdresources.staticPage.StaticPageRepository;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionRequestDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionResponseDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionUpdateDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StaticPageSectionService {
    private final StaticPageSectionRepository staticPageSectionRepository;
    private final StaticPageRepository staticPageRepository;

    @Autowired
    public StaticPageSectionService(
            StaticPageSectionRepository staticPageSectionRepository,
            StaticPageRepository staticPageRepository
    ) {
        this.staticPageSectionRepository = staticPageSectionRepository;
        this.staticPageRepository = staticPageRepository;
    }

    @Transactional
    public StaticPageSectionResponseDTO createStaticPageSection(StaticPageSectionRequestDTO dto) {
        if (staticPageSectionRepository.existsByTitle(dto.getTitle())) {
            throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    "A section with this title already exists, please enter a different one"
            );
        }

        if (staticPageSectionRepository.existsByOrderIndex(dto.getOrderIndex())) {
            throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    "A section with this order index already exists, please enter a different one or edit the existing one"
            );
        }

        StaticPage page = staticPageRepository.findById(dto.getStaticPageId())
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A page with this ID doesn't exist."
                        )
                );

        StaticPageSection section = new StaticPageSection();
        section.setStaticPage(page);
        section.setTitle(dto.getTitle());
        section.setOrderIndex(dto.getOrderIndex());

        StaticPageSection newSection = staticPageSectionRepository.save(section);

        return new StaticPageSectionResponseDTO(
                newSection.getId(), newSection.getTitle(), newSection.getOrderIndex(), null
        );
    }

    public List<StaticPageSectionResponseDTO> findAllSectionsInPage(int staticPageId) {
        if (!staticPageRepository.existsById(staticPageId)) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND,
                    "A page with this ID doesn't exist."
            );
        }

        List<StaticPageSection> sections =  staticPageSectionRepository.findAllByStaticPageId(staticPageId);
        List<StaticPageSectionResponseDTO> responseDTOs = new ArrayList<>();
        for (StaticPageSection section : sections) {
            responseDTOs.add(new StaticPageSectionResponseDTO(
                    section.getId(), section.getTitle(), section.getOrderIndex(), null
            ));
        }

        return responseDTOs;
    }

    @Transactional
    public StaticPageSectionResponseDTO updateStaticPageSection(int id, StaticPageSectionUpdateDTO dto) {
        StaticPageSection section = staticPageSectionRepository.findById(id)
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A section with this ID doesn't exist."
                        )
                );

        if (dto.getTitle() != null && !dto.getTitle().isEmpty()) {
            section.setTitle(dto.getTitle());
        }

        if (dto.getOrderIndex() != null && dto.getOrderIndex() != section.getOrderIndex()) {
            if (staticPageSectionRepository.existsByOrderIndex(dto.getOrderIndex())) {
                throw new HttpException(
                        HttpStatus.BAD_REQUEST,
                        "Another section with this order index already exists, please enter a different one"
                );
            } else {
                section.setOrderIndex(dto.getOrderIndex());
            }
        }

        staticPageSectionRepository.save(section);

        return new StaticPageSectionResponseDTO(
                section.getId(), section.getTitle(), section.getOrderIndex(), null
        );
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
