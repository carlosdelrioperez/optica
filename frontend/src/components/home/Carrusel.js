import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Carrusel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x400?text=Slide+1"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Slide 1</h3>
                    <p>Este es el primer slide del carrusel.</p>
                    <a href="#catalogo">
                        <Button>Ver catálogo</Button>
                    </a>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x400?text=Slide+2"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Slide 2</h3>
                    <p>Este es el segundo slide del carrusel.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x400?text=Slide+3"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Slide 3</h3>
                    <p>Este es el tercer slide del carrusel.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Carrusel;
