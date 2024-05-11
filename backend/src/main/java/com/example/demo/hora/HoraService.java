package com.example.demo.hora;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.cita.CitaRepository;
import com.example.demo.optico.OpticoRepository;

@Service
public class HoraService {

        private final HoraRepository horaRepository;
        private final CitaRepository citaRepository;
        private final OpticoRepository opticoRepository;

        public HoraService(HoraRepository horaRepository, CitaRepository citaRepository,
                        OpticoRepository opticoRepository) {
                this.horaRepository = horaRepository;
                this.citaRepository = citaRepository;
                this.opticoRepository = opticoRepository;
        }

        public Hora create(LocalTime hora) {
                Hora h = Hora.builder()
                                .hora(hora)
                                .build();
                return horaRepository.save(h);
        }

        public List<Hora> findAll() {
                return horaRepository.findAll();
        }

        public List<String> findHorasLibres(LocalDate dia) {
                List<LocalTime> posiblesHoras = horaRepository.findAll().stream()
                                .map(Hora::getHora)
                                .collect(Collectors.toList());
                Integer numOpticos = opticoRepository.findAll().size();
                List<LocalTime> horasCogidas = citaRepository.findHoraByDia(dia, numOpticos).stream()
                                .map(Hora::getHora)
                                .collect(Collectors.toList());
                List<LocalTime> horasLibres = posiblesHoras.stream()
                                .filter(hora -> !horasCogidas.contains(hora))
                                .collect(Collectors.toList());
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
                return horasLibres.stream()
                                .map(formatter::format)
                                .collect(Collectors.toList());
        }

        public Long findIdByHora(LocalTime hora) {
                return horaRepository.findIdByHora(hora);
        }

}
