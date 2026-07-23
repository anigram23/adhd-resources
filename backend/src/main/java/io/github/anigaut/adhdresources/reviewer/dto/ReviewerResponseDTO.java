package io.github.anigaut.adhdresources.reviewer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewerResponseDTO {
    private int id;
    private String email;
    private Instant createdAt;
    private Instant updatedAt;
}
