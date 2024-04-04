package com.example.demo.producto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // Crear producto
    public Producto create(String nombre, Integer precio, String foto, String marca, String color, Genero genero,
            String descripcion) {
        Producto producto = Producto.builder()
                .nombre(nombre)
                .precio(precio)
                .foto(foto)
                .marca(marca)
                .color(color)
                .genero(genero)
                .descripcion(descripcion)
                .build();
        return productoRepository.save(producto);
    }

    // Encontrar todos los productos
    public List<Producto> findAllProductos() {
        return productoRepository.findAll();
    }

    // Encontrar producto por id
    public List<Producto> findById(Long id) {
        return productoRepository.findById(id);
    }

    // Encontrar producto por el nombre
    public List<Producto> findByNombre(String nombre) {
        return productoRepository.findByNombre(nombre);
    }

    // Encontrar producto por la marca
    public List<Producto> findByMarca(String marca) {
        return productoRepository.findByMarca(marca);
    }

    // Encontrar producto por el género
    public List<Producto> findByGenero(Genero genero) {
        return productoRepository.findByGenero(genero);
    }

}
