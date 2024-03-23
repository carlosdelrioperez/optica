import React from 'react'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { BsCart3 } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';



export const Header = () => {
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
                        <Form >
                            <FormControl type="search" placeholder="Buscar" className="mr-2" aria-label="Search" />
                        </Form>
                    </Nav>
                    <Nav>
                        <Nav.Link style={{ color: 'white' }}>
                            <BsCart3 style={{ width: "40px", height: "40px" }} />
                        </Nav.Link>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                            <IoPersonCircleOutline style={{ width: "50px", height: "50px", position: "relative", top: "4px" }} />
                        </Link>
                    </Nav>

                </div>
            </Navbar >
        </div >
    )
}
