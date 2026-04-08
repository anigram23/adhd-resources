package io.github.anigaut.adhdresources.admin;

import io.github.anigaut.adhdresources.admin.dto.AdminLoginDTO;
import io.github.anigaut.adhdresources.admin.dto.AdminRegisterDTO;
import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.core.security.auth.UserDetailsDTO;
import io.github.anigaut.adhdresources.core.security.jwt.JwtUtil;
import io.github.anigaut.adhdresources.core.utils.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final CookieUtil cookieUtil;
    private final JwtUtil jwtUtil;

//    @Transactional
//    public void register(AdminRegisterDTO dto, HttpServletResponse response) {
//        if (adminRepository.existsByEmail(dto.getEmail())) {
//            throw new HttpException(HttpStatus.BAD_REQUEST, "An admin with this email already exists, please enter a different one");
//        }
//
//        Admin newAdmin = new Admin();
//        newAdmin.setName(dto.getName());
//        newAdmin.setEmail(dto.getEmail());
//        newAdmin.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
//        newAdmin.setSuper(false);
//        adminRepository.save(newAdmin);
//
//        String token = jwtUtil.generateToken(newAdmin.getEmail(), "ADMIN");
//        cookieUtil.attachJwtCookie(response, token);
//    }

    @Transactional
    public void login(AdminLoginDTO dto, HttpServletResponse response) {
        Admin admin = adminRepository.findByEmail(dto.getEmail());
        if (admin == null) {
            throw new HttpException(HttpStatus.NOT_FOUND, "An admin with this email doesn't exist");
        }

        if (!passwordEncoder.matches(dto.getPassword(), admin.getPasswordHash())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Incorrect password");
        }

        String token = jwtUtil.generateToken(admin.getEmail(), "ADMIN");
        cookieUtil.attachJwtCookie(response, token);
    }

    public void logout(HttpServletResponse response) {
        cookieUtil.clearJwtCookie(response);
    }

    public UserDetailsDTO getCurrentAdmin(String email) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin == null) {
            throw new HttpException(HttpStatus.NOT_FOUND, "An admin with this email doesn't exist");
        }

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setId(admin.getId());
        userDetailsDTO.setEmail(admin.getEmail());
        userDetailsDTO.setName(admin.getName());
        userDetailsDTO.setRole("ADMIN");

        return userDetailsDTO;
    }
}
