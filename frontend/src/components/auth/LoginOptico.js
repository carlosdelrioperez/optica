import React, { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginOptico = ({ setIsLoggedIn }) => {

    const [email, setEmailOptico] = useState('');
    const [password, setPasswordOptico] = useState('');
    const navigate = useNavigate();

    const handleSubmitOptico = async (event) => {
        event.preventDefault();
        const data = {
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:8080/auth/loginOptico', {
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
        <Col>
            <h1 className="mt-5 mb-4">Iniciar sesión como óptico</h1>
            <Form onSubmit={handleSubmitOptico}>
                <Form.Group controlId="formBasicEmailOptico">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmailOptico(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPasswordOptico">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPasswordOptico(e.target.value)}
                        required
                    />
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit">
                    Iniciar sesión
                </Button>
            </Form>
        </Col>

    );
};

export default LoginOptico;
