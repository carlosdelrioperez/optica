import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Genero() {
    const { genero } = useParams();
    const [productos, setProductos] = useState([]);

    const formatGenero = (genero) => {
        switch (genero) {
            case "graduadas":
                return "Gafas Graduadas";
            case "sol":
                return "Gafas de Sol";
            case "deportivas":
                return "Gafas Deportivas";
            case "lentillas":
                return "Lentillas";
            case "accesorios":
                return "Accesorios";
            default:
                return genero;
        }
    };

    useEffect(() => {
        let generoQuery = "";
        if (genero.match("graduadas")) {
            generoQuery = "GAFAS_GRADUADAS";
        } else if (genero.match("sol")) {
            generoQuery = "GAFAS_SOL";
        } else if (genero.match("deportivas")) {
            generoQuery = "GAFAS_DEPORTIVAS";
        } else if (genero.match("lentillas")) {
            generoQuery = "LENTILLAS";
        } else if (genero.match("accesorios")) {
            generoQuery = "ACCESORIOS";
        }

        fetch(`http://localhost:8080/api/productos/findByGenero?genero=${generoQuery}`)
            .then(response => response.json())
            .then(data => {
                setProductos(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [genero]);

    return (
        <div className='container'>
            <br></br>
            <h1>{formatGenero(genero)}</h1>
            <br></br>
            <div className="card-container">
                {productos.map(producto => (
                    <div key={producto.id} className="card" style={{ width: '18rem', margin: '10px' }}>
                        <img src={producto.foto} className="card-img-top" alt={producto.nombre} />
                        <div className="card-body">
                            <h5 className="card-text" style={{ marginBottom: '0.5rem' }}>{producto.nombre}</h5>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="card-text" style={{ marginBottom: '0.5rem', marginRight: '1rem' }}>{producto.marca}</p>
                                <p className="card-text" style={{ marginBottom: '0', fontWeight: 'bold', textAlign: 'right' }}> {producto.precio}€</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Genero;
