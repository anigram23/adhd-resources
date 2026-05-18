package io.github.anigaut.adhdresources.review;

import io.github.anigaut.adhdresources.professional.Professional;
import io.github.anigaut.adhdresources.review.dto.ReviewRequestDTO;
import io.github.anigaut.adhdresources.review.dto.ReviewResponseDTO;
import io.github.anigaut.adhdresources.reviewer.Reviewer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "reviewer", source = "reviewer")
    @Mapping(target = "professional", source = "professional")
    Review toEntity(ReviewRequestDTO dto, Reviewer reviewer, Professional professional);

    ReviewResponseDTO toResponseDTO(Review review);
}
