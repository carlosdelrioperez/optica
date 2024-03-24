package com.example.demo.optico;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpticoRepository extends CrudRepository<Optico, Integer> {
    Optico findByEmail(String email);

    Optico findByColegiado(Integer colegiado);
}
