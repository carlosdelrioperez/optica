import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const SearchResult = () => {
    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get('search'); // Obtener el término de búsqueda de la URL

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/productos/search?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [searchTerm]);

    return (
        <div className='container'>
            <br />
            <h2>Resultados de búsqueda para "{searchTerm}"</h2>
            <br />
            <div className="row">
                {searchResults.map(producto => (
                    <div key={producto.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={producto.foto} className="card-img-top" alt={producto.nombre} />
                            <div className="card-body">
                                <h5 className="card-text">{producto.nombre}</h5>
                                <p className="card-text">Marca: {producto.marca}</p>
                                <p className="card-text" style={{ fontWeight: 'bold', textAlign: 'right' }}>{producto.precio}€</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
