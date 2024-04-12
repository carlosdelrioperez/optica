import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsLoggedIn }) => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [foto, setFoto] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            nombre,
            apellidos,
            fechaNacimiento,
            telefono,
            domicilio,
            email,
            password,
            foto
        };

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }

            const responseData = await response.json();
            const token = responseData.token;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            // Redirige al usuario a la página de inicio después de un registro exitoso
            navigate('/');
        } catch (error) {
            console.error('Error:', error.message);
        }
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

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu email"
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

                <Form.Group controlId="formBasicAvatar">
                    <Form.Label>Foto de Perfil</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => setFoto(e.target.files[0])} // Actualiza el estado con el archivo seleccionado
                        accept="image/*" // Acepta solo archivos de imagen
                    />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ marginTop: "1%" }}>
                    Registrarse
                </Button>
            </Form>
            <br></br>
        </Container>
    );
};

export default Register;
