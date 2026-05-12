package io.github.anigaut.adhdresources.city;

import io.github.anigaut.adhdresources.city.dto.CityResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
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
}
