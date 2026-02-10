package io.github.anigaut.adhdresources.professionalType;

import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeRequestDTO;
import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeResponseDTO;
import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeUpdateDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProfessionalTypeMapper {
    ProfessionalType toEntity(ProfessionalTypeRequestDTO dto);

    ProfessionalTypeResponseDTO toResponseDTO(ProfessionalType type);

    List<ProfessionalTypeResponseDTO> toResponseDTOList(List<ProfessionalType> types);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProfessionalTypeFromDTO(ProfessionalTypeUpdateDTO dto, @MappingTarget ProfessionalType type);
}
