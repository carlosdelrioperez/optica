import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Catalogo() {
    return (
        <div id="catalogo" className="container" style={{ marginTop: "5%" }}>
            <div className="row">
                <div className="col-md-4 mb-5">
                    <Link to="/componente1" style={{ textDecoration: 'none' }}>
                        <Card style={{ width: '18rem', height: '25rem' }}>
                            <Card.Img variant="top" src="imagen4.jpg" style={{ height: '100%', objectFit: 'cover' }} />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title>Card 1</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-4 mb-5">
                    <Link to="/componente2" style={{ textDecoration: 'none' }}>
                        <Card style={{ width: '18rem', height: '25rem' }}>
                            <Card.Img variant="top" src="imagen4.jpg" style={{ height: '100%', objectFit: 'cover' }} />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title>Card 2</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-4 mb-5">
                    <Link to="/componente3" style={{ textDecoration: 'none' }}>
                        <Card style={{ width: '18rem', height: '25rem' }}>
                            <Card.Img variant="top" src="imagen4.jpg" style={{ height: '100%', objectFit: 'cover' }} />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title>Card 3</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2 mb-5"></div>
                <div className="col-md-2 mb-5">
                    <Link to="/componente4" style={{ textDecoration: 'none' }}>
                        <Card style={{ width: '18rem', height: '25rem' }}>
                            <Card.Img variant="top" src="imagen4.jpg" style={{ height: '100%', objectFit: 'cover' }} />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title>Card 4</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-2 mb-5"></div>
                <div className="col-md-2 mb-5">
                    <Link to="/componente5" style={{ textDecoration: 'none' }}>
                        <Card style={{ width: '18rem', height: '25rem' }}>
                            <Card.Img variant="top" src="imagen4.jpg" style={{ height: '100%', objectFit: 'cover' }} />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title>Card 5</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Catalogo;
