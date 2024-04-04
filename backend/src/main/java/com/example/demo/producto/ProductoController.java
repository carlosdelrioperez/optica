package com.example.demo.producto;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // Crear producto
    @PostMapping("/producto")
    public Producto createProducto(@RequestBody ProductoRequest request) {
        return productoService.create(request.getNombre(), request.getPrecio(), request.getFoto(),
                request.getMarca(), request.getColor(), request.getGenero(), request.getDescripcion());
    }

    // Encontrar todos los clientes
    @GetMapping("/productos")
    public List<Producto> getProductos() {
        return productoService.findAllProductos();
    }

    // Encontrar por nombre
    @GetMapping("/productos/findByNombre")
    public List<Producto> getProductosByNombre(@RequestParam String nombre) {
        return productoService.findByNombre(nombre);
    }

    // Encontrar por nombre
    @GetMapping("/productos/findByMarca")
    public List<Producto> getProductosByMarca(@RequestParam String marca) {
        return productoService.findByMarca(marca);
    }

    @GetMapping("/productos/findByGenero")
    public List<Producto> getProductosByGenero(@RequestParam Genero genero) {
        return productoService.findByGenero(genero);
    }

}
