package io.github.anigaut.adhdresources.staticPage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticPageResponseDTO {
    private int id;
    private String slug;
    private String title;
}
