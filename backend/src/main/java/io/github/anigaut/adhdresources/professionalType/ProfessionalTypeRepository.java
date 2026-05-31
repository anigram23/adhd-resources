package io.github.anigaut.adhdresources.professionalType;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfessionalTypeRepository extends JpaRepository<ProfessionalType, Integer> {
        boolean existsByTitle(String title);

        Optional<ProfessionalType> findByTitle(String type);
}
