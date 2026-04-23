package io.github.anigaut.adhdresources.sectionBlock.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SectionBlockRequestDTO {
    @NotNull(message = "Please specify the ID of the section this block belongs to")
    private Integer staticPageSectionId;

    @NotBlank(message = "Content is required")
    private String content;

    @NotNull(message = "Order index is missing")
    private Integer orderIndex;
}
