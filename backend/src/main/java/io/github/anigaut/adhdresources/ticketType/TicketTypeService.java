package io.github.anigaut.adhdresources.ticketType;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.ticketType.dto.TicketTypeRequestDTO;
import io.github.anigaut.adhdresources.ticketType.dto.TicketTypeResponseDTO;
import io.github.anigaut.adhdresources.ticketType.dto.TicketTypeUpdateDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketTypeService {
    private final TicketTypeRepository ticketTypeRepository;
    private final TicketTypeMapper ticketTypeMapper;

    @Autowired
    public TicketTypeService(TicketTypeRepository ticketTypeRepository, TicketTypeMapper ticketTypeMapper) {
        this.ticketTypeRepository = ticketTypeRepository;
        this.ticketTypeMapper = ticketTypeMapper;
    }

    @Transactional
    public TicketTypeResponseDTO createTicketType(TicketTypeRequestDTO requestDTO) {
        if (ticketTypeRepository.existsByTitle(requestDTO.getTitle())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "A ticket type with this title already exists. Please enter a different one.");
        }
        TicketType ticketType = ticketTypeMapper.toEntity(requestDTO);
        TicketType saved = ticketTypeRepository.save(ticketType);
        return ticketTypeMapper.toResponseDTO(saved);
    }

    public TicketTypeResponseDTO getTicketTypeById(int id) {
        TicketType ticketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A ticket type with this ID doesn't exist. Please try again."));
        return ticketTypeMapper.toResponseDTO(ticketType);
    }

    public List<TicketTypeResponseDTO> getAllTicketTypes() {
        return ticketTypeMapper.toResponseDTOList(ticketTypeRepository.findAll());
    }

    @Transactional
    public TicketTypeResponseDTO updateTicketType(int id, TicketTypeUpdateDTO updateDTO) {
        TicketType ticketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A ticket type with this ID doesn't exist. Please try again."));
        ticketTypeMapper.updateTicketTypeFromDTO(updateDTO, ticketType);
        return ticketTypeMapper.toResponseDTO(ticketType);
    }

    @Transactional
    public void deleteTicketType(int id) {
        TicketType ticketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A ticket type with this ID doesn't exist. Please try again."));
        ticketTypeRepository.delete(ticketType);
    }
}
