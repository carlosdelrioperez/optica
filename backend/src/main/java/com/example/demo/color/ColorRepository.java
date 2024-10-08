package com.example.demo.color;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepository extends JpaRepository<Color, Integer> {

    List<Color> findByColor(String color);

    @Query("SELECT c.producto.id FROM Color c WHERE c.color = :color")
    List<Long> findProductoIdsByColor(@Param("color") String color);

    List<Color> findByProductoId(Integer productoId);

    @Query("SELECT c.id FROM Color c WHERE c.color = :nombre AND c.producto.id = :productoId")
    Integer findIdByNombreAndProducto(@Param("nombre") String nombre, @Param("productoId") Integer productoId);

}
