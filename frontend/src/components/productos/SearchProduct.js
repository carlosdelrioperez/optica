import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


export const SearchResult = () => {
    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get('search');

    const [originalResults, setOriginalResults] = useState([]); // Copia de respaldo de los resultados originales
    const [searchResults, setSearchResults] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [colorOptions, setColorOptions] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/api/productos/search?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                setOriginalResults(data); // Almacenar los resultados originales
                setSearchResults(data);
                setNoResults(data.length === 0); // Verificar si no se encontraron resultados
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        fetch('http://localhost:8080/api/productos/findColores')
            .then(response => response.json())
            .then(data => {
                setColorOptions(data);
            })
            .catch(error => {
                console.error('Error fetching color data:', error);
            });

    }, [searchTerm]);

    const handleColorChange = (e) => {
        const selectedColor = e.target.value;
        setSelectedColor(selectedColor);

        if (selectedColor) {
            fetch(`http://localhost:8080/api/productos/findByColor?color=${selectedColor}`)
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data);
                    setNoResults(data.length === 0); // Verificar si no se encontraron resultados después del filtrado
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            // Si no se selecciona ningún color, restaurar los resultados originales
            setSearchResults(originalResults);
            setNoResults(originalResults.length === 0); // Verificar si no se encontraron resultados después del filtrado
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortedResults = () => {
        if (sortOption === 'precioAscendente') {
            return [...searchResults].sort((a, b) => a.precio - b.precio);
        } else if (sortOption === 'precioDescendente') {
            return [...searchResults].sort((a, b) => b.precio - a.precio);
        } else {
            return searchResults;
        }
    };

    return (
        <div className='container'>
            <br />
            <h2>Resultados de búsqueda para "{searchTerm}"</h2>

            <select className="form-select-sm" value={sortOption} onChange={handleSortChange}>
                <option value="">Precio</option>
                <option value="precioAscendente">Menor a mayor</option>
                <option value="precioDescendente">Mayor a menor</option>
            </select>
            <select className="form-select-sm" value={selectedColor} onChange={handleColorChange}>
                <option value="">Color</option>
                {colorOptions.map(color => (
                    <option key={color} value={color}>{color}</option>
                ))}
            </select>

            {noResults && (
                <div>
                    <br></br>
                    <h5>No se encontraron productos.</h5>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            )}

            <div className="row">
                {sortedResults().map(producto => (
                    <div key={producto.id} className="col-md-4 mb-4">
                        <br />
                        <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}>
                            <div className="card">
                                <img src={producto.foto} className="card-img-top" alt={producto.nombre} />
                                <div className="card-body">
                                    <h5 className="card-text">{producto.nombre}</h5>
                                    <p className="card-text">Marca: {producto.marca}</p>
                                    <p className="card-text" style={{ fontWeight: 'bold', textAlign: 'right' }}>{producto.precio}€</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
