package io.github.anigaut.adhdresources.professional.dto;

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
public class ProfessionalRequestDTO {
    @NotNull(message = "City ID is required")
    private Integer cityId;

    @NotNull(message = "Professional type ID is required")
    private Integer professionalTypeId;

    @NotBlank(message = "Please mention the professional's name")
    private String name;
}
