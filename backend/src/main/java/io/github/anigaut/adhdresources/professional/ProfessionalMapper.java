package io.github.anigaut.adhdresources.professional;

import io.github.anigaut.adhdresources.city.City;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalRequestDTO;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalResponseDTO;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalUpdateDTO;
import io.github.anigaut.adhdresources.professionalType.ProfessionalType;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
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

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ProfessionalUpdateDTO dto, @MappingTarget Professional entity);
}
