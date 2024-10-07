import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate
import { IoIosArrowForward } from "react-icons/io";
import { Form, Button } from 'react-bootstrap';

export const NuevaRevision = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); // Inicializar navigate
    const [revisionData, setRevisionData] = useState({
        fecha: new Date().toISOString().split('T')[0],
        gafaIzq: '',
        gafaDer: '',
        maqIzq: '',
        maqDer: '',
        lejIzq: '',
        lejDer: '',
        cerIzq: '',
        cerDer: '',
        cliente: { id: id, role: "USER" },
        optico: { id: 1, role: "ADMIN" }
    });
    const [opticos, setOpticos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.sub;

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

            fetch(`http://localhost:8080/api/opticos`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setOpticos(data);
                })
                .catch(error => {
                    console.error('Error fetching opticos:', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRevisionData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        fetch('http://localhost:8080/api/revision', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(revisionData)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error al crear la revisión');
            })
            .then(data => {
                console.log('Revisión creada con éxito:', data);
                // Redirigir a la página de revisión del cliente
                navigate(`/revision/cliente/${id}`); // Usar navigate para redirigir
            })
            .catch(error => {
                console.error('Error al enviar la revisión:', error);
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
                <h2>Nueva Revisión</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="fecha">
                        <Form.Label>Fecha:</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha"
                            value={revisionData.fecha}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="gafaIzq">
                        <Form.Label>Gafa Izquierda:</Form.Label>
                        <Form.Control
                            type="number"
                            name="gafaIzq"
                            value={revisionData.gafaIzq}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="gafaDer">
                        <Form.Label>Gafa Derecha:</Form.Label>
                        <Form.Control
                            type="number"
                            name="gafaDer"
                            value={revisionData.gafaDer}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="maqIzq">
                        <Form.Label>Maq Izquierda:</Form.Label>
                        <Form.Control
                            type="number"
                            name="maqIzq"
                            value={revisionData.maqIzq}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="maqDer">
                        <Form.Label>Maq Derecha:</Form.Label>
                        <Form.Control
                            type="number"
                            name="maqDer"
                            value={revisionData.maqDer}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="lejIzq">
                        <Form.Label>Lej Izquierda:</Form.Label>
                        <Form.Control
                            type="number"
                            name="lejIzq"
                            value={revisionData.lejIzq}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="lejDer">
                        <Form.Label>Lej Derecha:</Form.Label>
                        <Form.Control
                            type="number"
                            name="lejDer"
                            value={revisionData.lejDer}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="cerIzq">
                        <Form.Label>Cer Izquierda:</Form.Label>
                        <Form.Control
                            type="number"
                            name="cerIzq"
                            value={revisionData.cerIzq}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="cerDer">
                        <Form.Label>Cer Derecha:</Form.Label>
                        <Form.Control
                            type="number"
                            name="cerDer"
                            value={revisionData.cerDer}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Dropdown para seleccionar el óptico */}
                    <Form.Group controlId="optico">
                        <Form.Label>Óptico:</Form.Label>
                        <Form.Control
                            as="select"
                            name="optico.id" // Ajustamos el nombre para que se mantenga el formato del objeto
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un óptico</option>
                            {opticos.map(optico => (
                                <option key={optico.id} value={optico.id}>
                                    {`${optico.nombre} ${optico.apellidos}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <br />
                    <Button type="submit" variant="primary">Enviar Revisión</Button>
                </Form>
            </div>
        </div>
    );
};
