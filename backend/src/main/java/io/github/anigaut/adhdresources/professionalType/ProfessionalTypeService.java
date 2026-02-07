package io.github.anigaut.adhdresources.professionalType;

import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeRequestDTO;
import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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
        ProfessionalType type = professionalTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("Professional type not found with id: " + id));
        return professionalTypeMapper.toResponseDTO(type);
    }

    public List<ProfessionalTypeResponseDTO> getAllProfessionalTypes() {
        return professionalTypeMapper.toResponseDTOList(professionalTypeRepository.findAll());
    }

    @Transactional
    public ProfessionalTypeResponseDTO updateProfessionalType(int id, ProfessionalTypeRequestDTO requestDTO) {
        ProfessionalType type = professionalTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("Professional type not found with id: " + id));
        professionalTypeMapper.updateProfessionalTypeFromDTO(requestDTO, type);
        ProfessionalType updatedType = professionalTypeRepository.save(type);
        return professionalTypeMapper.toResponseDTO(updatedType);
    }

    @Transactional
    public void deleteProfessionalType(int id) {
        ProfessionalType type = professionalTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("Professional type not found with id: " + id));
        professionalTypeRepository.delete(type);
    }
}
