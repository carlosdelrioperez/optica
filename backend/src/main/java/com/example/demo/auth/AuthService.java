package com.example.demo.auth;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.cliente.Cliente;
import com.example.demo.cliente.ClienteRepository;
import com.example.demo.cliente.Role;
import com.example.demo.jwt.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final ClienteRepository clienteRepository;
        private final JwtService jwtService;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;

        public AuthResponse login(LoginRequest request) {
                authenticationManager
                                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),
                                                request.getPassword()));
                UserDetails cliente = clienteRepository.findByEmail(request.getEmail()).orElseThrow();
                String token = jwtService.getToken(cliente);
                return AuthResponse.builder()
                                .token(token)
                                .build();

        }

        public AuthResponse register(RegisterRequest request) {
                Cliente cliente = Cliente.builder()
                                .nombre(request.getNombre())
                                .apellidos(request.getApellidos())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .fechaNacimiento(request.getFechaNacimiento())
                                .telefono(request.getTelefono())
                                .domicilio(request.getDomicilio())
                                .role(Role.USER)
                                .build();

                Optional<Cliente> existingCliente = clienteRepository.findByEmail(request.getEmail());
                if (existingCliente.isPresent()) {
                        return AuthResponse.builder().build(); // MOSTRAR ERROR
                }
                clienteRepository.save(cliente);

                return AuthResponse.builder()
                                .token(jwtService.getToken(cliente))
                                .build();

        }

}