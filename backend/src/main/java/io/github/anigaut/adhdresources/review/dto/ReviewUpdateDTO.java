package io.github.anigaut.adhdresources.review.dto;

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
    private String contactNumber;
    private String address;
    private Integer consultationFee;
    private Integer diagnosisFee;
    private String content;
    private Float rating;
}
