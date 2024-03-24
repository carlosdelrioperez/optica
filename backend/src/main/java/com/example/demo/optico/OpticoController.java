package com.example.demo.optico;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OpticoController {

    private final OpticoService opticoService;

    public OpticoController(OpticoService opticoService) {
        this.opticoService = opticoService;
    }

    // Encontrar todos los ópticos
    @GetMapping("/opticos")
    public List<Optico> getOpticos() {
        return opticoService.findAllOpticos();
    }

    // Encontrar un óptico específico
    @GetMapping("/opticos/{id}")
    public ResponseEntity<Optico> findOpticoById(@PathVariable Integer id) {
        Optico optico = opticoService.findOpticoById(id);

        if (optico != null) {
            return new ResponseEntity<>(optico, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Crear un óptico nuevo
    @PostMapping("/opticos")
    public ResponseEntity<Optico> createOptico(@RequestBody Optico optico) {
        Optico nuevoOptico = opticoService.createOptico(optico);
        return new ResponseEntity<>(nuevoOptico, HttpStatus.CREATED);
    }

    // Actualizar un óptico
    @PutMapping("/opticos")
    public ResponseEntity<Optico> updateOptico(@RequestParam("id") Integer id,
            @RequestBody Map<String, Object> camposActualizados) {
        Optico opticoExistente = opticoService.findOpticoById(id);

        if (opticoExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Iterar sobre las entradas del mapa y actualizar los campos correspondientes
        camposActualizados.forEach((nombreCampo, valorCampo) -> {
            switch (nombreCampo) {
                case "nombre":
                    opticoExistente.setNombre((String) valorCampo);
                    break;
                case "apellidos":
                    opticoExistente.setApellidos((String) valorCampo);
                    break;
                case "email":
                    opticoExistente.setEmail((String) valorCampo);
                    break;
                case "password":
                    opticoExistente.setPassword((String) valorCampo);
                    break;
                case "fechaNacimiento":
                    String fechaNacimientoStr = (String) valorCampo;
                    LocalDate fechaNacimiento = LocalDate.parse(fechaNacimientoStr);
                    opticoExistente.setFechaNacimiento(fechaNacimiento);
                    break;
                case "telefono":
                    opticoExistente.setTelefono((Integer) valorCampo);
                    break;
                case "colegiado":
                    opticoExistente.setColegiado((Integer) valorCampo);
                    break;
            }
        });

        Optico opticoActualizado = opticoService.updateOptico(opticoExistente);
        return new ResponseEntity<>(opticoActualizado, HttpStatus.OK);
    }

    // Borrar un óptico
    @DeleteMapping("/opticos/{id}")
    public ResponseEntity<Void> deleteOptico(@PathVariable("id") Integer id) {
        Optico opticoExistente = opticoService.findOpticoById(id);

        if (opticoExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        opticoService.deleteOptico(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
