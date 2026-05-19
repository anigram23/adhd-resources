package io.github.anigaut.adhdresources.professional;

import io.github.anigaut.adhdresources.city.City;
import io.github.anigaut.adhdresources.city.CityMapper;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalRequestDTO;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalResponseDTO;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalUpdateDTO;
import io.github.anigaut.adhdresources.professionalType.ProfessionalType;
import io.github.anigaut.adhdresources.professionalType.ProfessionalTypeMapper;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CityMapper.class, ProfessionalTypeMapper.class})
public interface ProfessionalMapper {

    @Mapping(target = "city", source = "city")
    @Mapping(target = "professionalType", source = "professionalType")
    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "name", source = "dto.name")
    Professional toEntity(ProfessionalRequestDTO dto, City city, ProfessionalType professionalType);

    ProfessionalResponseDTO toResponseDTO(Professional entity);

    List<ProfessionalResponseDTO> toResponseDTOList(List<Professional> professionals);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ProfessionalUpdateDTO dto, @MappingTarget Professional entity);
}
