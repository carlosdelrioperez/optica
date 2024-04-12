import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


export const Perfil = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Obtener el token de sesión del localStorage
        const token = localStorage.getItem('token');

        if (token) {
            // Decodificar el token para obtener el correo electrónico del usuario
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.sub;

            // Hacer la llamada al endpoint con el correo electrónico y el token
            fetch(`http://localhost:8080/api/clientes/findByEmail?email=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Muestra los datos del usuario en la consola
                    setUserInfo(data); // Establece los datos del usuario en el estado
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IoIosArrowForward />
                        <h5>Mis revisiones</h5>
                    </div>
                    <h5 style={{ textAlign: 'center' }}>Mis pedidos</h5>
                    <Link to="/cambiarPefil" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5>Cambiar datos de perfil</h5>
                    </Link>
                </div>
            </div>
            <div style={{ flex: '3', padding: '10px' }}>

            </div>
        </div>
    );
};
