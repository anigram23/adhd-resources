package io.github.anigaut.adhdresources.sectionBlock;

import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockContentUpdateDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockOrderUpdateDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockRequestDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PatchMapping("/")
    public ResponseEntity<List<SectionBlockResponseDTO>> updateSectionBlocksOrder(@RequestBody List<SectionBlockOrderUpdateDTO> dtoList) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(sectionBlockService.updateSectionBlocksOrder(dtoList));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SectionBlockResponseDTO> updateSectionBlockContent(@PathVariable int id, @RequestBody SectionBlockContentUpdateDTO dto) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(sectionBlockService.updateSectionBlockContent(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSectionBlock(@PathVariable int id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(sectionBlockService.deleteSectionBlock(id));
    }
}
