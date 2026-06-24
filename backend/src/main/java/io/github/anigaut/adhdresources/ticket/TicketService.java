package io.github.anigaut.adhdresources.ticket;

import io.github.anigaut.adhdresources.admin.AdminRepository;
import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.core.utils.Constants;
import io.github.anigaut.adhdresources.review.Review;
import io.github.anigaut.adhdresources.review.ReviewRepository;
import io.github.anigaut.adhdresources.reviewer.Reviewer;
import io.github.anigaut.adhdresources.reviewer.ReviewerRepository;
import io.github.anigaut.adhdresources.ticket.dto.TicketRequestDTO;
import io.github.anigaut.adhdresources.ticket.dto.TicketResponseDTO;
import io.github.anigaut.adhdresources.ticket.dto.TicketUpdateDTO;
import io.github.anigaut.adhdresources.ticketType.TicketType;
import io.github.anigaut.adhdresources.ticketType.TicketTypeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final ReviewerRepository reviewerRepository;
    private final AdminRepository adminRepository;
    private final TicketMapper ticketMapper;
    private final ReviewRepository reviewRepository;

    @Transactional
    public TicketResponseDTO createTicket(TicketRequestDTO requestDTO) {
        TicketType ticketType = ticketTypeRepository.findById(requestDTO.getTicketTypeId())
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A ticket type with this ID doesn't exist."));
        Reviewer reviewer = reviewerRepository.findById(requestDTO.getReviewerId())
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A reviewer with this ID doesn't exist."));

        Review review = null;
        if (requestDTO.getReviewId() != null) {
            review = reviewRepository.findById(requestDTO.getReviewId())
                    .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A review with this ID doesn't exist."));
        }

        if (ticketType.getId() == 2 && review == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Please report reviews from the reviews page.");
        }

        Ticket ticket = new Ticket();
        ticket.setTicketType(ticketType);
        ticket.setReviewer(reviewer);
        ticket.setReview(review);
        ticket.setContent(requestDTO.getContent());
        ticket.setStatus(Constants.TicketStatus.OPEN);

        return ticketMapper.toResponseDTO(ticketRepository.save(ticket));
    }

    public List<TicketResponseDTO> getTickets(Constants.TicketStatus status, Integer reviewerId) {
        List<Ticket> tickets;
        if (status != null && reviewerId != null) {
            tickets = ticketRepository.findByStatusAndReviewerId(status, reviewerId);
        } else if (status != null) {
            tickets = ticketRepository.findByStatus(status);
        } else if (reviewerId != null) {
            tickets = ticketRepository.findByReviewerId(reviewerId);
        } else {
            tickets = ticketRepository.findAll();
        }
        return ticketMapper.toResponseDTOList(tickets);
    }

    public TicketResponseDTO getTicketById(int id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A ticket with this ID doesn't exist."));
        return ticketMapper.toResponseDTO(ticket);
    }

    @Transactional
    public TicketResponseDTO updateTicket(int id, TicketUpdateDTO updateDTO) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A ticket with this ID doesn't exist."));
        ticketMapper.updateTicketFromDTO(updateDTO, ticket);
        return ticketMapper.toResponseDTO(ticket);
    }

    @Transactional
    public void deleteTicket(int id, String callerEmail) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A ticket with this ID doesn't exist."));

        if (ticket.getStatus() != Constants.TicketStatus.OPEN) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Only tickets with an OPEN status can be deleted.");
        }

        boolean isAdmin = adminRepository.existsByEmail(callerEmail);
        boolean isOwner = ticket.getReviewer().getEmail().equals(callerEmail);

        if (!isAdmin && !isOwner) {
            throw new HttpException(HttpStatus.FORBIDDEN, "You do not have permission to delete this ticket.");
        }

        ticketRepository.delete(ticket);
    }
}
