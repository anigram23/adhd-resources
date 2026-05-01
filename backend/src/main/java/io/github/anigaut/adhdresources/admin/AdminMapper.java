package io.github.anigaut.adhdresources.admin;

import io.github.anigaut.adhdresources.admin.dto.AdminRegisterDTO;
import io.github.anigaut.adhdresources.core.security.auth.UserDetailsDTO;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring")
public abstract class AdminMapper {

    @Autowired
    protected PasswordEncoder passwordEncoder;

    @Mapping(target = "passwordHash", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "super", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    public abstract Admin toEntity(AdminRegisterDTO dto);

    @AfterMapping
    protected void encodePassword(AdminRegisterDTO dto, @MappingTarget Admin admin) {
        admin.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
    }

    @Mapping(target = "role", constant = "ADMIN")
    public abstract UserDetailsDTO toUserDetailsDTO(Admin admin);
}
