package io.github.anigaut.adhdresources.reviewer;

import io.github.anigaut.adhdresources.admin.dto.AdminLoginDTO;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerLoginDTO;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerRegisterDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/reviewer")
public class ReviewerController {
    private final ReviewerService reviewerService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody ReviewerRegisterDTO dto, HttpServletResponse response) {
        reviewerService.register(dto, response);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody ReviewerLoginDTO dto, HttpServletResponse response) {
        reviewerService.login(dto, response);
        return ResponseEntity.status(HttpStatus.OK).body("Logged in successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        reviewerService.logout(response);
        return ResponseEntity.status(HttpStatus.OK).body("Logged out successfully");
    }
}
