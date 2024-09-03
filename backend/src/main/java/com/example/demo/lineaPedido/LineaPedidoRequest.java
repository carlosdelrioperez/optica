package com.example.demo.lineaPedido;

import com.example.demo.color.Color;
import com.example.demo.pedido.Pedido;
import com.example.demo.producto.Producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LineaPedidoRequest {

    private Pedido pedido;
    private Producto producto;
    private Color color;
    private Integer cantidad;
}
