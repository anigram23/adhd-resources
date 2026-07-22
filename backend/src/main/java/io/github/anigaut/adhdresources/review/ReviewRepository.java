package io.github.anigaut.adhdresources.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByProfessionalId(int professionalId);
    List<Review> findByReviewerId(int reviewerId);
    List<Review> findByUpdatedAtBetween(Instant fromDate, Instant toDate);

    @Modifying
    @Query("UPDATE Review r SET r.reviewer = null WHERE r.reviewer.id = :reviewerId")
    void detachFromReviewer(@Param("reviewerId") int reviewerId);
}
