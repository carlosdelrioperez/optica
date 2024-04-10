import React, { useState } from 'react'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { BsCart3 } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';



export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/productos/search?search=${searchTerm}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        setIsLoggedIn(false); // Actualizar el estado de inicio de sesión
        navigate('/'); //Redirige a la página de inicio
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
                        <Nav.Link style={{ color: 'white' }}>Pedir cita</Nav.Link>
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
                                <Link to="/perfil" style={{ color: 'white', textDecoration: 'none' }}>
                                    <IoPersonCircleOutline style={{ width: "50px", height: "50px", position: "relative", top: "4px" }} />
                                </Link>
                                <Nav.Link onClick={handleLogout} style={{ color: 'white', position: "relative", top: "6px" }}>Logout</Nav.Link>
                            </>
                        ) : (
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                                <IoPersonCircleOutline style={{ width: "50px", height: "50px", position: "relative", top: "4px" }} />
                            </Link>
                        )}
                    </Nav>
                </div>
            </Navbar >
        </div >
    )
}
