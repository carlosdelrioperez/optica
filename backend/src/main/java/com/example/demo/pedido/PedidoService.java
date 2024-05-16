package com.example.demo.pedido;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.cliente.Cliente;
import com.example.demo.lineaPedido.LineaPedido;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public Pedido create(Cliente cliente, List<LineaPedido> lineasPedido) {
        Pedido pedido = Pedido.builder()
                .cliente(cliente)
                .lineasPedido(lineasPedido)
                .build();

        return pedidoRepository.save(pedido);
    }

    public Pedido update(Integer id, Cliente cliente, List<LineaPedido> lineasPedidos) {
        Pedido pedidoExistente = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado con ID: " + id));
        pedidoExistente.setCliente(cliente);
        pedidoExistente.setLineasPedido(lineasPedidos);
        return pedidoRepository.save(pedidoExistente);
    }

    public Pedido findById(Integer id) {
        return pedidoRepository.findPedidoById(id);
    }

    public List<Pedido> findPedidosByClienteId(Integer id) {
        return pedidoRepository.findPedidosByClienteId(id);
    }

    public void deleteById(Integer id) {
        pedidoRepository.deleteById(id);
    }

    public double calcularPrecioTotal(Pedido pedido) {
        double precioTotal = 0.0;
        List<LineaPedido> lineasPedido = pedido.getLineasPedido();

        for (LineaPedido lineaPedido : lineasPedido) {
            precioTotal += lineaPedido.getProducto().getPrecio() * lineaPedido.getCantidad();
        }

        return precioTotal;
    }

}
