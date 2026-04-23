package io.github.anigaut.adhdresources.staticPageSection.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticPageSectionRequestDTO {
    @NotNull(message = "Please specify the ID of the page this section belongs to")
    private Integer staticPageId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Order index is missing")
    private Integer orderIndex;
}
