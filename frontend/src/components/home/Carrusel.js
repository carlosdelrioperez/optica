import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Carrusel() {
    const navigate = useNavigate();


    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };


    const handleCitaClick = () => {
        if (isAuthenticated()) {
            navigate('/pedirCita');
        } else {
            navigate('/login');
        }
    };

    return (
        <div style={{ width: '35%', margin: '0 auto', paddingTop: '20px' }}>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images.unsplash.com/photo-1524255684952-d7185b509571?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                    <Carousel.Caption>
                        <h3>Descubre nuestro catálogo</h3>
                        <a href="#catalogo">
                            <Button variant="primary">Ver catálogo</Button>
                        </a>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://plus.unsplash.com/premium_photo-1692340973681-e96b10bda346?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Gafas de lectura"
                    />
                    <Carousel.Caption>
                        <h3>¿Necesitas gafas de sol?</h3>
                        <Link to={"/genero/sol"}>
                            <Button variant="primary">Ver gafas de sol</Button>
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://plus.unsplash.com/premium_photo-1661281385246-b304dc641ae9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Exámenes de la vista"
                    />
                    <Carousel.Caption>
                        <h3>Cuida tu vista, pide cita</h3>
                        <Button variant="primary" onClick={handleCitaClick}>
                            Pedir cita
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Carrusel;
