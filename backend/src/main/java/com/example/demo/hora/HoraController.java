package com.example.demo.hora;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
public class HoraController {

    private final HoraService horaService;

    public HoraController(HoraService horaService) {
        this.horaService = horaService;
    }

    @GetMapping("/horas")
    public List<Hora> getAll() {
        return horaService.findAll();
    }

    @PostMapping("/horas")
    public Hora createHora(@RequestBody HoraRequest horaRequest) {
        String horaString = horaRequest.getHora();
        LocalTime hora = LocalTime.parse(horaString);
        return horaService.create(hora);
    }

    @GetMapping("/horas/libres")
    public List<String> getHorasLibresByDia(@RequestParam LocalDate dia) {
        return horaService.findHorasLibres(dia);
    }

    @GetMapping("/horas/horaId")
    public Long getIdByHora(@RequestParam HoraRequest horaRequest) {
        String horaString = horaRequest.getHora();
        LocalTime hora = LocalTime.parse(horaString);
        return horaService.findIdByHora(hora);
    }

}
