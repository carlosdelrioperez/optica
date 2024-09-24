import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const CambiarPefil = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.sub;

            fetch(`http://localhost:8080/api/clientes/findByEmail?email=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setUserInfo(data);
                    setNombre(data.nombre);
                    setApellidos(data.apellidos);
                    setFechaNacimiento(data.fechaNacimiento);
                    setTelefono(data.telefono);
                    setDomicilio(data.domicilio);
                    setEmail(data.email);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            const response = await fetch(`http://localhost:8080/api/clientes?id=${userInfo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }

            // Redirige al usuario a la página de inicio después de un registro exitoso
            navigate('/perfil');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Columna izquierda*/}
            <div style={{
                borderRight: '1px solid black',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                width: '400px',
            }}>
                <br />
                <img src={userInfo && userInfo.foto ? userInfo.foto : "/images/fotoPerfil.webp"} alt="Avatar" style={{ width: '300px', height: '300px', borderRadius: '50%', marginBottom: '10px' }} />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <h3>{userInfo ? userInfo.nombre : "Nombre de Usuario"} {userInfo ? userInfo.apellidos : "Apellidos"}</h3>
                </div>
                <div style={{ marginTop: '100px' }}>
                    <Link to="/perfil" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ textAlign: 'center' }}>Mis revisiones</h5>
                    </Link>
                    <Link to="/misPedidos" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ textAlign: 'center' }}>Mis pedidos</h5>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IoIosArrowForward style={{ marginRight: '5px' }} />
                        <h5>Cambiar datos de perfil</h5>
                    </div>
                </div>
            </div>
            {/* Columna derecha*/}
            <div style={{
                flex: '1',
                padding: '10px',
                overflowY: 'auto'
            }}>
                <Container>
                    <h1 className="mt-5 mb-4">Cambio de datos</h1>
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

                        <Button variant="primary" type="submit" style={{ marginTop: "1%" }}>
                            Actualizar
                        </Button>
                    </Form>
                    <br></br>
                </Container>
            </div>
        </div>
    );
};
