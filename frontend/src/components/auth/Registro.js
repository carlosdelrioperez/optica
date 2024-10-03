import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap'; // Importar Alert para mostrar mensajes de error
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsLoggedIn }) => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar el mensaje de error
    const navigate = useNavigate();
    const [telefonoTouched, setTelefonoTouched] = useState(false);

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{9}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Limpiar cualquier mensaje de error anterior
        setErrorMessage('');

        if (!validatePhoneNumber(telefono)) {
            setErrorMessage('El número de teléfono no tiene el formato correcto (666666666).');
            return;
        }

        const data = {
            nombre,
            apellidos,
            fechaNacimiento,
            telefono,
            domicilio,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 409) {
                // Si el estado es 409, el email ya está registrado
                setErrorMessage(`El email ${email} ya está registrado. Por favor, intenta con otro.`);
                return;
            }

            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }

            const responseData = await response.json();
            const token = responseData.token;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            // navigate('/');
            // window.location.reload();
        } catch (error) {
            setErrorMessage('Ocurrió un error al procesar el registro. Inténtalo de nuevo más tarde.');
            console.error('Error:', error.message);
        }
    };

    const handleTelefonoBlur = () => {
        setTelefonoTouched(true);
    };

    return (
        <Container>
            <h1 className="mt-5 mb-4">Registro</h1>

            {/* Mostrar mensaje de error si existe */}
            {errorMessage && (
                <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                    {errorMessage}
                </Alert>
            )}

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
                        onBlur={handleTelefonoBlur}
                        required
                    />
                    {telefonoTouched && !validatePhoneNumber(telefono) && (
                        <Form.Text className="text-danger">
                            El número de teléfono no tiene un formato correcto
                        </Form.Text>
                    )}
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

                <Button variant="primary" type="submit" style={{ marginTop: '1%' }}>
                    Registrarse
                </Button>
            </Form>
            <br></br>
        </Container>
    );
};

export default Register;
