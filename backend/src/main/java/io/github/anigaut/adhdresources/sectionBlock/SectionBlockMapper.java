package io.github.anigaut.adhdresources.sectionBlock;

import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockContentUpdateDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockOrderUpdateDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockRequestDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockResponseDTO;
import io.github.anigaut.adhdresources.staticPageSection.StaticPageSection;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SectionBlockMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "staticPageSection", source = "staticPageSection")
    @Mapping(target = "content", source = "dto.content")
    @Mapping(target = "orderIndex", source = "dto.orderIndex")
    SectionBlock toEntity(SectionBlockRequestDTO dto, StaticPageSection staticPageSection);

    SectionBlockResponseDTO toDto(SectionBlock sectionBlock);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(SectionBlockContentUpdateDTO dto, @MappingTarget SectionBlock sectionBlock);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(SectionBlockOrderUpdateDTO dto, @MappingTarget SectionBlock sectionBlock);
}
