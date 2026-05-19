package io.github.anigaut.adhdresources.professional;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfessionalRepository extends JpaRepository<Professional, Integer> {
    List<Professional> findByProfessionalTypeIdAndCityId(int professionalTypeId, int cityId);
}
