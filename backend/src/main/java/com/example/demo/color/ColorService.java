package com.example.demo.color;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.producto.Producto;

@Service
public class ColorService {

    private final ColorRepository colorRepository;

    public ColorService(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    public Color create(String color, Producto producto) {
        Color c = Color.builder()
                .color(color)
                .producto(producto)
                .build();
        return colorRepository.save(c);
    }

    public Set<String> findColores() {
        List<Color> colores = colorRepository.findAll();
        return colores.stream()
                .map(Color::getColor)
                .collect(Collectors.toSet());
    }

}
