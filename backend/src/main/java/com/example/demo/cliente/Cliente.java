package com.example.demo.cliente;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellidos;
    private String email;
    private String password;
    private LocalDate fechaNacimiento;
    private Integer telefono;
    private String domicilio;

    public Cliente() {

    }

    public Cliente(Long id,
            String nombre,
            String apellidos,
            String email,
            String password,
            LocalDate fechaNacimiento,
            Integer telefono,
            String domicilio) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.domicilio = domicilio;
    }

    public Cliente(String nombre,
            String apellidos,
            String email,
            String password,
            LocalDate fechaNacimiento,
            Integer telefono,
            String domicilio) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.domicilio = domicilio;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return this.apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getFechaNacimiento() {
        return this.fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Integer getTelefono() {
        return this.telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getDomicilio() {
        return this.domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", nombre ='" + nombre + '\'' +
                ", apellidos ='" + apellidos + '\'' +
                ", email ='" + email + '\'' +
                ", password ='" + password + '\'' +
                ", fechaNacimiento ='" + fechaNacimiento +
                ", telefono ='" + telefono +
                ", domicilio ='" + domicilio + '\'' +
                '}';
    }

}
