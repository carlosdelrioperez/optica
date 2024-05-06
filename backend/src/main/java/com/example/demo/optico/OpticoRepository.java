package com.example.demo.optico;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpticoRepository extends JpaRepository<Optico, Integer> {
    Optional<Optico> findByEmail(String email);

}
