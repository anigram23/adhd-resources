package io.github.anigaut.adhdresources.state;

import io.github.anigaut.adhdresources.state.dto.StateResponseDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StateMapper {
    StateResponseDTO toResponseDTO(State state);

    List<StateResponseDTO> toResponseDTOList(List<State> states);
}
