package io.github.anigaut.adhdresources.core.security.auth;

import io.github.anigaut.adhdresources.admin.AdminService;
import io.github.anigaut.adhdresources.reviewer.ReviewerService;
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
    private final ReviewerService reviewerService;

    @GetMapping("/me")
    public ResponseEntity<UserDetailsDTO> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.badRequest().build();
        }

        String email = authentication.getPrincipal().toString();
        String role = authentication.getAuthorities().stream().findFirst().orElseThrow().getAuthority().replace("ROLE_", ""); // remove "ROLE_" prefix

        if (role.equals("ADMIN")) {
            return ResponseEntity.ok(adminService.getCurrentAdmin(email));
        } else {
            return ResponseEntity.ok(reviewerService.getCurrentReviewer(email));
        }

    }
}
