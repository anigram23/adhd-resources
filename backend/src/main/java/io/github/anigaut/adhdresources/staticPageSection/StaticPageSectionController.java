package io.github.anigaut.adhdresources.staticPageSection;

import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionOrderUpdateDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionRequestDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionResponseDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionTitleUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/static-page-section")
public class StaticPageSectionController {
    private final StaticPageSectionService staticPageSectionService;

    @Autowired
    public StaticPageSectionController(StaticPageSectionService staticPageSectionService) {
        this.staticPageSectionService = staticPageSectionService;
    }

    @PostMapping("/")
    public ResponseEntity<StaticPageSectionResponseDTO> createStaticPageSection(@Valid @RequestBody StaticPageSectionRequestDTO staticPageSectionRequestDTO) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(staticPageSectionService.createStaticPageSection(staticPageSectionRequestDTO));
    }

    @GetMapping("/{pageId}")
    public ResponseEntity<List<StaticPageSectionResponseDTO>> findAllSectionsInPage(@PathVariable int pageId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(staticPageSectionService.findAllSectionsInPage(pageId));
    }

    @PatchMapping("/")
    public ResponseEntity<List<StaticPageSectionResponseDTO>> updateStaticPageSectionOrder(@RequestBody List<StaticPageSectionOrderUpdateDTO> dtoList) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(staticPageSectionService.updateStaticPageSectionsOrder(dtoList));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StaticPageSectionResponseDTO> updateStaticPageSectionTitle(@PathVariable int id, @RequestBody StaticPageSectionTitleUpdateDTO staticPageSectionTitleUpdateDTO) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(staticPageSectionService.updateStaticPageSectionTitle(id, staticPageSectionTitleUpdateDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStaticPageSection(@PathVariable int id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(staticPageSectionService.deleteStaticPageSection(id));
    }
}
