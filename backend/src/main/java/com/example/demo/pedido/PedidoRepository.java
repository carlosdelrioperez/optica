package com.example.demo.pedido;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    @Query("SELECT p FROM Pedido p WHERE p.cliente.id = :id")
    List<Pedido> findPedidosByClienteId(@Param("id") Integer id);

    @Query("SELECT p FROM Pedido p WHERE p.id = :id")
    Pedido findPedidoById(@Param("id") Integer id);

}
