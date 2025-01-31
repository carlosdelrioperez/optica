import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Card, Row, Col, FormControl, InputGroup } from 'react-bootstrap';

export const PedidosOptico = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPedidos, setFilteredPedidos] = useState([]);

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
                    setUserInfo(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });

            fetch(`http://localhost:8080/api/pedidos`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    setPedidos(data);
                    setFilteredPedidos(data); // Inicialmente, la lista filtrada es igual a la lista de pedidos completa
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    // Filtrar los pedidos según el término de búsqueda
    useEffect(() => {
        if (searchTerm) {
            const filtered = pedidos.filter(pedido =>
                pedido.id.toString().includes(searchTerm) // Filtrar por ID (asegúrate de que el ID sea una cadena)
            );
            setFilteredPedidos(filtered);
        } else {
            setFilteredPedidos(pedidos); // Si no hay término de búsqueda, mostrar todos los pedidos
        }
    }, [searchTerm, pedidos]);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Columna izquierda */}
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
                        <h5 style={{ textAlign: 'center' }}>Equipo</h5>
                    </Link>
                    <Link to="/citasOptico" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ textAlign: 'center' }}>Citas</h5>
                    </Link>
                    <Link to="/stock" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '5px' }}>Producto</h5>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-5px' }}>
                        <IoIosArrowForward />
                        <h5>Pedidos</h5>
                    </div>
                    <Link to="/clientes" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '10px' }}>Clientes</h5>
                    </Link>
                </div>
            </div>

            {/* Columna derecha */}
            <div style={{
                flex: '1',
                padding: '10px',
                overflowY: 'auto'
            }}>
                {/* Campo de búsqueda */}
                <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
                    <FormControl
                        placeholder="Buscar por ID de pedido"
                        aria-label="Buscar por ID de pedido"
                        aria-describedby="basic-addon2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>

                {/* Mostrar los pedidos filtrados */}
                {filteredPedidos.length > 0 ? (
                    filteredPedidos.map((pedido, index) => (
                        <div key={index}>
                            <Link to={`/pedido/optico/${pedido.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <Card style={{ marginBottom: '10px' }}>
                                    <Card.Body>
                                        <Row className="no-gutters">
                                            <Col>
                                                <Row className="no-gutters">
                                                    <Col>
                                                        <p><b>Id:</b> {pedido.id}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron pedidos con ese ID.</p>
                )}
            </div>
        </div>
    );
};
