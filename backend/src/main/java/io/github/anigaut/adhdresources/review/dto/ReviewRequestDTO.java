package io.github.anigaut.adhdresources.review.dto;

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
public class ReviewRequestDTO {
    // if review is for an existing professional, ID is required. If not, name, city and type needs to be provided

    private String professionalName;

    private Integer professionalTypeId;

    private Integer cityId;

    private Integer professionalId;

    @NotNull(message = "Please mention if this professional offers online consultations")
    private boolean doesOnlineConsultations;

    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Consultation fee is required")
    private int consultationFee;

    private Integer diagnosisFee;

    @NotBlank(message = "Review Content is required")
    private String content;

    @NotNull(message = "Rating is required")
    private float rating;
}
