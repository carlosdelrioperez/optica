package com.example.demo.revision;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RevisionRepository extends JpaRepository<Revision, Integer> {

    @Query("SELECT r FROM Revision r WHERE r.cliente.id=:id")
    List<Revision> findRevisionesByClienteId(@Param("id") Integer id);

}
