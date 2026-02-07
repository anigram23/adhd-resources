package io.github.anigaut.adhdresources.professionalType.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionalTypeRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Please mention if these professionals are medical doctors")
    private Boolean isDoctor;

    @NotBlank(message = "Please mention if these professionals can diagnose ADHD")
    private Boolean canDiagnose;

    @NotBlank(message = "Please mention if these professionals can prescribe medications for ADHD")
    private Boolean canPrescribeMeds;
}
