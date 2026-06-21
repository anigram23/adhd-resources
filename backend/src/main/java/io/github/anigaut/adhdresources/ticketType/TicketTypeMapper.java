package io.github.anigaut.adhdresources.ticketType;

import io.github.anigaut.adhdresources.ticketType.dto.TicketTypeRequestDTO;
import io.github.anigaut.adhdresources.ticketType.dto.TicketTypeResponseDTO;
import io.github.anigaut.adhdresources.ticketType.dto.TicketTypeUpdateDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TicketTypeMapper {
    TicketType toEntity(TicketTypeRequestDTO dto);

    TicketTypeResponseDTO toResponseDTO(TicketType ticketType);

    List<TicketTypeResponseDTO> toResponseDTOList(List<TicketType> ticketTypes);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTicketTypeFromDTO(TicketTypeUpdateDTO dto, @MappingTarget TicketType ticketType);
}
