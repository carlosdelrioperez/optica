import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Genero() {
    const { genero } = useParams();
    const [productos, setProductos] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [colorOptions, setColorOptions] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');

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

    }, [genero]);

    const handleColorChange = (e) => {
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
        const selectedColor = e.target.value;
        setSelectedColor(selectedColor);

        if (selectedColor) {
            const filteredResults = productos.filter(producto => producto.color === selectedColor);
            setProductos(filteredResults);
        } else {
            // Si no se selecciona ningún color, restaurar los productos originales
            fetch(`http://localhost:8080/api/productos/findByGenero?genero=${generoQuery}`)
                .then(response => response.json())
                .then(data => {
                    setProductos(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        let sortedProducts = [...productos];

        if (e.target.value === 'precioAscendente') {
            sortedProducts.sort((a, b) => a.precio - b.precio);
        } else if (e.target.value === 'precioDescendente') {
            sortedProducts.sort((a, b) => b.precio - a.precio);
        }

        setProductos(sortedProducts);
    };

    return (
        <div className='container'>
            <br />
            <h1>{formatGenero(genero)}</h1>

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

            <div className="row">
                {productos.map(producto => (
                    <div key={producto.id} className="col-md-4 mb-4">
                        <br />
                        <div className="card">
                            <img src={producto.foto} className="card-img-top" alt={producto.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">Marca: {producto.marca}</p>
                                <p className="card-text">Precio: {producto.precio}€</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Genero;
