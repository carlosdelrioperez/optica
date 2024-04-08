package com.example.demo.producto;

import java.text.Normalizer;
import java.util.List;
import java.util.stream.Collectors;

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

    // Encontrar productos por nombre, marca y/o género
    public List<Producto> findByNombreMarcaGenero(String searchTerm) {
        String searchTermNormalized = normalize(searchTerm.toLowerCase());
        return productoRepository.findAll().stream()
                .filter(producto -> normalize(producto.getNombre().toLowerCase()).contains(searchTermNormalized) ||
                        normalize(producto.getMarca().toLowerCase()).contains(searchTermNormalized) ||
                        normalize(producto.getGenero().name().toLowerCase()).contains(searchTermNormalized) ||
                        normalize(producto.getColor().toLowerCase()).contains(searchTermNormalized))
                .collect(Collectors.toList());
    }

    private String normalize(String input) {
        return Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
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
