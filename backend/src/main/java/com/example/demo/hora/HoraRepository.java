package com.example.demo.hora;

import java.time.LocalTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HoraRepository extends JpaRepository<Hora, Integer> {

    @Query("SELECT h FROM Hora h WHERE h.hora = :hora")
    Hora findByHora(@Param("hora") LocalTime hora);

    @Query("SELECT h.id FROM Hora h WHERE h.hora = :hora")
    Long findIdByHora(@Param("hora") LocalTime hora);

    Optional<Hora> findById(Long id);
}
