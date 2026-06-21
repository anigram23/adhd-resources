package io.github.anigaut.adhdresources.ticketType;

import io.github.anigaut.adhdresources.ticketType.dto.TicketTypeRequestDTO;
import io.github.anigaut.adhdresources.ticketType.dto.TicketTypeResponseDTO;
import io.github.anigaut.adhdresources.ticketType.dto.TicketTypeUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket-type")
public class TicketTypeController {
    private final TicketTypeService ticketTypeService;

    @Autowired
    public TicketTypeController(TicketTypeService ticketTypeService) {
        this.ticketTypeService = ticketTypeService;
    }

    @GetMapping("/")
    public ResponseEntity<List<TicketTypeResponseDTO>> getAllTicketTypes() {
        return ResponseEntity.status(HttpStatus.OK).body(ticketTypeService.getAllTicketTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketTypeResponseDTO> getTicketTypeById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(ticketTypeService.getTicketTypeById(id));
    }

    @PostMapping("/")
    public ResponseEntity<TicketTypeResponseDTO> createTicketType(@Valid @RequestBody TicketTypeRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketTypeService.createTicketType(requestDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TicketTypeResponseDTO> updateTicketType(@PathVariable int id, @RequestBody TicketTypeUpdateDTO updateDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(ticketTypeService.updateTicketType(id, updateDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicketType(@PathVariable int id) {
        ticketTypeService.deleteTicketType(id);
        return ResponseEntity.status(HttpStatus.OK).body("Ticket type with id " + id + " deleted successfully.");
    }
}
