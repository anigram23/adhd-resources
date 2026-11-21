package io.github.anigaut.adhdresources.professionalType.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalTypeUpdateDTO {
    @NotBlank(message = "Title is required")
    private String title;
}
