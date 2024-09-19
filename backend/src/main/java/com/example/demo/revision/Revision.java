package com.example.demo.revision;

import java.time.LocalDate;

import com.example.demo.cliente.Cliente;
import com.example.demo.optico.Optico;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "revisiones")
public class Revision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;

    private Integer gafaIzq;

    private Integer gafaDer;

    private Integer maqIzq;

    private Integer maqDer;

    private Integer lejIzq;

    private Integer lejDer;

    private Integer cerIzq;

    private Integer cerDer;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Optico optico;

}
