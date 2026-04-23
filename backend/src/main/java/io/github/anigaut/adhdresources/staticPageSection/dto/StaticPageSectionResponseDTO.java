package io.github.anigaut.adhdresources.staticPageSection.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticPageSectionResponseDTO {
    private int id;
    private String title;
    private int orderIndex;
}
