import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export const Producto = () => {
    const [productInfo, setProductoInfo] = useState(null);
    const { id } = useParams();
    const [colores, setColores] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        // Buscar producto
        fetch(`http://localhost:8080/api/productos/${id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setProductoInfo(data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });

        // Buscar colores disponibles
        fetch(`http://localhost:8080/api/productos/${id}/colores`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setColores(data);
            })
            .catch(error => {
                console.error('Error fetching colors:', error);
            });

        // Buscar cliente
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.sub;

            fetch(`http://localhost:8080/api/clientes/findByEmail?email=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUserInfo(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [id]);

    const handleColorChange = (selectedColor) => {
        setSelectedColor(selectedColor);
    };

    const handleAddToCart = () => {
        if (!selectedColor && colores && colores.length > 0) {
            alert('Por favor selecciona un color antes de añadir al carrito.');
            return;
        }

        let lineaPedido = {
            cantidad: 1,
            producto: {
                id: productInfo.id
            }
        };

        if (selectedColor) {
            lineaPedido.producto.color = selectedColor;
        }

        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        existingCart.push(lineaPedido);
        localStorage.setItem('cart', JSON.stringify(existingCart));
        alert('Producto añadido al carrito');
        window.location.reload();
    };

    const handlePay = () => {
        if (!selectedColor && colores && colores.length > 0) {
            alert('Por favor selecciona un color antes de comprar.');
            return;
        }

        let lineaPedido = {
            cantidad: 1,
            producto: {
                id: productInfo.id
            }
        };

        if (selectedColor) {
            lineaPedido.producto.color = selectedColor;
        }

        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        existingCart.push(lineaPedido);
        localStorage.setItem('cart', JSON.stringify(existingCart));
        navigate('/checkout');
    };


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

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <img src={productInfo.foto} alt="Imagen" style={{ maxWidth: '100%', height: 'auto', marginTop: '5%', marginLeft: '20%' }} />
                </div>
                <div className="col-md-4" style={{ marginTop: '5%' }}>
                    <h1>{productInfo.nombre}</h1>
                    <h2>{productInfo.precio}€</h2>
                    <div className="card" style={{ maxWidth: '18rem', border: '1.5px solid rgba(0, 0, 0, 0.1)' }}>
                        <div className="card-body">
                            <h5 className="card-title">Detalles</h5>
                            <p className="card-text">{productInfo.descripcion}</p>
                            {colores && colores.length > 0 && (
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
                        <button type="button" className="btn btn-success btn-lg" onClick={handlePay}>Comprar ya</button>
                        <button type="button" className="btn btn-secondary" style={{ marginLeft: '15px' }} onClick={handleAddToCart}>Añadir al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
