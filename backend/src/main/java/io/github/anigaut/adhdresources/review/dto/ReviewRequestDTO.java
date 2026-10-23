package io.github.anigaut.adhdresources.review.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequestDTO {
    // if review is for an existing professional, ID is required. If not, name, city and type needs to be provided

    private String professionalName;

    private String professionalTypeTitle;

    private String cityName;

    private UUID professionalId;

    @NotNull(message = "Please mention if this professional offers online consultations")
    private boolean doesOnlineConsultations;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "^\\d{10}$", message = "Contact number must be exactly 10 digits")
    private String contactNumber;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Consultation fee is required")
    private int consultationFee;

    private Integer diagnosisFee;

    private boolean wasDiagnosed;

    @NotBlank(message = "Review Content is required")
    private String content;

    @NotNull(message = "Rating is required")
    private float rating;
}
