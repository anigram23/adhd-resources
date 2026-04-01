package io.github.anigaut.adhdresources.admin;

import io.github.anigaut.adhdresources.admin.dto.AdminLoginDTO;
import io.github.anigaut.adhdresources.admin.dto.AdminRegisterDTO;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

//    @PostMapping("/register")
//    public ResponseEntity<String> register(@Valid @RequestBody AdminRegisterDTO dto, HttpServletResponse response) {
//        adminService.register(dto, response);
//        return ResponseEntity.status(HttpStatus.CREATED).body("Registered successfully");
//    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody AdminLoginDTO dto, HttpServletResponse response) {
        adminService.login(dto, response);
        return ResponseEntity.status(HttpStatus.OK).body("Logged in successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        adminService.logout(response);
        return ResponseEntity.status(HttpStatus.OK).body("Logged out successfully");
    }

    @GetMapping("/test")
    public String test() {
        return "Hello, admin!";
    }
}
