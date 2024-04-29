package com.example.demo.producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductoRequest {

    private String nombre;
    private Integer precio;
    private String foto;
    private String marca;
    private Genero genero;
    private String descripcion;

}
