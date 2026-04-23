package io.github.anigaut.adhdresources.sectionBlock.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SectionBlockUpdateDTO {
    private String content;
    private Integer orderIndex;
}
