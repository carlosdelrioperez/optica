package com.example.demo.optico;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpticoRepository extends CrudRepository<Optico, Integer> {
    Optional<Optico> findByEmail(String email);

    Optional<Optico> findByColegiado(Integer colegiado);
}
