package com.example.demo.auth;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.cliente.Cliente;
import com.example.demo.cliente.ClienteRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final ClienteRepository clienteRepository;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        // Verificar si el email ya está registrado en la base de datos
        Optional<Cliente> existingCliente = clienteRepository.findByEmail(request.getEmail());

        // Si el email ya existe, devolver un error HTTP 409 Conflict
        if (existingCliente.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponse("El email " + request.getEmail() + " ya está registrado."));
        }

        // Si no existe, proceder con el registro y devolver la respuesta con el token
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "registerOptico")
    public ResponseEntity<AuthResponse> registerOptico(@RequestBody RegisterOpticoRequest request) {
        return ResponseEntity.ok(authService.registerOptico(request));
    }
}
