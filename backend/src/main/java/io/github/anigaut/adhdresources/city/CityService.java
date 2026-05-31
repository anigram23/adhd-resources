package io.github.anigaut.adhdresources.city;

import io.github.anigaut.adhdresources.city.dto.CityResponseDTO;
import io.github.anigaut.adhdresources.core.exception.HttpException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
    private final CityRepository cityRepository;
    private final CityMapper cityMapper;

    @Autowired
    public CityService(CityRepository cityRepository, CityMapper cityMapper) {
        this.cityRepository = cityRepository;
        this.cityMapper = cityMapper;
    }

    public List<CityResponseDTO> getCitiesByState(int stateId) {
        return cityMapper.toResponseDTOList(cityRepository.findByStateId(stateId));
    }

    public CityResponseDTO getCityByName(String name) {
        City city = cityRepository.findByName(name)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A city with this name doesn't exist. Please Try Again."));
        return cityMapper.toResponseDTO(city);
    }
}
