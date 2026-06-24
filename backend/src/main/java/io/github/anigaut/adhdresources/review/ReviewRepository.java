package io.github.anigaut.adhdresources.review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByProfessionalId(int professionalId);
    List<Review> findByReviewerId(int reviewerId);
}
