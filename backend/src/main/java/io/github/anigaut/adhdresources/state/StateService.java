package io.github.anigaut.adhdresources.state;

import io.github.anigaut.adhdresources.state.dto.StateResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateService {
    private final StateRepository stateRepository;
    private final StateMapper stateMapper;

    @Autowired
    public StateService(StateRepository stateRepository, StateMapper stateMapper) {
        this.stateRepository = stateRepository;
        this.stateMapper = stateMapper;
    }

    public List<StateResponseDTO> getAllStates() {
        return stateMapper.toResponseDTOList(stateRepository.findAll());
    }
}
