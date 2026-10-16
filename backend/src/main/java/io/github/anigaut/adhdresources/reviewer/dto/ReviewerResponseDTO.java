package io.github.anigaut.adhdresources.reviewer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewerResponseDTO {
    private UUID id;
    private String email;
    private Instant createdAt;
    private Instant updatedAt;
}
