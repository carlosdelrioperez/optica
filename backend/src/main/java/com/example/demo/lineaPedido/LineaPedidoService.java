package com.example.demo.lineaPedido;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.pedido.Pedido;
import com.example.demo.producto.Producto;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LineaPedidoService {

    private final LineaPedidoRepository lineaPedidoRepository;

    public LineaPedidoService(LineaPedidoRepository lineaPedidoRepository) {
        this.lineaPedidoRepository = lineaPedidoRepository;
    }

    public LineaPedido create(Pedido pedido, Producto producto, Integer cantidad) {
        LineaPedido lp = LineaPedido.builder()
                .pedido(pedido)
                .producto(producto)
                .cantidad(cantidad)
                .build();
        LineaPedido nuevaLp = lineaPedidoRepository.save(lp);
        return nuevaLp;
    }

    public LineaPedido findLineaPedidoById(Integer id) {
        return lineaPedidoRepository.findLineaPedidoById(id);
    }

    public LineaPedido update(Integer id, Pedido pedido, Producto producto, Integer cantidad) {
        LineaPedido lineaPedido = lineaPedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Linea de pedido no encontrada con ID: " + id));
        lineaPedido.setPedido(pedido);
        lineaPedido.setProducto(producto);
        lineaPedido.setCantidad(cantidad);
        return lineaPedidoRepository.save(lineaPedido);
    }

    public List<LineaPedido> findAllByPedidoId(Integer id) {
        return lineaPedidoRepository.findAllByPedidoId(id);
    }

    public void deleteById(Integer id) {
        lineaPedidoRepository.deleteById(id);
    }

}
