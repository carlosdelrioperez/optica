package com.example.demo.optico;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OpticoController {

    private final OpticoService opticoService;

    public OpticoController(OpticoService opticoService) {
        this.opticoService = opticoService;
    }

    // Encontrar todos los ópticos
    @GetMapping("/opticos")
    public List<Optico> getOpticos() {
        System.out.println("Controlador");
        return opticoService.findAllOpticos();
    }

    // Encontrar óptico por email
    @GetMapping("/opticos/findByEmail")
    public Optional<Optico> getOpticoByEmail(@RequestParam String email) {
        return opticoService.findByEmail(email);
    }

}
