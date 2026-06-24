package io.github.anigaut.adhdresources.review.dto;

import io.github.anigaut.adhdresources.professional.dto.ProfessionalResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublicReviewResponseDTO {
    private int id;
    private ProfessionalResponseDTO professional;
    private String content;
    private float rating;
    private String contactNumber;
    private String address;
    private int consultationFee;
    private Integer diagnosisFee;
    private boolean doesOnlineConsultations;
    private Instant createdAt;
    private Instant updatedAt;
    private boolean owner;
}
