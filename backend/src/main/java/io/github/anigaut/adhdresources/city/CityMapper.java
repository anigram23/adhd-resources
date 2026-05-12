package io.github.anigaut.adhdresources.city;

import io.github.anigaut.adhdresources.city.dto.CityResponseDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CityMapper {
    CityResponseDTO toResponseDTO(City city);

    List<CityResponseDTO> toResponseDTOList(List<City> cities);
}
