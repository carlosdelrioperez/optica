package com.example.demo.cita;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.hora.Hora;
import com.example.demo.optico.Optico;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Integer> {
    List<Cita> findByClienteId(Integer id);

    @Query("SELECT c.hora FROM Cita c WHERE c.dia = :dia " +
            "GROUP BY c.hora " +
            "HAVING COUNT(DISTINCT c.optico) = :numOpticos")
    List<Hora> findHoraByDia(@Param("dia") LocalDate dia, @Param("numOpticos") Integer numOpticos);

    @Query("SELECT c.optico FROM Cita c WHERE c.dia =:dia and c.hora = :hora")
    Optional<Optico> findOpticoByDiaAndHora(@Param("dia") LocalDate dia, @Param("hora") Hora hora);

}
