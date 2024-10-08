import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Container, Form, Button } from 'react-bootstrap';

export const EditarOptico = () => {
    const [userInfo, setUserInfo] = useState({});
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState(0);
    const [domicilio, setDomicilio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [foto, setFoto] = useState(null);
    const [colegiado, setColegiado] = useState(0);
    const navigate = useNavigate();
    const [telefonoTouched, setTelefonoTouched] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch(`http://localhost:8080/api/opticos/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUserInfo(data);
                    setNombre(data.nombre || '');
                    setApellidos(data.apellidos || '');
                    setFechaNacimiento(data.fechaNacimiento || '');
                    setTelefono(data.telefono || '');
                    setDomicilio(data.domicilio || '');
                    setEmail(data.email || '');
                    setColegiado(data.colegiado || '');
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [id]);

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

        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No se encontró un token en el localStorage.');
            return;
        }

        fetch(`http://localhost:8080/api/opticos?id=${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Establecer el tipo de contenido a JSON
            },
            body: JSON.stringify(data) // Convertir el objeto 'data' a JSON
        })
            .then(() => {
                navigate('/perfilOptico');
            })
            .catch(error => {
                console.error('Error al enviar los datos', error);
            });

    };


    const handleTelefonoBlur = () => {
        setTelefonoTouched(true);
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IoIosArrowForward />
                        <h5>Equipo</h5>
                    </div>
                    <h5 style={{ textAlign: 'center' }}>Citas</h5>
                    <Link to="/stock" style={{ textDecoration: 'none', color: 'black' }}>
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

            {/* Columna derecha*/}
            <div style={{
                flex: '1',
                padding: '10px',
                overflowY: 'auto'
            }}>
                <Container>
                    <h1 className="mt-5 mb-4">Actualizar datos de óptico</h1>
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

                        <Form.Group controlId="formBasicColegiado">
                            <Form.Label>Número de Colegiado</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingresa tu número de colegiado"
                                value={colegiado}
                                onChange={(e) => setColegiado(parseInt(e.target.value || 0, 10))}
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
                            Actualizar
                        </Button>
                    </Form>
                    <br></br>
                </Container>
            </div>
        </div>
    );
};
