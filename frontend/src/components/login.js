import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Login = () => {
    // Estados para el correo y contraseña
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor
        console.log('Correo:', email);
        console.log('Contraseña:', password);
    };

    return (
        <Container>
            <h1 className="mt-5 mb-4">Iniciar sesión</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    Iniciar sesión
                </Button>
            </Form>
            <p className="mt-3">
                ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
        </Container >
    );
};

export default Login;
