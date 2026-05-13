package io.github.anigaut.adhdresources.professional;

import io.github.anigaut.adhdresources.city.CityRepository;
import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalRequestDTO;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalResponseDTO;
import io.github.anigaut.adhdresources.professional.dto.ProfessionalUpdateDTO;
import io.github.anigaut.adhdresources.professionalType.ProfessionalTypeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfessionalService {
    private final ProfessionalRepository professionalRepository;
    private final ProfessionalMapper professionalMapper;
    private final CityRepository  cityRepository;
    private final ProfessionalTypeRepository professionalTypeRepository;

    @Transactional
    public ProfessionalResponseDTO createProfessional(ProfessionalRequestDTO professionalRequestDTO) {

        if (!cityRepository.existsById(professionalRequestDTO.getCityId())) {
            throw new HttpException(HttpStatus.NOT_FOUND, "City not found");
        }

        if (!professionalTypeRepository.existsById(professionalRequestDTO.getProfessionalTypeId())) {
            throw new HttpException(HttpStatus.NOT_FOUND, "Professional type not found");
        }

        Professional newProfessional = professionalRepository.save(professionalMapper.toEntity(professionalRequestDTO));
        return professionalMapper.toResponseDTO(newProfessional);
    }

    @Transactional
    public ProfessionalResponseDTO updateProfessional(int id, ProfessionalUpdateDTO  professionalUpdateDTO) {
        Professional professional = professionalRepository.findById(id).orElseThrow(
                () -> new HttpException(HttpStatus.NOT_FOUND, "Professional not found"));

        if (professionalUpdateDTO.getCityId() != null &&  !cityRepository.existsById(professionalUpdateDTO.getCityId())) {
            throw new HttpException(HttpStatus.NOT_FOUND, "City not found");
        }

        professionalMapper.updateEntity(professionalUpdateDTO, professional);
        professionalRepository.save(professional);
        return professionalMapper.toResponseDTO(professional);
    }

    @Transactional
    public String deleteProfessional(int id) {
        Professional professional = professionalRepository.findById(id).orElseThrow(
                () -> new HttpException(HttpStatus.NOT_FOUND, "Professional not found")
        );

        professionalRepository.delete(professional);
        return "Deleted Professional Successfully";
    }
}
