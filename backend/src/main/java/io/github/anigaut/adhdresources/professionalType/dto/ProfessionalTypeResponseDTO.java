package io.github.anigaut.adhdresources.professionalType.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionalTypeResponseDTO {
    private int id;
    private String title;
    private boolean isDoctor;
    private boolean canDiagnose;
    private boolean canPrescribeMeds;
}
