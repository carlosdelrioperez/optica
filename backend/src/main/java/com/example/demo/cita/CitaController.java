package com.example.demo.cita;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.hora.Hora;
import com.example.demo.hora.HoraRepository;
import com.example.demo.optico.Optico;

@RestController
@RequestMapping("/api")
public class CitaController {

    private final CitaService citaService;
    private final HoraRepository horaRepository;

    public CitaController(CitaService citaService, HoraRepository horaRepository) {
        this.citaService = citaService;
        this.horaRepository = horaRepository;
    }

    // Encontrar todas las citas
    @GetMapping("/citas")
    public List<Cita> getAllCitas() {
        return citaService.findAll();
    }

    // Crear una cita
    @PostMapping("/citas")
    public Cita createCita(@RequestBody CitaRequest request) {
        String fechaString = request.getDia();
        LocalDate dia = LocalDate.parse(fechaString);
        return citaService.create(dia, request.getHora(), request.getCliente(), request.getOptico());
    }

    // Encontrar cita por cliente
    @GetMapping("/citas/cliente/{id}")
    public List<Cita> getCitaByCliente(@PathVariable Integer id) {
        return citaService.findByClienteId(id);
    }

    // Encontrar óptcios libres para una cita
    @GetMapping("/citas/opticoLibre")
    public List<Optico> getOpticosLibres(@RequestParam LocalDate dia, @RequestParam LocalTime horaRequest) {
        Hora hora = horaRepository.findByHora(horaRequest);
        return citaService.findOpticosLibres(dia, hora);
    }

    // Eliminar una cita
    @DeleteMapping("/citas/{id}")
    public void deleteById(@PathVariable Integer id) {
        citaService.deleteCitaById(id);
    }

    // Próxima cita de un cliente
    @GetMapping("/citas/cliente/{id}/proximaCita")
    public Cita getProximaCitaByClienteId(@PathVariable Integer id) {
        return citaService.findProximCitaByClienteId(id);
    }

}
