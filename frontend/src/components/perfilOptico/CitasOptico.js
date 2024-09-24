import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Card, Row, Col } from 'react-bootstrap';

export const CitasOptico = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [citas, setCitas] = useState(null);

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

            fetch(`http://localhost:8080/api/citas`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    setCitas(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

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
                    <Link to="/perfilOptico" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '8px' }}>Equipo</h5>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IoIosArrowForward />
                        <h5>Citas</h5>
                    </div>
                    <Link to="/stock" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5>Producto</h5>
                    </Link>
                    <Link to="/pedidosOptico" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '5px' }}>Pedidos</h5>
                    </Link>
                    <Link to="/clientes" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '5px' }}>Clientes</h5>
                    </Link>
                </div>
            </div>

            {/* Columna derecha*/}
            <div style={{
                flex: '1',
                padding: '10px',
                overflowY: 'auto'
            }}>
                {citas && citas.map((cita, index) => (
                    <div key={index}>
                        <Card style={{ marginBottom: '10px' }}>
                            <Card.Body>
                                <Row className="no-gutters">
                                    <Col>
                                        <Card.Title>{cita.cliente.nombre} {cita.cliente.apellidos}</Card.Title>
                                    </Col>
                                    <Col>
                                        <Row className="no-gutters">
                                            <Col>
                                                <p><b>Fecha:</b> {cita.dia}</p>
                                            </Col>
                                            <Col>
                                                <p><b>Óptico:</b> {cita.optico.nombre}</p>
                                            </Col>
                                        </Row>
                                        <Row className="no-gutters">
                                            <Col>
                                                <p><b>Hora:</b> {cita.hora.hora}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};
