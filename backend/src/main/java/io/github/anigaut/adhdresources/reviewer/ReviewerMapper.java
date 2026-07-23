package io.github.anigaut.adhdresources.reviewer;

import io.github.anigaut.adhdresources.core.security.auth.UserDetailsDTO;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerRegisterDTO;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerResponseDTO;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class ReviewerMapper {

    @Autowired
    protected PasswordEncoder passwordEncoder;

    @Mapping(target = "passwordHash", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    public abstract Reviewer toEntity(ReviewerRegisterDTO dto);

    @AfterMapping
    protected void encodePassword(ReviewerRegisterDTO dto, @MappingTarget Reviewer reviewer) {
        reviewer.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
    }

    @Mapping(target = "role", constant = "REVIEWER")
    @Mapping(target = "name", ignore = true)
    public abstract UserDetailsDTO toUserDetailsDTO(Reviewer reviewer);

    public abstract ReviewerResponseDTO toResponseDTO(Reviewer reviewer);

    public abstract List<ReviewerResponseDTO> toResponseDTOList(List<Reviewer> reviewers);
}
