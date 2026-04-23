package io.github.anigaut.adhdresources.sectionBlock.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SectionBlockResponseDTO {
    private int id;
    private String content;
    private int orderIndex;
}
