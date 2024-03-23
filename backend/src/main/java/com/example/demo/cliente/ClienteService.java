package com.example.demo.cliente;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    private ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Encontrar todos los clientes
    public List<Cliente> findAllClientes() {
        return (List<Cliente>) clienteRepository.findAll();
    }

    // Guardar un cliente
    public Cliente create(Cliente cliente) {
        // Aquí puedes realizar validaciones u operaciones adicionales antes de guardar
        // el cliente
        return clienteRepository.save(cliente);
    }

    // Obtener un cliente por el id
    public Cliente findClienteById(Integer id) {
        return clienteRepository.findById(id).orElse(null);
    }

    public Cliente updateCliente(Cliente cliente) {
        // Aquí podrías realizar alguna validación o lógica de negocio antes de
        // actualizar el cliente
        return clienteRepository.save(cliente);
    }

    public void deleteCliente(Integer id) {
        clienteRepository.deleteById(id);
    }
}
