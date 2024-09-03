import React, { useState, useEffect } from 'react';

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

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
                console.log(updatedCart);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
        setCartItems(updatedCart);
    };

    const handleIncrement = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].cantidad++;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleDecrement = (index) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].cantidad > 1) {
            updatedCart[index].cantidad--;
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const handleRemove = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.location.reload();
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.producto.precio * item.cantidad;
        }, 0);
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
                    </div>
                </div>
            )}
        </div>
    );
};
