import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Card, Row, Col, Button } from 'react-bootstrap';

export const PerfilOptico = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [opticos, setOpticos] = useState(null);

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
            fetch(`http://localhost:8080/api/opticos`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setOpticos(data); // Establece los datos del usuario en el estado
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/api/opticos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    throw new Error('Error al eliminar el optico');
                }
            })
            .catch(error => {
                console.error('Error al eliminar el optico:', error);
            });
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
                    <Link to="/citasOptico" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ textAlign: 'center' }}>Citas</h5>
                    </Link>
                    <Link to="/cambiarPerfil" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5>Producto</h5>
                    </Link>
                </div>
            </div>
            <div style={{ flex: '3', padding: '10px' }}>
                <Link to="/opticoNuevo">
                    <Button variant="primary">Óptico nuevo</Button>
                </Link>
                <br />
                <br />
                {opticos && opticos.map((optico, index) => (
                    <div key={index}>
                        <Card style={{ marginBottom: '10px' }}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Title>{optico.nombre} {optico.apellidos}</Card.Title>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Email: {optico.email}</p>
                                    </Col>
                                    <Col>
                                        <p>Teléfono: {optico.telefono}</p>
                                    </Col>
                                    <Col>
                                        <p>Domicilio: {optico.domicilio}</p>
                                    </Col>
                                    <Col>
                                        <p>Colegiado: {optico.colegiado}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Fecha Nacimiento: {optico.fechaNacimiento}</p>
                                    </Col>
                                    <Col className="text-end">
                                        <Link to={`/editarOptico/${optico.id}`}>
                                            <Button variant='secondary'>Editar</Button>
                                        </Link>
                                        <Button variant="danger" onClick={() => handleDelete(optico.id)}
                                            style={{ margin: '2px' }}>Eliminar</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};
