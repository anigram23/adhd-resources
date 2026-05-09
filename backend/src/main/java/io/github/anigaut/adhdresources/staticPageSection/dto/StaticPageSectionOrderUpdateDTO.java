package io.github.anigaut.adhdresources.staticPageSection.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticPageSectionOrderUpdateDTO {
    @NotNull(message = "Please mention the ID of the section to be updated")
    private Integer id;

    @NotNull(message = "Please mention the order index of the section to be updated")
    private Integer orderIndex;
}
