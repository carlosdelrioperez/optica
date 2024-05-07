package com.example.demo.optico;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    // Eliminar un óptico
    @DeleteMapping("/opticos/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable("id") Integer id) {
        Optional<Optico> opticoExistente = opticoService.findOpticoById(id);

        if (opticoExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        opticoService.deleteOptico(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
