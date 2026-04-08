package io.github.anigaut.adhdresources.core.security.auth;

import io.github.anigaut.adhdresources.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AdminService adminService;
    // add reviewer service too

    @GetMapping("/me")
    public ResponseEntity<UserDetailsDTO> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.badRequest().build();
        }

        String email = authentication.getPrincipal().toString();
        String role = authentication.getAuthorities().stream().findFirst().orElseThrow().getAuthority().replace("ROLE_", ""); // remove "ROLE_" prefix

        // later check for the role, and get the user according to it
        return ResponseEntity.ok(adminService.getCurrentAdmin(email));
    }
}
