package com.example.demo.pedido;

import java.util.List;

import com.example.demo.cliente.Cliente;
import com.example.demo.lineaPedido.LineaPedido;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PedidoRequest {

    private List<LineaPedido> lineasPedido;
    private Cliente cliente;

}
