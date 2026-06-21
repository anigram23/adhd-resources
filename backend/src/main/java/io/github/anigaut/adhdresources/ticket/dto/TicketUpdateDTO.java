package io.github.anigaut.adhdresources.ticket.dto;

import io.github.anigaut.adhdresources.core.utils.Constants;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TicketUpdateDTO {

    @NotNull(message = "Status is required")
    private Constants.TicketStatus status;
}
