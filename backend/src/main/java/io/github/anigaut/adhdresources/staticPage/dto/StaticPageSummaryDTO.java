package io.github.anigaut.adhdresources.staticPage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticPageSummaryDTO {
    private UUID id;
    private String slug;
    private String title;
    private boolean active;
}
