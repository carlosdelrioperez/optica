package com.example.demo.cita;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.mail.MailSender;
import org.springframework.stereotype.Service;

import com.example.demo.cliente.Cliente;
import com.example.demo.cliente.ClienteRepository;
import com.example.demo.hora.Hora;
import com.example.demo.hora.HoraRepository;
import com.example.demo.optico.Optico;
import com.example.demo.optico.OpticoRepository;

@Service
public class CitaService {

    private final CitaRepository citaRepository;
    private final OpticoRepository opticoRepository;

    public CitaService(CitaRepository citaRepository, OpticoRepository opticoRepository, MailSender mailSender,
            ClienteRepository clienteRepository, HoraRepository horaRepository) {
        this.citaRepository = citaRepository;
        this.opticoRepository = opticoRepository;
    }

    public Cita create(LocalDate dia, Hora hora, Cliente cliente, Optico optico) {
        Cita c = Cita.builder()
                .dia(dia)
                .hora(hora)
                .cliente(cliente)
                .optico(optico)
                .build();
        Cita nuevaCita = citaRepository.save(c);
        return nuevaCita;
    }

    public List<Cita> findAll() {
        return citaRepository.findAll();
    }

    public List<Cita> findByClienteId(Integer id) {
        return citaRepository.findByClienteId(id);
    }

    public List<Optico> findOpticosLibres(LocalDate dia, Hora hora) {
        List<Optico> opticosTotal = opticoRepository.findAll();
        Optional<Optico> opticoOcupado = citaRepository.findOpticoByDiaAndHora(dia, hora);
        opticoOcupado.ifPresent(optico -> opticosTotal.removeIf(o -> o.getId() == optico.getId()));
        return opticosTotal;
    }

}
