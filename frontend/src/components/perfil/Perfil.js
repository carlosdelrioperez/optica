import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Card, Row, Col, Button } from 'react-bootstrap';

export const Perfil = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [proximaCita, setProximaCita] = useState(null);
    const [revisiones, setRevisiones] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

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
                    setUserInfo(data);

                    fetch(`http://localhost:8080/api/citas/cliente/${data.id}/proximaCita`, {
                        method: 'GET'
                    })
                        .then(response => response.json())
                        .then(data => {
                            setProximaCita(data);
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    useEffect(() => {
        if (userInfo && userInfo.id) { // Asegúrate de que userInfo no es null
            const token = localStorage.getItem('token');
            fetch(`http://localhost:8080/api/revision/cliente/${userInfo.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setRevisiones(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [userInfo]); // Este useEffect se ejecutará cuando userInfo cambie

    const handleButtonClick = () => {
        fetch(`http://localhost:8080/api/citas/${proximaCita.id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    throw new Error('Error al eliminar la cita');
                }
            })
            .catch(error => {
                console.error('Error al eliminar la cita:', error);
            });
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-20px' }}>
                        <IoIosArrowForward />
                        <h5>Mis revisiones</h5>
                    </div>
                    <Link to="/misPedidos" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ textAlign: 'center' }}>Mis pedidos</h5>
                    </Link>
                    <Link to="/cambiarPefil" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5>Cambiar datos de perfil</h5>
                    </Link>
                </div>
            </div>
            {/* Columna derecha*/}
            <div style={{
                flex: '1',
                padding: '10px',
                overflowY: 'auto'
            }}>
                {proximaCita && (
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <p style={{ textAlign: 'center' }}>Su próxima cita es el día {new Date(proximaCita.dia).toLocaleDateString('es-ES')} a las {proximaCita.hora.hora.split(':').slice(0, 2).join(':')}</p>
                            </Card.Title>
                        </Card.Body>
                        <Button variant="danger" style={{ position: 'absolute', bottom: '10px', right: '10px' }} onClick={handleButtonClick}>
                            Eliminar cita
                        </Button>
                    </Card>
                )}
                {revisiones && revisiones.map((revision, index) => (
                    <div key={index}>
                        <Link to={`/revision/${revision.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <Card style={{ marginBottom: '10px' }}>
                                <Card.Body>
                                    <Row className="no-gutters">
                                        <Col>
                                            <Row className="no-gutters">
                                                <Col>
                                                    <p><b>Id:</b> {revision.id}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
