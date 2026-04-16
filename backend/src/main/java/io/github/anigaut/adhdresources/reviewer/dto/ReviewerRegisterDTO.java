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
public class ReviewerRegisterDTO {
    @NotBlank(message = "Please enter your email ID")
    private String email;

    @NotBlank(message = "Please enter a password")
    private String password;

    @NotBlank(message = "Please confirm your password")
    public String confirmPassword;
}
