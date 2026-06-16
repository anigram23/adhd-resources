package io.github.anigaut.adhdresources.review;

import io.github.anigaut.adhdresources.admin.AdminRepository;
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

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final ReviewerRepository reviewerRepository;
    private final ProfessionalRepository professionalRepository;
    private final ProfessionalService professionalService;
    private final AdminRepository adminRepository;

    public List<ReviewResponseDTO> getReviewsByProfessionalId(int professionalId) {
        if (!professionalRepository.existsById(professionalId)) {
            throw new HttpException(HttpStatus.NOT_FOUND, "Could Not Find The Professional You Are Looking For. Please Try Again.");
        }

        return reviewRepository.findByProfessionalId(professionalId)
                .stream()
                .map(reviewMapper::toResponseDTO)
                .toList();
    }

    @Transactional
    public ReviewResponseDTO createReview(ReviewRequestDTO reviewRequestDTO, String reviewerEmail) {
        Reviewer reviewer = reviewerRepository.findByEmail(reviewerEmail);
        if (reviewer == null) throw new HttpException(HttpStatus.NOT_FOUND, "The User Trying to Post This Review Does Not Exist. Please Register To Post Reviews.");

        Professional professional;
        if (reviewRequestDTO.getProfessionalId() != null) {
            professional = professionalRepository.findById(reviewRequestDTO.getProfessionalId())
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "The Professional You Tried to Review Does Not Exist."));
        } else if (
                reviewRequestDTO.getCityName() != null
                        &&  reviewRequestDTO.getProfessionalName() != null
                        &&  reviewRequestDTO.getProfessionalTypeTitle() != null
        ) {
            ProfessionalRequestDTO professionalRequestDTO = new ProfessionalRequestDTO(
                    reviewRequestDTO.getCityName(),
                    reviewRequestDTO.getProfessionalTypeTitle(),
                    reviewRequestDTO.getProfessionalName()
            );

            professional = professionalService.createProfessionalFromReview(professionalRequestDTO);
        } else {
            throw new HttpException(
                    HttpStatus.BAD_REQUEST,
                    "Please Provide All The Required Details To Identify Existing An Existing Professional. You May Also Add a Professional To Our Database."
            );
        }

        Review newReview = reviewRepository.save(reviewMapper.toEntity(reviewRequestDTO, reviewer, professional));
        return reviewMapper.toResponseDTO(newReview);
    }

    @Transactional
    public ReviewResponseDTO updateReview(int id, ReviewUpdateDTO reviewUpdateDTO, String reviewerEmail) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "Could Not Find The Review You Are Looking For."));

        if (!review.getReviewer().getEmail().equals(reviewerEmail)) {
            throw new HttpException(HttpStatus.FORBIDDEN, "You Do Not Have Permission To Update This Review.");
        }

        reviewMapper.updateEntity(reviewUpdateDTO, review);
        reviewRepository.save(review);

        return reviewMapper.toResponseDTO(review);
    }

    @Transactional
    public String deleteReview(int id, String userEmail) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "Could Not Find The Review You Are Looking For."));

        if (!review.getReviewer().getEmail().equals(userEmail) && !adminRepository.existsByEmail(userEmail)) {
            throw new HttpException(HttpStatus.FORBIDDEN, "You Do Not Have Permission To Delete This Review.");
        }

        reviewRepository.delete(review);
        return "Deleted Review Successfully";
    }
}
