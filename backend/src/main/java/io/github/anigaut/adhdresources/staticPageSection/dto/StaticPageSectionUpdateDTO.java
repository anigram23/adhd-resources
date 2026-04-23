package io.github.anigaut.adhdresources.staticPageSection.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticPageSectionUpdateDTO {
    private String title;
    private Integer orderIndex;
}
