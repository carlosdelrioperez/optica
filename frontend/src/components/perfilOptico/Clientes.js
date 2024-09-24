import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Card, Row, Col } from 'react-bootstrap';

export const Clientes = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [clientes, setClientes] = useState(null);

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
            fetch(`http://localhost:8080/api/clientes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setClientes(data); // Establece los datos del usuario en el estado
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
                    <Link to="/citasOptico" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ textAlign: 'center' }}>Citas</h5>
                    </Link>
                    <Link to="/stock" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '5px' }}>Producto</h5>
                    </Link>
                    <Link to="/pedidosOptico" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '10px' }}>Pedidos</h5>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IoIosArrowForward />
                        <h5>Clientes</h5>
                    </div>
                </div>
            </div>
            {/* Columna derecha*/}
            <div style={{
                flex: '1',
                padding: '10px',
                overflowY: 'auto'
            }}>
                {clientes && clientes.map((cliente, index) => (
                    <div key={index}>
                        <Link to={`/revision/cliente/${cliente.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <Card style={{ marginBottom: '10px' }}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Card.Title>{cliente.nombre} {cliente.apellidos}</Card.Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Email: {cliente.email}</p>
                                        </Col>
                                        <Col>
                                            <p>Teléfono: {cliente.telefono}</p>
                                        </Col>
                                        <Col>
                                            <p>Domicilio: {cliente.domicilio}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Link>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};
