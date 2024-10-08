package com.example.demo.cita;

import com.example.demo.cliente.Cliente;
import com.example.demo.hora.Hora;
import com.example.demo.optico.Optico;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CitaRequest {

    private String dia;
    private Hora hora;
    private Cliente cliente;
    private Optico optico;
}
