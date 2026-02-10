package io.github.anigaut.adhdresources.professionalType.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalTypeUpdateDTO {
    private String title;
    private Boolean doctor;
    private Boolean canDiagnose;
    private Boolean canPrescribeMeds;
}
