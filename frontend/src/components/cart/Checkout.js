import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



export const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [productPrice, setProductPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [paymentIntentId, setPaymentIntentId] = useState("");
    const [cardComplete, setCardComplete] = useState(false);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [, setPedidoInfo] = useState(null);
    const [cart, setCartInfo] = useState(null);
    const [, setColor] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
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

        const cartTotal = localStorage.getItem('cartTotal');
        if (cartTotal) {
            setProductPrice(Number(cartTotal));
        }

        const cart = localStorage.getItem('cart');
        if (cart) {

            setCartInfo(cart);
        }


    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setErrorMessage("Stripe.js ha tardado en cargar.");
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setErrorMessage("Detalles de la tarjeta no encontrados.");
            setLoading(false);
            return;
        }

        const amountInCents = Math.round(productPrice * 100);

        try {
            const response = await fetch("http://localhost:8080/stripe/paymentIntent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: amountInCents, currency: "EUR", description: "Compra de producto" }),
            });
            const token = await response.json();
            const id = token.id;

            setPaymentIntentId(id);
            setShowModal(true);

        } catch (error) {
            setErrorMessage("Error en la comunicación con el servidor.");
        }

        setLoading(false);
    };

    const handleConfirm = async () => {
        try {
            // Se crea el pedido
            fetch(`http://localhost:8080/api/pedidos`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "cliente": {
                        "id": userInfo.id,
                        "role": "USER"
                    }
                })
            })
                .then(response => response.json())
                .then(data => {
                    // Último pedido del cliente, el que se está haciendo
                    fetch(`http://localhost:8080/api/pedidos/clienteUltimo/${userInfo.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setPedidoInfo(data.id);
                            const pedidoId = data.id;
                            let cartObject = [];
                            if (cart) {
                                cartObject = JSON.parse(cart);
                            } else {
                                console.error("El carrito está vacío o no existe.");
                            }

                            // Procesamos el carrito
                            for (const linea of cartObject) {
                                if (linea.producto.color) {
                                    fetch(`http://localhost:8080/api/colorByNombreAndProducto?nombre=${linea.producto.color}&productoId=${linea.producto.id}`, {
                                        method: 'GET',
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        }
                                    })
                                        .then(response => response.json())
                                        .then(colorData => {
                                            setColor(colorData);

                                            const bodyLinea = {
                                                "cantidad": linea.cantidad,
                                                "pedido": {
                                                    "id": pedidoId
                                                },
                                                "producto": {
                                                    "id": linea.producto.id
                                                },
                                                "color": {
                                                    "id": colorData
                                                }
                                            };

                                            // Añadir línea al pedido
                                            fetch(`http://localhost:8080/api/lineasPedido?id=${linea.producto.id}`, {
                                                method: "POST",
                                                headers: {
                                                    'Authorization': `Bearer ${token}`,
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(bodyLinea)
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    localStorage.removeItem('cart');
                                                    navigate('/');
                                                    window.location.reload();
                                                })
                                                .catch(error => {
                                                    console.error('Error al añadir la línea al pedido:', error);
                                                });
                                        })
                                        .catch(error => {
                                            console.error('Error al obtener el color:', error);
                                        });
                                }
                            }
                            let body = {
                                "id": `${paymentIntentId}`,
                                "clienteId": userInfo.id,
                                "pedidoId": pedidoId
                            }
                            console.log(body);

                            fetch(`http://localhost:8080/stripe/confirm`, {
                                method: "POST",
                                body: JSON.stringify(body),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                        })
                        .catch(error => {
                            console.error('Error al obtener el último pedido:', error);
                        });
                })
                .catch(error => {
                    console.error('Error al crear el pedido:', error);
                });

        } catch (error) {
            setErrorMessage("Error al procesar la confirmación.");
        }
        setShowModal(false);
    };

    const handleCancel = async () => {
        try {
            const response = await fetch(`http://localhost:8080/stripe/cancel/${paymentIntentId}`, {
                method: "POST",
            });
            const result = await response.json();
            if (result.status === "canceled") {
                alert("Pago cancelado exitosamente");
            } else {
                setErrorMessage("Error al cancelar el pago.");
            }
        } catch (error) {
            setErrorMessage("Error al procesar la cancelación.");
        }
        setShowModal(false);
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm">
                        <div className="card-header text-center bg-primary text-white">
                            <h3>Proceso de Pago</h3>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Total a pagar</h5>
                            <p className="card-text display-4 text-center mb-4">€{productPrice}</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-4">
                                    <label htmlFor="card-element" className="form-label">Detalles de la Tarjeta</label>
                                    <CardElement
                                        id="card-element"
                                        className="form-control"
                                        onChange={(event) => {
                                            setErrorMessage(event.error ? event.error.message : "");
                                            setCardComplete(event.complete);
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg btn-block"
                                    disabled={!stripe || loading || !cardComplete || errorMessage}
                                >
                                    {loading ? "Procesando..." : "Pagar"}
                                </button>
                                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Deseas confirmar la compra por €{productPrice}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
