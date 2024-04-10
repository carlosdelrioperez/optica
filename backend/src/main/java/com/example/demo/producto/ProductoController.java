package com.example.demo.producto;

import java.util.List;
import java.util.Set;

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
    @GetMapping("/productos/search")
    public List<Producto> getProductosByNombre(@RequestParam String search) {
        return productoService.findByNombreMarcaGenero(search);
    }

    // Encontrar por nombre
    @GetMapping("/productos/findByMarca")
    public List<Producto> getProductosByMarca(@RequestParam String marca) {
        return productoService.findByMarca(marca);
    }

    // Encontrar productos por género
    @GetMapping("/productos/findByGenero")
    public List<Producto> getProductosByGenero(@RequestParam Genero genero) {
        return productoService.findByGenero(genero);
    }

    // Encontrar todos los colores disponibles
    @GetMapping("/productos/findColores")
    public Set<String> getColores() {
        return productoService.findColores();
    }

    // Encontrar productos por color
    @GetMapping("/productos/findByColor")
    public List<Producto> getProductosByColor(@RequestParam String color) {
        return productoService.findByColor(color);
    }

}
