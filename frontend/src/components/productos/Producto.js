import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Producto = () => {
    const [productInfo, setProductoInfo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/api/productos/${id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data[0]); // Muestra los datos del usuario en la consola
                setProductoInfo(data[0]); // Establece los datos del usuario en el estado
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

    }, [id]);

    if (!productInfo) {
        return <div>Cargando...</div>;
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3 offset-md-2'>
                        {productInfo.foto && <img src={productInfo.foto} alt="Imagen" style={{ width: '550px', height: '550px', marginTop: '20%' }} />}
                    </div>
                    <div className='col-md-3 offset-md-3'>
                        <h1 style={{ marginTop: '10%' }}>{productInfo.nombre}</h1>
                        <h2>{productInfo.precio}€</h2>
                        <div className="card" style={{ width: '18rem', marginTop: '20px', border: '1.5px solid rgba(0, 0, 0, 0.1)' }}>
                            <div className="card-body">
                                <h5 className="card-title">Detalles</h5>
                                <p className="card-text">
                                    {productInfo.descripcion}
                                </p>
                                <p className="card-text">
                                    {productInfo.color}
                                </p>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <button type="button" className="btn btn-success btn-lg">Comprar ya</button>
                            <button type="button" className="btn btn-secondary" style={{ margin: '5%' }}>Añadir al carrito</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
