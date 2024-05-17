package com.example.demo.cita;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.cliente.ClienteRepository;
import com.example.demo.email.EmailService;
import com.example.demo.hora.Hora;
import com.example.demo.hora.HoraRepository;
import com.example.demo.optico.Optico;
import com.example.demo.optico.OpticoRepository;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api")
public class CitaController {

    private final CitaService citaService;
    private final HoraRepository horaRepository;
    private final EmailService emailService;
    private final ClienteRepository clienteRepository;
    private final OpticoRepository opticoRepository;

    public CitaController(CitaService citaService, HoraRepository horaRepository, EmailService emailService,
            ClienteRepository clienteRepository, OpticoRepository opticoRepository) {
        this.citaService = citaService;
        this.horaRepository = horaRepository;
        this.emailService = emailService;
        this.clienteRepository = clienteRepository;
        this.opticoRepository = opticoRepository;
    }

    // Encontrar todas las citas
    @GetMapping("/citas")
    public List<Cita> getAllCitas() {
        return citaService.findAll();
    }

    // Crear una cita
    @PostMapping("/citas")
    public ResponseEntity<?> createCita(@RequestBody CitaRequest request) {
        String fechaString = request.getDia();
        LocalDate dia = LocalDate.parse(fechaString);
        Cita cita = citaService.create(dia, request.getHora(), request.getCliente(), request.getOptico());
        String emailCliente = clienteRepository.findById(request.getCliente().getId()).get().getEmail();
        LocalTime hora = horaRepository.findById(request.getHora().getId()).get().getHora();
        String optico = opticoRepository.findById(request.getOptico().getId()).get().getNombre();
        String opticoApellidos = opticoRepository.findById(request.getOptico().getId()).get().getApellidos();
        String nombreCompletoOptico = optico + " " + opticoApellidos;
        try {
            emailService.sendCitaConfirmationEmail(emailCliente, dia.toString(), hora.toString(), nombreCompletoOptico);
            return new ResponseEntity<>(cita, HttpStatus.CREATED);
        } catch (MessagingException e) {
            return new ResponseEntity<>("Error al enviar el correo de confirmación", HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
