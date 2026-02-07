package io.github.anigaut.adhdresources.professionalType.dto;

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
public class ProfessionalTypeRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Please mention if these professionals are medical doctors")
    private Boolean isDoctor;

    @NotNull(message = "Please mention if these professionals can diagnose ADHD")
    private Boolean canDiagnose;

    @NotNull(message = "Please mention if these professionals can prescribe medications for ADHD")
    private Boolean canPrescribeMeds;
}
