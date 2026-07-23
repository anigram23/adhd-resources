package io.github.anigaut.adhdresources.reviewer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewerRepository extends JpaRepository<Reviewer, Integer> {
    Reviewer findByEmail(String email);
    boolean existsByEmail(String email);

    @Query(value = "SELECT r.* FROM reviewer r WHERE " +
            "(:email IS NULL OR LOWER(r.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
            "(:id IS NULL OR CAST(r.id AS TEXT) LIKE CONCAT('%', :id, '%')) " +
            "ORDER BY r.id ASC",
            nativeQuery = true)
    List<Reviewer> searchForAdmin(@Param("id") String id, @Param("email") String email);

}
