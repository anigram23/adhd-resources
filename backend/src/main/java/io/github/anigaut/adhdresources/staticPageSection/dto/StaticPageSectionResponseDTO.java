package io.github.anigaut.adhdresources.staticPageSection.dto;

import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticPageSectionResponseDTO {
    private int id;
    private String title;
    private int orderIndex;
    private Set<SectionBlockResponseDTO> sectionBlocks;
}
