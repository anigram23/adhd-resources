package io.github.anigaut.adhdresources.admin;

import io.github.anigaut.adhdresources.admin.dto.AdminLoginDTO;
import io.github.anigaut.adhdresources.reviewer.ReviewerService;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerResponseDTO;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;
    private final ReviewerService reviewerService;

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

    @GetMapping("/reviewers")
    public ResponseEntity<List<ReviewerResponseDTO>> getReviewersForAdmin(
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String email) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reviewerService.getReviewersForAdmin(id, email));
    }
}
