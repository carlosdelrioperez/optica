package com.example.demo.auth;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    String nombre;
    String apellidos;
    String email;
    String password;
    LocalDate fechaNacimiento;
    Integer telefono;
    String domicilio;

}
