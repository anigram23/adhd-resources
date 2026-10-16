package io.github.anigaut.adhdresources.ticket;

import io.github.anigaut.adhdresources.core.utils.Constants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {
    List<Ticket> findByStatus(Constants.TicketStatus status);
    List<Ticket> findByReviewerId(UUID reviewerId);
    List<Ticket> findByStatusAndReviewerId(Constants.TicketStatus status, UUID reviewerId);
}
