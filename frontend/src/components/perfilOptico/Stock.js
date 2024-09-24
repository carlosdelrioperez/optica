import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Form, FormControl } from 'react-bootstrap';

export const Stock = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [productos, setProductos] = useState(null);
    const [originalProductos, setOriginalProductos] = useState(null); // Nueva variable para guardar el estado original
    const [searchTerm, setSearchTerm] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Decodificar el token para obtener el correo electrónico del usuario
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.sub;

            // Hacer la llamada al endpoint con el correo electrónico y el token
            fetch(`http://localhost:8080/api/opticos/findByEmail?email=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUserInfo(data); // Establece los datos del usuario en el estado
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });

            // Fetch de productos
            fetch(`http://localhost:8080/api/productos`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setProductos(data); // Establece los productos en el estado
                    setOriginalProductos(data); // Guarda el estado original de los productos
                })
                .catch(error => {
                    console.error('Error fetching productos:', error);
                });
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/productos/search?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                setProductos(data);
                setNoResults(data.length === 0); // Verificar si no se encontraron resultados
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);

        // Si no hay opción de ordenamiento seleccionada, restaurar productos originales
        if (e.target.value === '') {
            setProductos(originalProductos);
            return;
        }

        // De lo contrario, aplicar la lógica de ordenamiento
        let sortedProducts = [...productos];

        if (e.target.value === 'stockAscendente') {
            sortedProducts.sort((a, b) => a.stock - b.stock);
        } else if (e.target.value === 'stockDescendente') {
            sortedProducts.sort((a, b) => b.stock - a.stock);
        }

        setProductos(sortedProducts);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Columna izquierda*/}
            <div style={{
                borderRight: '1px solid black',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                width: '400px',
            }}>
                <br />
                <img src={userInfo && userInfo.foto ? userInfo.foto : "/images/fotoPerfil.webp"} alt="Avatar" style={{ width: '300px', height: '300px', borderRadius: '50%', marginBottom: '10px' }} />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <h3>{userInfo ? userInfo.nombre : "Nombre de Usuario"} {userInfo ? userInfo.apellidos : "Apellidos"}</h3>
                </div>
                <div style={{ marginTop: '100px' }}>
                    <Link to="/perfilOptico" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '13px' }}>Equipo</h5>
                    </Link>
                    <Link to="/citasOptico" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ textAlign: 'center', marginLeft: '-7px' }}>Citas</h5>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-5px' }}>
                        <IoIosArrowForward />
                        <h5>Producto</h5>
                    </div>
                    <Link to="/pedidosOptico" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '10px' }}>Pedidos</h5>
                    </Link>
                    <Link to="/clientes" style={{ textDecoration: 'none', color: 'black' }}>
                        <h5 style={{ marginLeft: '10px' }}>Clientes</h5>
                    </Link>
                </div>
            </div>
            {/* Columna derecha*/}
            <div style={{
                flex: '1',
                padding: '10px',
                overflowY: 'auto'
            }}>
                <Form onSubmit={handleSearch}>
                    <FormControl
                        type="search"
                        placeholder="Buscar"
                        className="mr-2"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form>
                <br></br>
                <select className="form-select-sm" value={sortOption} onChange={handleSortChange}>
                    <option value="">Stock</option>
                    <option value="stockAscendente">Menor a mayor</option>
                    <option value="stockDescendente">Mayor a menor</option>
                </select>
                <div className="row">
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
                    {productos && productos.map(producto => (
                        <div key={producto.id} className="col-md-4 mb-4">
                            <br />
                            {/* <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none' }}> */}
                            <div className="card">
                                <img src={producto.foto} className="card-img-top" alt={producto.nombre} />
                                <div className="card-body">
                                    <h5 className="card-title">{producto.nombre}</h5>
                                    <p className="card-text">Marca: {producto.marca}</p>
                                    <p className="card-text">Precio: {producto.precio}€</p>
                                    <p className="card-text">Stock: {producto.stock}</p>
                                </div>
                            </div>
                            {/* </Link> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
