package io.github.anigaut.adhdresources.city;

import io.github.anigaut.adhdresources.city.dto.CityResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/city")
public class CityController {
    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/state/{stateId}")
    public ResponseEntity<List<CityResponseDTO>> getCitiesByState(@PathVariable int stateId) {
        return ResponseEntity.status(HttpStatus.OK).body(cityService.getCitiesByState(stateId));
    }

    @GetMapping("/{name}")
    public ResponseEntity<CityResponseDTO> getCityByName(@PathVariable String name) {
        return ResponseEntity.status(HttpStatus.OK).body(cityService.getCityByName(name));
    }
}
