package com.example.demo.cita;

import java.time.LocalDate;

import com.example.demo.cliente.Cliente;
import com.example.demo.hora.Hora;
import com.example.demo.optico.Optico;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "citas", uniqueConstraints = @UniqueConstraint(columnNames = { "dia", "hora_id", "optico_id" }))
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dia;

    @ManyToOne
    private Hora hora;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Optico optico;

}
