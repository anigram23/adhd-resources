package io.github.anigaut.adhdresources.state;

import io.github.anigaut.adhdresources.state.dto.StateResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/state")
public class StateController {
    private final StateService stateService;

    @Autowired
    public StateController(StateService stateService) {
        this.stateService = stateService;
    }

    @GetMapping("/")
    public ResponseEntity<List<StateResponseDTO>> getAllStates() {
        return ResponseEntity.status(HttpStatus.OK).body(stateService.getAllStates());
    }
}
