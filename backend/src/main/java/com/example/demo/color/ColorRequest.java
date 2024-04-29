package com.example.demo.color;

import com.example.demo.producto.Producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ColorRequest {
    private String color;
    private Producto producto;
}
