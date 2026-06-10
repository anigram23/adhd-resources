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
public class ReviewerPasswordChangeDTO {
    @NotBlank(message = "Please enter your email ID")
    private String email;

    @NotBlank(message = "Please enter your current password")
    private String oldPassword;

    @NotBlank(message = "Please enter your new password")
    private String newPassword;

    @NotBlank(message = "Please confirm your new password")
    private String confirmNewPassword;
}
