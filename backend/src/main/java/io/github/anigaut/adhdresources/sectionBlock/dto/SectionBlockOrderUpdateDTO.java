package io.github.anigaut.adhdresources.sectionBlock.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SectionBlockOrderUpdateDTO {

    @NotNull(message = "Please mention the ID of the block to be updated")
    private Integer id;

    @NotNull(message = "Please mention the order index of the block to be updated")
    private Integer orderIndex;
}
