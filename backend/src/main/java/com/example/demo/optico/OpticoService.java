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

    public void deleteOptico(Long id) {
        opticoRepository.deleteById(id);
    }

    public Optional<Optico> findOpticoById(Long id) {
        return opticoRepository.findById(id);
    }

    public Optico updateOptico(Optico optico) {
        return opticoRepository.save(optico);
    }

}
