package io.github.anigaut.adhdresources.ticket;

import io.github.anigaut.adhdresources.core.utils.Constants;
import io.github.anigaut.adhdresources.ticket.dto.TicketRequestDTO;
import io.github.anigaut.adhdresources.ticket.dto.TicketResponseDTO;
import io.github.anigaut.adhdresources.ticket.dto.TicketUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket")
public class TicketController {
    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/")
    public ResponseEntity<List<TicketResponseDTO>> getTickets(
            @RequestParam(required = false) Constants.TicketStatus status,
            @RequestParam(required = false) Integer reviewerId) {
        return ResponseEntity.status(HttpStatus.OK).body(ticketService.getTickets(status, reviewerId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> getTicketById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(ticketService.getTicketById(id));
    }

    @PostMapping("/")
    public ResponseEntity<TicketResponseDTO> createTicket(@Valid @RequestBody TicketRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.createTicket(requestDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> updateTicket(
            @PathVariable int id,
            @Valid @RequestBody TicketUpdateDTO updateDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(ticketService.updateTicket(id, updateDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(
            @PathVariable int id,
            @AuthenticationPrincipal String callerEmail) {
        ticketService.deleteTicket(id, callerEmail);
        return ResponseEntity.status(HttpStatus.OK).body("Ticket with id " + id + " deleted successfully.");
    }
}
