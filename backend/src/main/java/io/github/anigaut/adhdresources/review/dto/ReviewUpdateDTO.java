package io.github.anigaut.adhdresources.review.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewUpdateDTO {
    private Boolean doesOnlineConsultations;
    @Pattern(regexp = "^\\d{10}$", message = "Contact number must be exactly 10 digits")
    private String contactNumber;
    private String address;
    private Integer consultationFee;
    private Integer diagnosisFee;
    private Boolean wasDiagnosed;
    private String content;
    @DecimalMin(value = "0.5", message = "Rating must be at least 0.5")
    @DecimalMax(value = "5.0", message = "Rating cannot exceed 5")
    private Float rating;
}
