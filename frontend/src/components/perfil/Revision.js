import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


export const Revision = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [proximaCita, setProximaCita] = useState(null);
    const [revision, setRevision] = useState(null);
    const { id } = useParams();

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
                    fetch(`http://localhost:8080/api/revision/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);

                            setRevision(data);
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [id]);

    const handleButtonClick = () => {
        fetch(`http://localhost:8080/api/citas/${proximaCita.id}`, {
            method: 'DELETE'
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
                <br></br>
                {revision ? (
                    <>
                        <h3>{revision.cliente.nombre} {revision.cliente.apellidos}</h3>
                        <h5>{revision.cliente.domicilio}</h5>
                        <h5>{revision.cliente.telefono}</h5>
                        <hr />
                        <h5>Fecha: {revision.fecha}</h5>
                        <br></br>
                        <div style={{ marginLeft: "50px" }}>
                            <Row>
                                <Col>
                                    <p><b>Gafa Izquierda:</b> {revision.gafaIzq}</p>
                                </Col>
                                <Col>
                                    <p><b>Gafa Derecha:</b> {revision.gafaDer}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Máquina Izquierda:</b> {revision.maqIzq}</p>
                                </Col>
                                <Col>
                                    <p><b>Máquina Derecha:</b> {revision.maqDer}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Cerca Izquierda:</b> {revision.cerIzq}</p>
                                </Col>
                                <Col>
                                    <p><b>Cerca Derecha:</b> {revision.cerDer}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p><b>Lejos Izquierda:</b> {revision.lejIzq}</p>
                                </Col>
                                <Col>
                                    <p><b>Lejos Derecha:</b> {revision.lejDer}</p>
                                </Col>
                            </Row>
                        </div>
                    </>
                ) : (
                    <p>Cargando información de la revisión...</p>
                )}
            </div>
        </div>
    );
};
