package io.github.anigaut.adhdresources.city;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Integer> {
    List<City> findByStateId(int stateId);

    Optional<City> findByName(String city);
}
