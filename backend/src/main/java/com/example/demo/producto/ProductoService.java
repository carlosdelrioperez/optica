package com.example.demo.producto;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.color.ColorRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final ColorRepository colorRepository;

    public ProductoService(ProductoRepository productoRepository, ColorRepository colorRepository) {
        this.productoRepository = productoRepository;
        this.colorRepository = colorRepository;
    }

    // Crear producto
    public Producto create(String nombre, Integer precio, String foto, String marca, Genero genero,
            String descripcion) {
        Producto producto = Producto.builder()
                .nombre(nombre)
                .precio(precio)
                .foto(foto)
                .marca(marca)
                .genero(genero)
                .descripcion(descripcion)
                .build();
        return productoRepository.save(producto);
    }

    public Producto update(Long id, Integer stock) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrada con ID: " + id));
        producto.setStock(stock - 1);
        return productoRepository.save(producto);
    }

    // Encontrar todos los productos
    public List<Producto> findAllProductos() {
        return productoRepository.findAll();
    }

    // Encontrar producto por id
    public Optional<Producto> findById(Long id) {
        return productoRepository.findById(id);
    }

    // Encontrar productos por nombre, marca y/o género
    public List<Producto> findByNombreMarcaGenero(String searchTerm) {
        String searchTermNormalized = normalize(searchTerm.toLowerCase());
        return productoRepository.findAll().stream()
                .filter(producto -> normalize(producto.getNombre().toLowerCase()).contains(searchTermNormalized) ||
                        normalize(producto.getMarca().toLowerCase()).contains(searchTermNormalized) ||
                        normalize(producto.getGenero().name().toLowerCase()).contains(searchTermNormalized))
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

    // Encontrar productos por colores
    public List<Producto> findByColor(String color, Genero genero) {
        List<Long> productoIds = colorRepository.findProductoIdsByColor(color);
        List<Producto> productos = productoRepository.findByGenero(genero);
        List<Producto> productosEncontrados = new ArrayList<>();
        for (Producto producto : productos) {
            if (productoIds.contains(producto.getId())) {
                productosEncontrados.add(producto);
            }
        }
        return productosEncontrados;
    }

}
