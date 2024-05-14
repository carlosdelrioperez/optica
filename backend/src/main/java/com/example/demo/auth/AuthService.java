package com.example.demo.auth;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.cliente.Cliente;
import com.example.demo.cliente.ClienteRepository;
import com.example.demo.cliente.Role;
import com.example.demo.jwt.JwtService;
import com.example.demo.optico.Optico;
import com.example.demo.optico.OpticoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final ClienteRepository clienteRepository;
        private final JwtService jwtService;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;
        private final OpticoRepository opticoRepository;

        public AuthResponse login(LoginRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

                UserDetails userDetails = null;
                UserDetails cliente = clienteRepository.findByEmail(request.getEmail()).orElse(null);
                if (cliente != null) {
                        userDetails = cliente;
                } else {
                        UserDetails optico = opticoRepository.findByEmail(request.getEmail()).orElse(null);
                        if (optico != null) {
                                userDetails = optico;
                        } else {
                                throw new UsernameNotFoundException("Usuario no encontrado");
                        }
                }

                String token = jwtService.getToken(userDetails);

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
                                .foto(request.getFoto())
                                .build();

                Optional<Cliente> existingCliente = clienteRepository.findByEmail(request.getEmail());
                if (existingCliente.isPresent()) {
                        return AuthResponse.builder().build();
                }
                clienteRepository.save(cliente);

                return AuthResponse.builder()
                                .token(jwtService.getToken(cliente))
                                .build();

        }

        public AuthResponse registerOptico(RegisterOpticoRequest request) {
                Optico optico = Optico.builder()
                                .nombre(request.getNombre())
                                .apellidos(request.getApellidos())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .fechaNacimiento(request.getFechaNacimiento())
                                .telefono(request.getTelefono())
                                .domicilio(request.getDomicilio())
                                .role(Role.ADMIN)
                                .foto(request.getFoto())
                                .colegiado(request.getColegiado())
                                .build();

                Optional<Optico> existingOptico = opticoRepository.findByEmail(request.getEmail());
                Optional<Cliente> existingCliente = clienteRepository.findByEmail(request.getEmail());
                if (existingOptico.isPresent() || existingCliente.isPresent()) {
                        return AuthResponse.builder().build();
                }
                opticoRepository.save(optico);

                return AuthResponse.builder()
                                .token(jwtService.getToken(optico))
                                .build();

        }

}