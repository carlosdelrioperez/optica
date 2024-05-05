package com.example.demo.optico;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class OpticoService {

    private OpticoRepository opticoRepository;

    public OpticoService(OpticoRepository opticoRepository) {
        this.opticoRepository = opticoRepository;
    }

    // Encontrar todos los ópticos
    public List<Optico> findAllOpticos() {
        return (List<Optico>) opticoRepository.findAll();
    }

    // Obtener un óptico por el id
    public Optico findOpticoById(Integer id) {
        return opticoRepository.findById(id).orElse(null);
    }

    public Optico updateOptico(Optico optico) {
        // Aquí podrías realizar alguna validación o lógica de negocio antes de
        // actualizar el óptico
        return opticoRepository.save(optico);
    }

    public void deleteOptico(Integer id) {
        opticoRepository.deleteById(id);
    }

}
