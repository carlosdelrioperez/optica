import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            fetchProductDetails(parsedCart);
        }
    }, []);

    const fetchProductDetails = async (cart) => {
        const updatedCart = [];
        for (const item of cart) {
            try {
                const response = await fetch(`http://localhost:8080/api/productos/${item.producto.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const updatedItem = { ...item, producto: data };
                updatedCart.push(updatedItem);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
        setCartItems(updatedCart);
    };

    const handleIncrement = (index) => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        storedCart[index].cantidad++;
        setCartItems(storedCart);
        localStorage.setItem('cart', JSON.stringify(storedCart));
        window.location.reload();
    };

    const handleDecrement = (index) => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (storedCart[index].cantidad > 1) {
            storedCart[index].cantidad--;
            setCartItems(storedCart);
            localStorage.setItem('cart', JSON.stringify(storedCart));
            window.location.reload();
        }
    };

    const handleRemove = (index) => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = storedCart.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.location.reload();
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.producto.precio * item.cantidad;
        }, 0);
    };

    const handleCheckout = () => {
        localStorage.setItem('cartTotal', calculateTotal());
        navigate('/checkout');
    };

    return (
        <div className='container-fluid'>
            <h2>Carrito</h2>
            {cartItems.length === 0 ? (
                <div>
                    <br></br>
                    <h5>El carrito está vacío.</h5>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            ) : (
                <div>
                    <div className="row">
                        {cartItems.map((item, index) => (
                            <div key={index} className="col-md-3 mb-4">
                                <div className="card h-100">
                                    <img src={item.producto.foto} className="card-img-top" alt={item.producto.nombre} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.producto.nombre}</h5>
                                        <p className="card-text">Marca: {item.producto.marca}</p>
                                        <p className="card-text">Precio: {item.producto.precio}€</p>
                                        <p className="card-text">Cantidad: {item.cantidad}</p>
                                        <button className="btn btn-primary mr-2" onClick={() => handleIncrement(index)}>+</button>
                                        <button className="btn btn-primary mr-2" onClick={() => handleDecrement(index)}>-</button>
                                        <button className="btn btn-danger" onClick={() => handleRemove(index)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h4>Total: {calculateTotal()}€</h4>
                        <button className="btn btn-success ml-3" onClick={handleCheckout}>
                            PAGAR
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
