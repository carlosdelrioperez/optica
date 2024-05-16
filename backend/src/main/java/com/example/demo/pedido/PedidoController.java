package com.example.demo.pedido;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    // Crear un pedido
    @PostMapping("/pedidos")
    public Pedido create(@RequestBody PedidoRequest request) {
        return pedidoService.create(request.getCliente(), request.getLineasPedido());
    }

    // Encontrar pedidos de un cliente
    @GetMapping("/pedidos/cliente/{id}")
    public List<Pedido> getPedidosByClienteId(@PathVariable Integer id) {
        return pedidoService.findPedidosByClienteId(id);
    }

    // Actualizar un pedido
    @PutMapping("/pedidos/{id}")
    public Pedido update(@PathVariable Integer id, @RequestBody PedidoRequest request) {
        return pedidoService.update(id, request.getCliente(), request.getLineasPedido());
    }

    // Eliminar un pedido
    @DeleteMapping("/pedidos/{id}")
    public void deletePedido(@PathVariable Integer id) {
        pedidoService.deleteById(id);
    }

    // Cálculo del precio del pedido
    @GetMapping("/pedidos/precio/{id}")
    public ResponseEntity<Double> calcularPrecioTotalPedido(@PathVariable Integer id) {
        Pedido pedido = pedidoService.findById(id);
        if (pedido == null) {
            return ResponseEntity.notFound().build();
        }

        double precioTotal = pedidoService.calcularPrecioTotal(pedido);
        return ResponseEntity.ok(precioTotal);
    }

}
