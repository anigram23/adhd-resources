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

    public List<ProfessionalResponseDTO> getProfessionalsByTypeAndCity(String type, String city) {
        ProfessionalType professionalType = professionalTypeRepository.findByTitle(type)
            .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, "Professional type not found. Please try again."));

        City professionalCity = cityRepository.findByName(city)
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, "City not found. Please try again."));

        return professionalMapper.toResponseDTOList(
                professionalRepository.findByProfessionalTypeAndCity(professionalType, professionalCity)
        );
    }

    private String generateSlug(String name, String type, String city) {
        String base = (name + "-" + type + "-" + city).toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
        if (!professionalRepository.existsBySlug(base)) return base;
        int suffix = 2;
        while (professionalRepository.existsBySlug(base + "-" + suffix)) suffix++;
        return base + "-" + suffix;
    }

    @Transactional
    public Professional createProfessionalFromReview(ProfessionalRequestDTO professionalRequestDTO) {

        City city = cityRepository.findByName(professionalRequestDTO.getCityName())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, "The City You Are Looking For Cannot be Found."));

        ProfessionalType professionalType = professionalTypeRepository.findByTitle(professionalRequestDTO.getProfessionalTypeTitle())
                .orElseThrow(() -> new HttpException(HttpStatus.BAD_REQUEST, "The Professional Type You Are Looking For Cannot be Found."));

        Professional professional = professionalMapper.toEntity(professionalRequestDTO, city, professionalType);
        professional.setSlug(generateSlug(professionalRequestDTO.getName(), professionalType.getTitle(), city.getName()));
        return professionalRepository.save(professional);
    }
}
