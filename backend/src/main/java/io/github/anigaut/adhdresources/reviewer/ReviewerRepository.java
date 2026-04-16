package io.github.anigaut.adhdresources.reviewer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewerRepository extends JpaRepository<Reviewer, Integer> {
    Reviewer findByEmail(String email);
    boolean existsByEmail(String email);

}
