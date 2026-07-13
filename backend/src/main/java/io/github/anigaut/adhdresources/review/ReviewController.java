package io.github.anigaut.adhdresources.review;

import io.github.anigaut.adhdresources.review.dto.ReviewRequestDTO;
import io.github.anigaut.adhdresources.review.dto.ReviewResponseDTO;
import io.github.anigaut.adhdresources.review.dto.ReviewUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/reviews-for-admin")
    public ResponseEntity<List<ReviewResponseDTO>> getReviewsForAdmin(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) Integer reviewerId,
            @RequestParam(required = false) Integer professionalId,
            @RequestParam(required = false) Instant fromDate,
            @RequestParam(required = false) Instant toDate) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reviewService.getReviewsForAdmin(id, reviewerId, professionalId, fromDate, toDate));
    }

    @PostMapping("/")
    public ResponseEntity<ReviewResponseDTO> createReview(
            @Valid @RequestBody ReviewRequestDTO reviewRequestDTO,
            @AuthenticationPrincipal String reviewerEmail) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reviewService.createReview(reviewRequestDTO, reviewerEmail));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> updateReview(
            @PathVariable int id,
            @Valid @RequestBody ReviewUpdateDTO reviewUpdateDTO,
            @AuthenticationPrincipal String reviewerEmail) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reviewService.updateReview(id, reviewUpdateDTO, reviewerEmail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(
            @PathVariable int id,
            @AuthenticationPrincipal String userEmail) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reviewService.deleteReview(id, userEmail));
    }
}
