package io.github.anigaut.adhdresources.staticPage;

import io.github.anigaut.adhdresources.staticPage.dto.StaticPageRequestDTO;
import io.github.anigaut.adhdresources.staticPage.dto.StaticPageResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/static-page")
public class StaticPageController {
    private final StaticPageService staticPageService;

    @Autowired
    public StaticPageController(StaticPageService staticPageService) {
        this.staticPageService = staticPageService;
    }

    @GetMapping("/{slug}")
    public ResponseEntity<StaticPageResponseDTO> findStaticPageBySlug(@PathVariable String slug) {
        return ResponseEntity.status(HttpStatus.OK).body(staticPageService.findStaticPageBySlug(slug));
    }

    @PostMapping("/")
    public ResponseEntity<StaticPageResponseDTO> createStaticPage(@Valid @RequestBody StaticPageRequestDTO staticPageRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(staticPageService.createStaticPage(staticPageRequestDTO));
    }

    @GetMapping("/")
    public ResponseEntity<List<StaticPageResponseDTO>> getAllStaticPages() {
        return ResponseEntity.status(HttpStatus.OK).body(staticPageService.findAllStaticPages());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StaticPageResponseDTO> updateStaticPage(@PathVariable int id, @RequestBody StaticPageRequestDTO staticPageRequestDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(staticPageService.updateStaticPage(id, staticPageRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStaticPage(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(staticPageService.deleteStaticPage(id));
    }
}
