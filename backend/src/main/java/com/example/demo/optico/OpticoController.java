package com.example.demo.optico;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OpticoController {

    private final OpticoService opticoService;
    private final PasswordEncoder passwordEncoder;

    public OpticoController(OpticoService opticoService, PasswordEncoder passwordEncoder) {
        this.opticoService = opticoService;
        this.passwordEncoder = passwordEncoder;
    }

    // Encontrar todos los ópticos
    @GetMapping("/opticos")
    public List<Optico> getOpticos() {
        System.out.println("Controlador");
        return opticoService.findAllOpticos();
    }

    // Encontrar óptico por id
    @GetMapping("/opticos/{id}")
    public Optional<Optico> getOpticoById(@PathVariable Long id) {
        return opticoService.findOpticoById(id);
    }

    // Encontrar óptico por email
    @GetMapping("/opticos/findByEmail")
    public Optional<Optico> getOpticoByEmail(@RequestParam String email) {
        return opticoService.findByEmail(email);
    }

    // Actualizar un cliente
    @PutMapping("/opticos")
    public ResponseEntity<Optico> actualizarOptico(@RequestParam("id") Long id,
            @RequestBody Map<String, Object> camposActualizados) {
        Optional<Optico> opticoExistente = opticoService.findOpticoById(id);

        if (opticoExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        camposActualizados.forEach((nombreCampo, valorCampo) -> {
            switch (nombreCampo) {
                case "nombre":
                    opticoExistente.get().setNombre((String) valorCampo);
                    break;
                case "apellidos":
                    opticoExistente.get().setApellidos((String) valorCampo);
                    break;
                case "email":
                    opticoExistente.get().setEmail((String) valorCampo);
                    break;
                case "password":
                    opticoExistente.get().setPassword((String) passwordEncoder.encode((CharSequence) valorCampo));
                    break;
                case "fechaNacimiento":
                    String fechaNacimientoStr = (String) valorCampo;
                    LocalDate fechaNacimiento = LocalDate.parse(fechaNacimientoStr);
                    opticoExistente.get().setFechaNacimiento(fechaNacimiento);
                    break;
                case "telefono":
                    opticoExistente.get().setTelefono((Integer) valorCampo);
                    break;
                case "domicilio":
                    opticoExistente.get().setDomicilio((String) valorCampo);
                    break;
                case "colegiado":
                    System.out.println(valorCampo.getClass());
                    opticoExistente.get().setColegiado((Integer) valorCampo);
                    break;
            }
        });

        Optico opticoActualizado = opticoService.updateOptico(opticoExistente.get());
        return new ResponseEntity<>(opticoActualizado, HttpStatus.OK);
    }

    // Eliminar un óptico
    @DeleteMapping("/opticos/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable("id") Long id) {
        Optional<Optico> opticoExistente = opticoService.findOpticoById(id);

        if (opticoExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        opticoService.deleteOptico(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
