import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Catalogo() {
    return (
        <div id="catalogo" className="container" style={{ marginTop: "5%" }}>
            <div className="row">
                <div className="col-md-4 mb-5">
                    <Link to="/genero/graduadas" style={{ textDecoration: 'none' }}>
                        <Card style={{ width: '18rem', height: '25rem' }}>
                            <Card.Img variant="top" src="/images/gafaGraduada.avif" style={{ height: '100%', objectFit: 'cover' }} />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title style={{ position: 'absolute', bottom: '0', left: '5px' }}>Gafas graduadas</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-4 mb-5">
                    <Link to="/genero/sol" style={{ textDecoration: 'none' }}>
                        <Card style={{ width: '18rem', height: '25rem' }}>
                            <Card.Img variant="top" src="/images/gafasSol.avif" style={{ height: '100%', objectFit: 'cover' }} />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title style={{ position: 'absolute', bottom: '0', left: '5px' }}>Gafas de sol</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-4 mb-5">
                    <Link to="/genero/deportivas" style={{ textDecoration: 'none' }}>
                        <Card style={{ width: '18rem', height: '25rem' }}>
                            <Card.Img variant="top" src="/images/gafasDeportivas.avif" style={{ height: '100%', objectFit: 'cover' }} />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title style={{ position: 'absolute', bottom: '0', left: '5px' }}>Gafas deportivas</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2 mb-5"></div>
                <div className="col-md-2 mb-5">
                    <Link to="/genero/lentillas" style={{ textDecoration: 'none' }}>
                        <Card style={{ width: '18rem', height: '25rem' }}>
                            <Card.Img variant="top" src="/images/lentillas.avif" style={{ height: '100%', objectFit: 'cover' }} />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title style={{ position: 'absolute', bottom: '0', left: '5px' }}>Lentillas</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-2 mb-5"></div>
                <div className="col-md-2 mb-5">
                    <Link to="/genero/accesorios" style={{ textDecoration: 'none' }}>
                        <Card style={{ width: '18rem', height: '25rem' }}>
                            <Card.Img variant="top" src="/images/accesorios.avif" style={{ height: '100%', objectFit: 'cover' }} />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title style={{ position: 'absolute', bottom: '0', left: '5px' }}>Accesorios</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Catalogo;
