// Login.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }

            const responseData = await response.json();
            const token = responseData.token;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error('Error:', error.message);
        }
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
        </Container>
    );
};

export default Login;

