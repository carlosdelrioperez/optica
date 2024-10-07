import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


export const Pedido = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [pedido, setPedido] = useState(null);
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
                    fetch(`http://localhost:8080/api/pedidos/${id}`, {
                        method: 'GET'
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);

                            setPedido(data);
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

    if (!pedido) {
        return (
            <div>
                <div>No se encuentra el pedido</div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    }

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
                        <h5 style={{ marginLeft: '40px' }}>Mis revisiones</h5>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-20px' }}>
                        <IoIosArrowForward />
                        <h5 style={{ textAlign: 'center' }}>Mis pedidos</h5>
                    </div>
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
                <div>
                    <h3>{pedido.cliente.nombre} {pedido.cliente.apellidos}</h3>
                    <h5>{pedido.cliente.domicilio}</h5>
                    <h5>{pedido.cliente.telefono}</h5>
                    <hr></hr>
                    <div className="row">
                        {pedido.lineasPedido.map((item, index) => (
                            <div key={index} className="col-md-3 mb-4">
                                <div className="card h-100">
                                    <img src={item.producto.foto} className="card-img-top" alt={item.producto.nombre} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.producto.nombre}</h5>
                                        <p className="card-text">Marca: {item.producto.marca}</p>
                                        <p className="card-text">Precio: {item.producto.precio}€</p>
                                        <p className="card-text">Cantidad: {item.cantidad}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
