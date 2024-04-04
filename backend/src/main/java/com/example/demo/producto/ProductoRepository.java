package com.example.demo.producto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    List<Producto> findById(Long id);

    List<Producto> findByNombre(String nombre);

    List<Producto> findByMarca(String marca);

    List<Producto> findByGenero(Genero genero);

}
