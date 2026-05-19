package io.github.anigaut.adhdresources.professional.dto;

import io.github.anigaut.adhdresources.city.dto.CityResponseDTO;
import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionalResponseDTO {
    private int id;
    private String name;
    private ProfessionalTypeResponseDTO professionalType;
    private CityResponseDTO city;
}
