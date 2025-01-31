package com.example.demo.configuration;

import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

import com.example.demo.cliente.Cliente;
import com.example.demo.cliente.ClienteRepository;
import com.example.demo.optico.Optico;
import com.example.demo.optico.OpticoRepository;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final ClienteRepository clienteRepository;
    private final OpticoRepository opticoRepository;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailService() {
        return email -> {
            Optional<Cliente> cliente = clienteRepository.findByEmail(email);
            if (cliente.isPresent()) {
                return cliente.get();
            }
            Optional<Optico> optico = opticoRepository.findByEmail(email);
            if (optico.isPresent()) {
                return optico.get();
            }
            throw new UsernameNotFoundException("Email not found");
        };
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // Permitir solicitudes desde localhost:3000
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Permitir los métodos HTTP
                        .allowCredentials(true); // Permitir credenciales (si es necesario)
            }
        };
    }
}
