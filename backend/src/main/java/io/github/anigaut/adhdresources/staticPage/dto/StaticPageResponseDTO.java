package io.github.anigaut.adhdresources.staticPage.dto;

import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticPageResponseDTO {
    private UUID id;
    private String slug;
    private String title;
    private boolean active;
    private List<StaticPageSectionResponseDTO> sections;
}
