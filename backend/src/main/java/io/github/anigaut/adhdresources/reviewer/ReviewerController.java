package io.github.anigaut.adhdresources.reviewer;

import io.github.anigaut.adhdresources.review.ReviewService;
import io.github.anigaut.adhdresources.review.dto.ReviewResponseDTO;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerLoginDTO;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerPasswordChangeDTO;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerRegisterDTO;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/reviewer")
public class ReviewerController {
    private final ReviewerService reviewerService;
    private final ReviewService reviewService;

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

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> getReviewsForReviewer(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.getReviewsByReviewerId(id));
    }

    @PatchMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @Valid @RequestBody ReviewerPasswordChangeDTO dto,
            @AuthenticationPrincipal String reviewerEmail
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(reviewerService.changePassword(dto, reviewerEmail));
    }
}
