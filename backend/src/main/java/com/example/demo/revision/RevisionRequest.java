package com.example.demo.revision;

import java.time.LocalDate;

import com.example.demo.cliente.Cliente;
import com.example.demo.optico.Optico;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RevisionRequest {

    private LocalDate fecha;
    private Integer gafaIzq;
    private Integer gafaDer;
    private Integer maqIzq;
    private Integer maqDer;
    private Integer lejIzq;
    private Integer lejDer;
    private Integer cerIzq;
    private Integer cerDer;
    private Cliente cliente;
    private Optico optico;

}
