package com.example.demo.lineaPedido;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LineaPedidoRepository extends JpaRepository<LineaPedido, Integer> {

    @Query("SELECT lp FROM LineaPedido lp WHERE lp.pedido.id = :id")
    List<LineaPedido> findAllByPedidoId(@Param("id") Integer id);

    @Query("SELECT lp FROM LineaPedido lp WHERE lp.id = :id")
    LineaPedido findLineaPedidoById(@Param("id") Integer id);

}
