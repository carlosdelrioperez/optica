import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { jwtDecode } from 'jwt-decode';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const PedirCita = () => {
    const [date, setDate] = useState(new Date());
    const [horasLibres, setHorasLibres] = useState([]);
    const [horaSeleccionada, setHoraSeleccionada] = useState(null);
    const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
    const [opticosLibres, setOpticosLibres] = useState([]);
    const [opticoSeleccionado, setOpticoSeleccionado] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [mostrarWarning, setmostrarWarning] = useState(false);
    const navigate = useNavigate();

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
    }, []);

    const onChange = (selectedDate) => {
        const currentDate = new Date();
        if (
            selectedDate.getFullYear() === currentDate.getFullYear() &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getDate() === currentDate.getDate()
        ) {
            setmostrarWarning(true);
            return;
        }
        setmostrarWarning(false);
        setDate(selectedDate);
        fetchHorasLibres(selectedDate);
    };


    const fetchHorasLibres = async (selectedDate) => {
        try {
            const tomorrow = new Date(selectedDate);
            if (selectedDate.getDate() !== new Date().getDate()) {
                tomorrow.setDate(selectedDate.getDate() + 1);
            }
            const formattedDate = tomorrow.toISOString().split('T')[0];
            const response = await fetch(`http://localhost:8080/api/horas/libres?dia=${formattedDate}`);
            if (!response.ok) {
                throw new Error('Error al obtener las horas libres');
            }
            const data = await response.json();
            setHorasLibres(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const chunkArray = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const minDate = new Date();

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const handleHoraSeleccionada = async (hora) => {
        setHoraSeleccionada(hora);
        setMostrarDesplegable(true);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        try {
            const response = await fetch(`http://localhost:8080/api/citas/opticoLibre?dia=${formattedDate}&horaRequest=${hora}`);
            if (!response.ok) {
                throw new Error('Error al obtener los opticos libres');
            }
            const data = await response.json();
            setOpticosLibres(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleConfirmarCita = async () => {
        try {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const horaId = await fetch(`http://localhost:8080/api/horas/horaId?horaRequest=${horaSeleccionada}`)
            const id = await horaId.text();
            const requestBody = {
                dia: formattedDate,
                hora: {
                    id: id
                },
                cliente: {
                    id: userInfo.id
                },
                optico: {
                    id: opticoSeleccionado
                }
            };
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            };
            const response = await fetch(`http://localhost:8080/api/citas`, requestOptions);
            if (!response.ok) {
                navigate('/');
            }
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <br />
                    <br />
                    <div>
                        <Calendar
                            onChange={onChange}
                            value={date}
                            minDate={minDate}
                            tileDisabled={({ date }) => isWeekend(date)}
                        />
                    </div>
                    <br></br>
                    {mostrarWarning && <p>No se puede seleccionar el día actual.</p>}
                </div>
                <div style={{ marginLeft: '20px' }}>
                    {chunkArray(horasLibres, 4).map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((hora, index) => (
                                <div key={index} className="col-md-3">
                                    <div
                                        className={`card ${hora === horaSeleccionada ? 'bg-primary text-white' : ''}`}
                                        style={{ width: '100px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        onClick={() => handleHoraSeleccionada(hora)}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">{hora}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            {mostrarDesplegable && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <br></br>
                    <br></br>
                    <br></br>
                    <span>Selecciona un óptico:</span>
                    <div style={{ padding: '2px' }}>
                        <select onChange={(e) => setOpticoSeleccionado(e.target.value)}>
                            <option value="">Selecciona un óptico</option>
                            {opticosLibres.map((optico, index) => (
                                <option key={index} value={optico.id}>{optico.nombre} {optico.apellidos}</option>
                            ))}
                        </select>
                    </div>
                    <Button variant="primary" onClick={handleConfirmarCita}>Confirmar cita</Button>
                </div>
            )}
        </div>
    );
};