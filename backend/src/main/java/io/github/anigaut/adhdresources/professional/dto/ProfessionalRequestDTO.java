package io.github.anigaut.adhdresources.professional.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionalRequestDTO {
    @NotBlank(message = "City is required")
    private String cityName;

    @NotBlank(message = "Professional type is required")
    private String professionalTypeTitle;

    @NotBlank(message = "Please mention the professional's name")
    private String name;
}
