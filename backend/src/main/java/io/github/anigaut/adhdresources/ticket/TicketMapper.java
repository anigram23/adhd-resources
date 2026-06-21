package io.github.anigaut.adhdresources.ticket;

import io.github.anigaut.adhdresources.core.security.auth.UserDetailsDTO;
import io.github.anigaut.adhdresources.reviewer.Reviewer;
import io.github.anigaut.adhdresources.ticket.dto.TicketResponseDTO;
import io.github.anigaut.adhdresources.ticket.dto.TicketUpdateDTO;
import io.github.anigaut.adhdresources.ticketType.TicketTypeMapper;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = {TicketTypeMapper.class})
public interface TicketMapper {

    @Mapping(target = "name", ignore = true)
    @Mapping(target = "role", constant = "REVIEWER")
    UserDetailsDTO toUserDetailsDTO(Reviewer reviewer);

    TicketResponseDTO toResponseDTO(Ticket ticket);

    List<TicketResponseDTO> toResponseDTOList(List<Ticket> tickets);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTicketFromDTO(TicketUpdateDTO dto, @MappingTarget Ticket ticket);
}
