package io.github.anigaut.adhdresources.review;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.professional.Professional;
import io.github.anigaut.adhdresources.professional.ProfessionalRepository;
import io.github.anigaut.adhdresources.professional.ProfessionalService;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalRequestDTO;
import io.github.anigaut.adhdresources.review.dto.ReviewRequestDTO;
import io.github.anigaut.adhdresources.review.dto.ReviewResponseDTO;
import io.github.anigaut.adhdresources.review.dto.ReviewUpdateDTO;
import io.github.anigaut.adhdresources.reviewer.Reviewer;
import io.github.anigaut.adhdresources.reviewer.ReviewerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final ReviewerRepository reviewerRepository;
    private final ProfessionalRepository professionalRepository;
    private final ProfessionalService professionalService;

    @Transactional
    public ReviewResponseDTO createReview(ReviewRequestDTO reviewRequestDTO, String reviewerEmail) {
        Reviewer reviewer = reviewerRepository.findByEmail(reviewerEmail);
        if (reviewer == null) throw new HttpException(HttpStatus.NOT_FOUND, "Reviewer Not Found");

        Professional professional;
        if (reviewRequestDTO.getProfessionalId() != null) {
            professional = professionalRepository.findById(reviewRequestDTO.getProfessionalId())
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "Professional Not Found"));
        } else if (
                reviewRequestDTO.getCityId() != null
                        &&  reviewRequestDTO.getProfessionalName() != null
                        &&  reviewRequestDTO.getProfessionalTypeId() != null
        ) {
            ProfessionalRequestDTO professionalRequestDTO = new ProfessionalRequestDTO(
                    reviewRequestDTO.getCityId(),
                    reviewRequestDTO.getProfessionalTypeId(),
                    reviewRequestDTO.getProfessionalName()
            );

            professional = professionalService.createProfessionalFromReview(professionalRequestDTO);
        } else {
            throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    "Please provide required details to identify existing professional or create new one."
            );
        }

        Review newReview = reviewRepository.save(reviewMapper.toEntity(reviewRequestDTO, reviewer, professional));
        return reviewMapper.toResponseDTO(newReview);
    }

    @Transactional
    public ReviewResponseDTO updateReview(int id, ReviewUpdateDTO reviewUpdateDTO, String reviewerEmail) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "Review Not Found"));

        if (!review.getReviewer().getEmail().equals(reviewerEmail)) {
            throw new HttpException(HttpStatus.FORBIDDEN, "You do not have permission to update this review");
        }

        reviewMapper.updateEntity(reviewUpdateDTO, review);
        reviewRepository.save(review);

        return reviewMapper.toResponseDTO(review);
    }

    @Transactional
    public String deleteReview(int id, String reviewerEmail) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "Review not found"));

        if (!review.getReviewer().getEmail().equals(reviewerEmail)) {
            throw new HttpException(HttpStatus.FORBIDDEN, "You do not have permission to delete this review");
        }

        reviewRepository.delete(review);
        return "Deleted Review Successfully";
    }
}
