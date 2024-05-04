package com.example.demo.color;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ColorController {

    private final ColorService colorService;

    public ColorController(ColorService colorService) {
        this.colorService = colorService;
    }

    // Crear producto
    @PostMapping("/color")
    public Color createProducto(@RequestBody ColorRequest request) {
        return colorService.create(request.getColor(), request.getProducto());
    }

}
