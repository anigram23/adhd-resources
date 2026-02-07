package io.github.anigaut.adhdresources.professionalType;

import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeRequestDTO;
import io.github.anigaut.adhdresources.professionalType.dto.ProfessionalTypeResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professional-type")
public class ProfessionalTypeController {
    private final ProfessionalTypeService professionalTypeService;

    @Autowired
    public ProfessionalTypeController(ProfessionalTypeService professionalTypeService) {
        this.professionalTypeService = professionalTypeService;
    }

    @GetMapping("/")
    public ResponseEntity<List<ProfessionalTypeResponseDTO>> getAllProfessionalTypes() {
        return ResponseEntity.status(HttpStatus.OK).body(professionalTypeService.getAllProfessionalTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessionalTypeResponseDTO> getProfessionalTypeById(@PathVariable int id) {
        ProfessionalTypeResponseDTO type = professionalTypeService.getProfessionalTypeById(id);
        return ResponseEntity.status(HttpStatus.OK).body(type);
    }

    @PostMapping("/")
    public ProfessionalTypeResponseDTO createProfessionalType(@RequestBody ProfessionalTypeRequestDTO professionalTypeRequest) {
        return professionalTypeService.createProfessionalType(professionalTypeRequest);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProfessionalTypeResponseDTO> updateProfessionalType(@PathVariable int id, @RequestBody ProfessionalTypeRequestDTO professionalTypeRequest) {
        ProfessionalTypeResponseDTO updatedType = professionalTypeService.updateProfessionalType(id, professionalTypeRequest);
        return ResponseEntity.status(HttpStatus.OK).body(updatedType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProfessionalType(@PathVariable int id) {
        professionalTypeService.deleteProfessionalType(id);
        return ResponseEntity.status(HttpStatus.OK).body("Professional type with id " + id + " deleted successfully.");
    }
}
