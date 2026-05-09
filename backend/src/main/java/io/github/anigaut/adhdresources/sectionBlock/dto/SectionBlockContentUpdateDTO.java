package io.github.anigaut.adhdresources.sectionBlock.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SectionBlockContentUpdateDTO {

    @NotBlank(message = "Content is required")
    private String content;
}
