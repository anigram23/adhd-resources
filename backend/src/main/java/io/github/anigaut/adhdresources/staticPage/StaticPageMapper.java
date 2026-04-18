package io.github.anigaut.adhdresources.staticPage;

import io.github.anigaut.adhdresources.staticPage.dto.StaticPageRequestDTO;
import io.github.anigaut.adhdresources.staticPage.dto.StaticPageResponseDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StaticPageMapper {
    StaticPage toEntity(StaticPageRequestDTO dto);
    StaticPageResponseDTO toDto(StaticPage entity);
    List<StaticPageResponseDTO> toDtoList(List<StaticPage> entity);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(StaticPageRequestDTO dto, @MappingTarget StaticPage entity);
}
