package io.github.anigaut.adhdresources.staticPage.dto;

import io.github.anigaut.adhdresources.staticPageSection.StaticPageSection;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticPageResponseDTO {
    private int id;
    private String slug;
    private String title;
    private Set<StaticPageSectionResponseDTO> sections;
}
