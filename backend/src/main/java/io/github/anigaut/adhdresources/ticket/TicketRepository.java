package io.github.anigaut.adhdresources.ticket;

import io.github.anigaut.adhdresources.core.utils.Constants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByStatus(Constants.TicketStatus status);
    List<Ticket> findByReviewerId(int reviewerId);
    List<Ticket> findByStatusAndReviewerId(Constants.TicketStatus status, int reviewerId);
}
