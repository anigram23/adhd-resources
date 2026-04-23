package io.github.anigaut.adhdresources.sectionBlock;

import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockRequestDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockResponseDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/section-block")
public class SectionBlockController {
    private final SectionBlockService sectionBlockService;

    @Autowired
    public SectionBlockController(SectionBlockService sectionBlockService) {
        this.sectionBlockService = sectionBlockService;
    }

    @PostMapping("/")
    public ResponseEntity<SectionBlockResponseDTO> createSectionBlock(@Valid @RequestBody SectionBlockRequestDTO dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(sectionBlockService.createSectionBlock(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SectionBlockResponseDTO> updateSectionBlock(@PathVariable int id, @RequestBody SectionBlockUpdateDTO dto) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(sectionBlockService.updateSectionBlock(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSectionBlock(@PathVariable int id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(sectionBlockService.deleteSectionBlock(id));
    }
}
