package io.github.anigaut.adhdresources.staticPage;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.staticPage.dto.StaticPageRequestDTO;
import io.github.anigaut.adhdresources.staticPage.dto.StaticPageResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaticPageService {
    private final StaticPageRepository staticPageRepository;
    private final StaticPageMapper staticPageMapper;

    @Autowired
    public StaticPageService(StaticPageRepository staticPageRepository, StaticPageMapper staticPageMapper) {
        this.staticPageRepository = staticPageRepository;
        this.staticPageMapper = staticPageMapper;
    }

    @Transactional
    public StaticPageResponseDTO createStaticPage(StaticPageRequestDTO staticPageRequestDTO) {
        if (staticPageRepository.existsBySlug(staticPageRequestDTO.getSlug())) {
            throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    "A page with this slug already exists, please enter a different one"
            );
        }

        StaticPage staticPage = staticPageMapper.toEntity(staticPageRequestDTO);
        StaticPage savedStaticPage = staticPageRepository.save(staticPage);
        return staticPageMapper.toDto(savedStaticPage);
    }

    public StaticPageResponseDTO findStaticPageById(int id) {
        StaticPage staticPage = staticPageRepository.findWithSectionsAndBlocksById(id)
                .orElseThrow(
                        () -> new HttpException(
                                HttpStatus.NOT_FOUND,
                                "A page with this ID doesn't exist."
                        )
                );

        return staticPageMapper.toDto(staticPage);
    }

    public List<StaticPageResponseDTO> findAllStaticPages() {
        return staticPageMapper.toDtoList(staticPageRepository.findAll());
    }

    @Transactional
    public StaticPageResponseDTO updateStaticPage(int id,  StaticPageRequestDTO staticPageRequestDTO) {
        StaticPage staticPage = staticPageRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A page with this ID doesn't exist."));

        staticPageMapper.updateEntity(staticPageRequestDTO, staticPage);
        return staticPageMapper.toDto(staticPage);
    }

    @Transactional
    public String deleteStaticPage(int id) {
        StaticPage staticPage = staticPageRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A page with this ID doesn't exist."));

        staticPageRepository.delete(staticPage);
        return ("Deleted page successfully.");
    }

}
