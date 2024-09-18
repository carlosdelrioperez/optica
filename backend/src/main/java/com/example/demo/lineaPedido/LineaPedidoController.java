package com.example.demo.lineaPedido;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api")
public class LineaPedidoController {

    private final LineaPedidoService lineaPedidoService;

    public LineaPedidoController(LineaPedidoService lineaPedidoService) {
        this.lineaPedidoService = lineaPedidoService;
    }

    // Crear una línea de pedido
    @PostMapping("/lineasPedido")
    public LineaPedido createLineaPedido(@RequestBody LineaPedidoRequest request) {
        return lineaPedidoService.create(request.getPedido(), request.getProducto(), request.getColor(),
                request.getCantidad());
    }

    // Encontrar las líneas de pedido asociadas a un pedido
    @GetMapping("/lineasPedido/{id}")
    public List<LineaPedido> getAllByPedidoId(@PathVariable Integer id) {
        return lineaPedidoService.findAllByPedidoId(id);
    }

    // Actualizar una línea de producto
    @PutMapping("/lineasPedido/{id}")
    public LineaPedido updateLineaPedido(@PathVariable Integer id, @RequestBody LineaPedidoRequest request) {
        return lineaPedidoService.update(id, request.getPedido(), request.getProducto(), request.getColor(),
                request.getCantidad());
    }

    // Eliminar una línea de producto
    @DeleteMapping("/lineasPedido/{id}")
    public void deleteLineaPedido(@PathVariable Integer id) {
        lineaPedidoService.deleteById(id);
    }

}