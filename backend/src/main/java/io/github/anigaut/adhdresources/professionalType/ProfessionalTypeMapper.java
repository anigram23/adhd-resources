package io.github.anigaut.adhdresources.professionalType;

import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeRequestDTO;
import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeResponseDTO;
import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeUpdateDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ProfessionalTypeMapper {
    ProfessionalType toEntity(ProfessionalTypeRequestDTO dto);

    ProfessionalTypeResponseDTO toResponseDTO(ProfessionalType type);

    List<ProfessionalTypeResponseDTO> toResponseDTOList(List<ProfessionalType> types);

    void updateProfessionalTypeFromDTO(ProfessionalTypeUpdateDTO dto, @MappingTarget ProfessionalType type);
}
