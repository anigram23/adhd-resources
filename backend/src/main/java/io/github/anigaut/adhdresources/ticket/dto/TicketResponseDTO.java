package io.github.anigaut.adhdresources.ticket.dto;

import io.github.anigaut.adhdresources.core.security.auth.UserDetailsDTO;
import io.github.anigaut.adhdresources.core.utils.Constants;
import io.github.anigaut.adhdresources.review.dto.PublicReviewResponseDTO;
import io.github.anigaut.adhdresources.ticketType.dto.TicketTypeResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponseDTO {
    private int id;
    private TicketTypeResponseDTO ticketType;
    private UserDetailsDTO reviewer;
    private PublicReviewResponseDTO review;
    private Constants.TicketStatus status;
    private String content;
    private Instant createdAt;
    private Instant updatedAt;
}
