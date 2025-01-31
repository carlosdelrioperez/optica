package com.example.demo.cliente;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ClienteController {

    private final ClienteService clienteService;
    private final PasswordEncoder passwordEncoder;

    public ClienteController(ClienteService clienteService, PasswordEncoder passwordEncoder) {
        this.clienteService = clienteService;
        this.passwordEncoder = passwordEncoder;
    }

    // Encontrar todos los clientes
    @GetMapping("/clientes")
    public List<Cliente> getClientes() {
        return clienteService.findAllClientes();
    }

    // Encontrar cliente por email
    @GetMapping("/clientes/findByEmail")
    public Optional<Cliente> getClienteByEmail(@RequestParam String email) {
        return clienteService.findByEmail(email);
    }

    // Encontrar un cliente específico
    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> buscarClientePorId(@PathVariable Integer id) {
        Cliente cliente = clienteService.findClienteById(id);

        if (cliente != null) {
            return new ResponseEntity<>(cliente, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Actualizar un cliente
    @PutMapping("/clientes")
    public ResponseEntity<Cliente> actualizarCliente(@RequestParam("id") Integer id,
            @RequestBody Map<String, Object> camposActualizados) {
        Cliente clienteExistente = clienteService.findClienteById(id);

        if (clienteExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Iterar sobre las entradas del mapa y actualizar los campos correspondientes
        camposActualizados.forEach((nombreCampo, valorCampo) -> {
            switch (nombreCampo) {
                case "nombre":
                    clienteExistente.setNombre((String) valorCampo);
                    break;
                case "apellidos":
                    clienteExistente.setApellidos((String) valorCampo);
                    break;
                case "email":
                    clienteExistente.setEmail((String) valorCampo);
                    break;
                case "password":
                    clienteExistente.setPassword((String) passwordEncoder.encode((CharSequence) valorCampo));
                    break;
                case "fechaNacimiento":
                    String fechaNacimientoStr = (String) valorCampo;
                    LocalDate fechaNacimiento = LocalDate.parse(fechaNacimientoStr);
                    clienteExistente.setFechaNacimiento(fechaNacimiento);
                    break;
                case "telefono":
                    clienteExistente.setTelefono((Integer) valorCampo);
                    break;
                case "domicilio":
                    clienteExistente.setDomicilio((String) valorCampo);
                    break;
            }
        });

        Cliente clienteActualizado = clienteService.updateCliente(clienteExistente);
        return new ResponseEntity<>(clienteActualizado, HttpStatus.OK);
    }

    // Borrar un cliente
    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable("id") Integer id) {
        Cliente clienteExistente = clienteService.findClienteById(id);

        if (clienteExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        clienteService.deleteCliente(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
