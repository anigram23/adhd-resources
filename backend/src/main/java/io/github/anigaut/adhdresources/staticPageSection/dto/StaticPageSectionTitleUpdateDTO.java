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
public class StaticPageSectionTitleUpdateDTO {

    @NotBlank(message = "Title is required")
    private String title;
}
