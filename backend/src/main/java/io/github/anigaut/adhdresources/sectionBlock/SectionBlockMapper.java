package io.github.anigaut.adhdresources.sectionBlock;

import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockRequestDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockResponseDTO;
import io.github.anigaut.adhdresources.sectionBlock.dto.SectionBlockUpdateDTO;
import io.github.anigaut.adhdresources.staticPageSection.StaticPageSection;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface SectionBlockMapper {

    @Mapping(target = "staticPageSection", source = "staticPageSection")
    @Mapping(target = "id", ignore = true)
    SectionBlock toEntity(SectionBlockRequestDTO dto, StaticPageSection staticPageSection);

    SectionBlockResponseDTO toDto(SectionBlock sectionBlock);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(SectionBlockUpdateDTO dto, @MappingTarget SectionBlock sectionBlock);
}
