package io.github.anigaut.adhdresources.staticPageSection;

import io.github.anigaut.adhdresources.staticPage.StaticPage;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionRequestDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionResponseDTO;
import io.github.anigaut.adhdresources.staticPageSection.dto.StaticPageSectionUpdateDTO;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StaticPageSectionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "staticPage", source = "staticPage")
    @Mapping(target = "title", source = "dto.title")
    @Mapping(target = "orderIndex", source = "dto.orderIndex")
    StaticPageSection toEntity(StaticPageSectionRequestDTO dto, StaticPage staticPage);

    @Mapping(target = "sectionBlocks", ignore = true)
    StaticPageSectionResponseDTO toDto(StaticPageSection section);

    List<StaticPageSectionResponseDTO> toDtoList(List<StaticPageSection> sections);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(StaticPageSectionUpdateDTO dto, @MappingTarget StaticPageSection section);
}
