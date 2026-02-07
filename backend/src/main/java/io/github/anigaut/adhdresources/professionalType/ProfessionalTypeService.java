package io.github.anigaut.adhdresources.professionalType;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeRequestDTO;
import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeResponseDTO;
import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeUpdateDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessionalTypeService {
    private final ProfessionalTypeRepository professionalTypeRepository;
    private final ProfessionalTypeMapper professionalTypeMapper;

    @Autowired
    public ProfessionalTypeService(ProfessionalTypeRepository professionalTypeRepository, ProfessionalTypeMapper professionalTypeMapper) {
        this.professionalTypeRepository = professionalTypeRepository;
        this.professionalTypeMapper = professionalTypeMapper;
    }

    @Transactional
    public ProfessionalTypeResponseDTO createProfessionalType(ProfessionalTypeRequestDTO requestDTO) {
        ProfessionalType professionalType = professionalTypeMapper.toEntity(requestDTO);
        ProfessionalType savedProfessionalType = professionalTypeRepository.save(professionalType);
        return professionalTypeMapper.toResponseDTO(savedProfessionalType);
    }

    public ProfessionalTypeResponseDTO getProfessionalTypeById(int id) {
        ProfessionalType type = professionalTypeRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A professional type with this ID doesn't exist."));
        return professionalTypeMapper.toResponseDTO(type);
    }

    public List<ProfessionalTypeResponseDTO> getAllProfessionalTypes() {
        return professionalTypeMapper.toResponseDTOList(professionalTypeRepository.findAll());
    }

    @Transactional
    public ProfessionalTypeResponseDTO updateProfessionalType(int id, ProfessionalTypeUpdateDTO updateDTO) {
        ProfessionalType type = professionalTypeRepository.findById(id).
                orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A professional type with this ID doesn't exist."));
        professionalTypeMapper.updateProfessionalTypeFromDTO(updateDTO, type);
        ProfessionalType updatedType = professionalTypeRepository.save(type);
        return professionalTypeMapper.toResponseDTO(updatedType);
    }

    @Transactional
    public void deleteProfessionalType(int id) {
        ProfessionalType type = professionalTypeRepository.findById(id).
                orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "A professional type with this ID doesn't exist."));
        professionalTypeRepository.delete(type);
    }
}
