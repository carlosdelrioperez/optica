package com.example.demo.optico;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class OpticoService {

    private final OpticoRepository opticoRepository;

    public OpticoService(OpticoRepository opticoRepository) {
        this.opticoRepository = opticoRepository;
    }

    public List<Optico> findAllOpticos() {
        return opticoRepository.findAll();
    }

    public Optional<Optico> findByEmail(String email) {
        return opticoRepository.findByEmail(email);
    }

    public void deleteOptico(Integer id) {
        opticoRepository.deleteById(id);
    }

    public Optional<Optico> findOpticoById(Integer id) {
        return opticoRepository.findById(id);
    }

}
