package io.github.anigaut.adhdresources.review.dto;

import io.github.anigaut.adhdresources.core.security.auth.UserDetailsDTO;
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
public class ReviewResponseDTO {
    private int id;
    private ProfessionalResponseDTO professional;
    private UserDetailsDTO reviewer;
    private String content;
    private float rating;
    private String contactNumber;
    private String address;
    private int consultationFee;
    private Integer diagnosisFee;
    private boolean doesOnlineConsultations;
    private Instant createdAt;
    private Instant updatedAt;
}
