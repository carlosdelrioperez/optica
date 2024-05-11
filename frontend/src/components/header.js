import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { BsCart3 } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Verificar si el usuario está loggeado y obtener el rol del token almacenado en localStorage
        if (isLoggedIn) {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                setUserRole(decodedToken.role);
            }
        }
    }, [isLoggedIn]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/productos/search?search=${searchTerm}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserRole(null);
        navigate('/');
    };

    return (
        <div>
            <Navbar className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className='container-fluid'>
                    <Navbar.Brand>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                            <img src="/images/centro-optico-cabildo.jpeg" alt='Logo' width="50" height="45" />
                        </Link>
                    </Navbar.Brand>
                    <Nav className="container-fluid">
                        <Nav.Link style={{ color: 'white' }}>
                            {isLoggedIn ? (
                                <Link to="/pedirCita" style={{ color: 'white', textDecoration: 'none' }}>Pedir cita</Link>
                            ) : (
                                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Pedir cita</Link>
                            )}
                        </Nav.Link>
                        <Nav.Link style={{ color: 'white' }}>Sobre nosotros</Nav.Link>
                    </Nav>
                    <Nav>
                        <Form onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Buscar"
                                className="mr-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form>
                    </Nav>
                    <Nav>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link style={{ color: 'white' }}>
                                    <BsCart3 style={{ width: "40px", height: "40px" }} />
                                </Nav.Link>
                                {userRole === 'USER' ? (
                                    <Link to="/perfil" style={{ color: 'white', textDecoration: 'none' }}>
                                        <IoPersonCircleOutline style={{ width: "50px", height: "50px", position: "relative" }} />
                                    </Link>
                                ) : userRole === 'ADMIN' ? (
                                    <Link to="/perfilOptico" style={{ color: 'white', textDecoration: 'none' }}>
                                        <IoPersonCircleOutline style={{ width: "50px", height: "50px", position: "relative" }} />
                                    </Link>
                                ) : null}
                                <Nav.Link onClick={handleLogout} style={{ color: 'white', position: "relative", top: "6px" }}>Logout</Nav.Link>
                            </>
                        ) : (
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                                <IoPersonCircleOutline style={{ width: "50px", height: "50px", position: "relative" }} />
                            </Link>
                        )}
                    </Nav>
                </div>
            </Navbar >
        </div >
    )
}
