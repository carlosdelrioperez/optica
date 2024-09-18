import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Container, Form, Button } from 'react-bootstrap';


export const OpticoNuevo = ({ setIsLoggedIn }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [foto, setFoto] = useState(null);
    const [colegiado, setColegiado] = useState(null);
    const navigate = useNavigate();
    const [telefonoTouched, setTelefonoTouched] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Decodificar el token para obtener el correo electrónico del usuario
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.sub;

            // Hacer la llamada al endpoint con el correo electrónico y el token
            fetch(`http://localhost:8080/api/opticos/findByEmail?email=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUserInfo(data); // Establece los datos del usuario en el estado
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });

        }
    }, []);

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{9}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validatePhoneNumber(telefono)) {
            console.error('El número de teléfono no tiene el formato correcto (666666666).');
            return;
        }

        const data = {
            nombre,
            apellidos,
            fechaNacimiento,
            telefono,
            domicilio,
            email,
            password,
            foto,
            colegiado
        };
        console.log(data);

        try {
            const response = await fetch('http://localhost:8080/auth/registerOptico', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al registrar óptico');
            }

            const responseData = await response.json();
            const token = responseData.token;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            navigate('/perfilOptico');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleTelefonoBlur = () => {
        setTelefonoTouched(true);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: '1', borderRight: '1px solid black', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <br />
                <img src={userInfo && userInfo.foto ? userInfo.foto : "/images/fotoPerfil.webp"} alt="Avatar" style={{ width: '300px', height: '300px', borderRadius: '50%', marginBottom: '10px' }} />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <h3>{userInfo ? userInfo.nombre : "Nombre de Usuario"} {userInfo ? userInfo.apellidos : "Apellidos"}</h3>
                </div>
                <div style={{ marginTop: '100px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IoIosArrowForward />
                        <h5>Equipo</h5>
                    </div>
                    <h5 style={{ textAlign: 'center' }}>Citas</h5>
                    <Link to="/cambiarPerfil" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5>Producto</h5>
                    </Link>
                    <Link to="/pedidosOptico" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '10px' }}>Pedidos</h5>
                    </Link>
                    <Link to="/clientes" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '10px' }}>Clientes</h5>
                    </Link>
                </div>
            </div>
            <div style={{ flex: '3', padding: '10px' }}>
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
                                onBlur={handleTelefonoBlur} // Manejar el evento onBlur para rastrear la interacción del usuario
                                required
                            />
                            {telefonoTouched && !validatePhoneNumber(telefono) && ( // Mostrar el mensaje de error solo si el usuario ha interactuado con el campo de teléfono
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

                        <Form.Group controlId="formBasicColegiado">
                            <Form.Label>Número de Colegiado</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingresa tu número de colegiado"
                                value={colegiado}
                                onChange={(e) => setColegiado(e.target.value)}
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
                                onChange={(e) => setFoto(e.target.files[0])}
                                accept="image/*"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" style={{ marginTop: "1%" }}>
                            Registrarse
                        </Button>
                    </Form>
                    <br></br>
                </Container>
            </div>
        </div>
    );
};
