package io.github.anigaut.adhdresources.ticket.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TicketRequestDTO {

    @NotNull(message = "Ticket type ID is required")
    private Integer ticketTypeId;

    @NotNull(message = "Reviewer ID is required")
    private UUID reviewerId;

    @NotBlank(message = "Content is required")
    private String content;

    private UUID reviewId;
}
