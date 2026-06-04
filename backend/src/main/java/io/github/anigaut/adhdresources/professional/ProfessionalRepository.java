package io.github.anigaut.adhdresources.professional;

import io.github.anigaut.adhdresources.city.City;
import io.github.anigaut.adhdresources.professionalType.ProfessionalType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfessionalRepository extends JpaRepository<Professional, Integer> {
    List<Professional> findByProfessionalTypeAndCity(ProfessionalType type, City city);

    boolean existsBySlug(String slug);

    List<Professional> findByNameContainingIgnoreCase(String name);
}
