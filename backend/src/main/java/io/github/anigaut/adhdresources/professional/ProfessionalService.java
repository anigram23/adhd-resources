package io.github.anigaut.adhdresources.professional;

import io.github.anigaut.adhdresources.city.City;
import io.github.anigaut.adhdresources.city.CityRepository;
import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalRequestDTO;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalResponseDTO;
import io.github.anigaut.adhdresources.professionalType.ProfessionalType;
import io.github.anigaut.adhdresources.professionalType.ProfessionalTypeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessionalService {
    private final ProfessionalRepository professionalRepository;
    private final ProfessionalMapper professionalMapper;
    private final CityRepository cityRepository;
    private final ProfessionalTypeRepository professionalTypeRepository;

    public List<ProfessionalResponseDTO> getProfessionalsByTypeAndCity(int typeId, int cityId) {
        return professionalMapper.toResponseDTOList(
                professionalRepository.findByProfessionalTypeIdAndCityId(typeId, cityId)
        );
    }

    @Transactional
    public Professional createProfessionalFromReview(ProfessionalRequestDTO professionalRequestDTO) {

        City city = cityRepository.findById(professionalRequestDTO.getCityId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, "City not found"));

        ProfessionalType professionalType = professionalTypeRepository.findById(professionalRequestDTO.getProfessionalTypeId())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, "Professional type not found"));

        return professionalRepository.save(professionalMapper.toEntity(professionalRequestDTO, city, professionalType));
    }
}
