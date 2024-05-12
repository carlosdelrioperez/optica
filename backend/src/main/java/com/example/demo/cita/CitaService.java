package com.example.demo.cita;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.cliente.Cliente;
import com.example.demo.hora.Hora;
import com.example.demo.optico.Optico;
import com.example.demo.optico.OpticoRepository;

@Service
public class CitaService {

    private final CitaRepository citaRepository;
    private final OpticoRepository opticoRepository;

    public CitaService(CitaRepository citaRepository, OpticoRepository opticoRepository) {
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

    public Cita findProximCitaByClienteId(Integer id) {
        List<Cita> citasCliente = citaRepository.findByClienteId(id);
        Cita proximaCita = null;
        LocalDate hoy = LocalDate.now();
        for (Cita cita : citasCliente) {
            LocalDate fechaCita = cita.getDia();
            if (fechaCita != null && fechaCita.isEqual(hoy) || fechaCita.isAfter(hoy)) {
                if (proximaCita == null || fechaCita.isBefore(proximaCita.getDia())) {
                    proximaCita = cita;
                }
            }
        }
        return proximaCita;
    }

    public List<Optico> findOpticosLibres(LocalDate dia, Hora hora) {
        List<Optico> opticosTotal = opticoRepository.findAll();
        Optional<Optico> opticoOcupado = citaRepository.findOpticoByDiaAndHora(dia, hora);
        opticoOcupado.ifPresent(optico -> opticosTotal.removeIf(o -> o.getId() == optico.getId()));
        return opticosTotal;
    }

    public void deleteCitaById(Integer id) {
        citaRepository.deleteById(id);
    }

}
