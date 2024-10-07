package com.example.demo.producto;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.color.ColorService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
public class ProductoController {

    private final ProductoService productoService;
    private final ColorService colorService;

    public ProductoController(ProductoService productoService, ColorService colorService) {
        this.productoService = productoService;
        this.colorService = colorService;
    }

    // Crear producto
    @PostMapping("/producto")
    public Producto createProducto(@RequestBody ProductoRequest request) {
        return productoService.create(request.getNombre(), request.getPrecio(), request.getFoto(),
                request.getMarca(), request.getGenero(), request.getDescripcion());
    }

    // Modificar stock
    @PutMapping("/productos/{id}")
    public Producto updateProducto(@RequestBody ProductoRequest request, @PathVariable Long id) {
        return productoService.update(id, request.getStock());
    }

    // Encontrar todos los productos
    @GetMapping("/productos")
    public List<Producto> getProductos() {
        return productoService.findAllProductos();
    }

    // Encontrar todos los productos
    @GetMapping("/productos/{id}")
    public Optional<Producto> getProductoById(@PathVariable Long id) {
        return productoService.findById(id);
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
        return colorService.findColores();
    }

    // Encontrar productos por color
    @GetMapping("/productos/findByColorAndGenero")
    public List<Producto> getProductosByColor(@RequestParam String color, @RequestParam Genero genero) {
        return productoService.findByColor(color, genero);
    }

    // Encontrar colores de un producto
    @GetMapping("/productos/{id}/colores")
    public List<String> findColoresByProducto(@PathVariable Integer id) {
        return colorService.findColoresByProducto(id);
    }

}
