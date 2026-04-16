package io.github.anigaut.adhdresources.admin;

import io.github.anigaut.adhdresources.admin.dto.AdminLoginDTO;
import io.github.anigaut.adhdresources.admin.dto.AdminRegisterDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    Admin toEntity(AdminRegisterDTO dto);
    Admin toEntity(AdminLoginDTO dto);
}

