package io.github.anigaut.adhdresources.professional;

import io.github.anigaut.adhdresources.professional.dto.ProfessionalRequestDTO;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalResponseDTO;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalUpdateDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProfessionalMapper {

    @Mapping(target = "averageRating", ignore = true)
    Professional toEntity(ProfessionalRequestDTO dto);

    @Mapping(target = "averageRating", ignore = true)
    ProfessionalResponseDTO toResponseDTO(Professional entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ProfessionalUpdateDTO dto, @MappingTarget Professional entity);
}
