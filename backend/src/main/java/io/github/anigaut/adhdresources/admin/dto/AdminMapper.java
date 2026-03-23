package io.github.anigaut.adhdresources.admin.dto;

import io.github.anigaut.adhdresources.admin.Admin;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    Admin toEntity(AdminRegisterDTO dto);
    Admin toEntity(AdminLoginDTO dto);
}

