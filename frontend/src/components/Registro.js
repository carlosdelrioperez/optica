import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Register = () => {
    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [password, setPassword] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos de registro al servidor
        console.log('Nombre:', nombre);
        console.log('Apellidos:', apellidos);
        console.log('Fecha de Nacimiento:', fechaNacimiento);
        console.log('Teléfono:', telefono);
        console.log('Domicilio:', domicilio);
        console.log('Contraseña:', password);
    };

    return (
        <Container>
            <h1 className="mt-5 mb-4">Registro</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicApellidos">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tus apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicFechaNacimiento">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control
                        type="date"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTelefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Ingresa tu teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDomicilio">
                    <Form.Label>Domicilio</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu domicilio"
                        value={domicilio}
                        onChange={(e) => setDomicilio(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ marginTop: "1%" }}>
                    Registrarse
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
