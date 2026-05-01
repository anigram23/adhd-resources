package io.github.anigaut.adhdresources.staticPageSection;

import io.github.anigaut.adhdresources.staticPage.StaticPage;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionRequestDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionResponseDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionUpdateDTO;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StaticPageSectionMapper {

    @Mapping(target = "staticPage", source = "staticPage")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "sectionBlocks", ignore = true)
    StaticPageSection toEntity(StaticPageSectionRequestDTO dto, StaticPage staticPage);

    @Mapping(target = "sectionBlocks", ignore = true)
    StaticPageSectionResponseDTO toDto(StaticPageSection section);

    List<StaticPageSectionResponseDTO> toDtoList(List<StaticPageSection> sections);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(StaticPageSectionUpdateDTO dto, @MappingTarget StaticPageSection section);
}
