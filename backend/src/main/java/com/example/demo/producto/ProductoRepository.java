package com.example.demo.producto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    Optional<Producto> findById(Long id);

    List<Producto> findByNombre(String nombre);

    List<Producto> findByMarca(String marca);

    List<Producto> findByGenero(Genero genero);

    List<Producto> findByNombreContainingAndMarcaContainingAndGenero(String nombre, String marca, Genero genero);

    List<Producto> findByNombreContainingAndMarcaContaining(String nombre, String marca);

    List<Producto> findByNombreContainingAndGenero(String nombre, Genero genero);

    List<Producto> findByMarcaContainingAndGenero(String marca, Genero genero);

    List<Producto> findByNombreContaining(String nombre);

    List<Producto> findByMarcaContaining(String marca);

}
