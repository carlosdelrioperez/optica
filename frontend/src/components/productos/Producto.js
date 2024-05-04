import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Producto = () => {
    const [productInfo, setProductoInfo] = useState(null);
    const { id } = useParams();
    const [colores, setColores] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/productos/${id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setProductoInfo(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        fetch(`http://localhost:8080/api/productos/${id}/colores`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setColores(data)
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

    }, [id]);

    if (!productInfo) {
        return (
            <div>
                <div>No se encuentra el producto</div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    }

    const handleColorChange = (selectedColor) => {
        // Aquí puedes hacer algo con el color seleccionado, como mostrar información adicional
        console.log("Color seleccionado:", selectedColor);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <img src={productInfo.foto} alt="Imagen" style={{ maxWidth: '100%', height: 'auto', marginTop: '5%', marginLeft: '30%' }} />
                </div>
                <div className="col-md-4" style={{ marginTop: '5%' }}>
                    <h1>{productInfo.nombre}</h1>
                    <h2>{productInfo.precio}€</h2>
                    <div className="card" style={{ maxWidth: '18rem', border: '1.5px solid rgba(0, 0, 0, 0.1)' }}>
                        <div className="card-body">
                            <h5 className="card-title">Detalles</h5>
                            <p className="card-text">{productInfo.descripcion}</p>
                            {colores && (
                                <div>
                                    <select id="colores" className="form-select" onChange={(e) => handleColorChange(e.target.value)}>
                                        <option value="">Selecciona un color</option>
                                        {colores.map((color, index) => (
                                            <option key={index} value={color}>{color}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <button type="button" className="btn btn-success btn-lg">Comprar ya</button>
                        <button type="button" className="btn btn-secondary" style={{ marginLeft: '15px' }}>Añadir al carrito</button>
                    </div>
                </div>
            </div>
        </div>

    )

}
