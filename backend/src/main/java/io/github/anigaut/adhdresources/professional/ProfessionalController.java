package io.github.anigaut.adhdresources.professional;

import io.github.anigaut.adhdresources.professional.dto.ProfessionalResponseDTO;
import io.github.anigaut.adhdresources.review.ReviewService;
import io.github.anigaut.adhdresources.review.dto.ReviewResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professional")
@RequiredArgsConstructor
public class ProfessionalController {
    private final ProfessionalService professionalService;
    private final ReviewService reviewService;

    @GetMapping("/")
    public ResponseEntity<List<ProfessionalResponseDTO>> getProfessionals(
            @RequestParam String type,
            @RequestParam String city) {
        return ResponseEntity.ok(professionalService.getProfessionalsByTypeAndCity(type, city));
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> getReviewsForProfessional(@PathVariable int id) {
        return ResponseEntity.ok(reviewService.getReviewsByProfessionalId(id));
    }
}