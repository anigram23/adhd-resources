package io.github.anigaut.adhdresources.staticPageSection;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.staticPage.StaticPage;
import io.github.anigaut.adhdresources.staticPage.StaticPageRepository;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionRequestDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionResponseDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionUpdateDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public StaticPageSectionResponseDTO updateStaticPageSection(int id, StaticPageSectionUpdateDTO dto) {
        StaticPageSection section = staticPageSectionRepository.findById(id)
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A section with this ID doesn't exist."
                        )
                );

        if (dto.getOrderIndex() != null && dto.getOrderIndex() != section.getOrderIndex()) {
            if (staticPageSectionRepository.existsByOrderIndex(dto.getOrderIndex())) {
                throw new HttpException(
                        HttpStatus.BAD_REQUEST,
                        "Another section with this order index already exists, please enter a different one"
                );
            }
        }

        staticPageSectionMapper.updateEntity(dto, section);
        staticPageSectionRepository.save(section);

        return staticPageSectionMapper.toDto(section);
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
