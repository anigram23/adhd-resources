package io.github.anigaut.adhdresources.reviewer.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewerLoginDTO {
    @NotBlank(message = "Please enter your email ID")
    private String email;

    @NotBlank(message = "Please enter your password")
    private String password;
}
