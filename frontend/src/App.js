import './App.css';
import { Header } from './components/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/Registro';
import { Home } from './components/home/Home';
import React, { useState } from 'react';
import Genero from './components/productos/Genero';
import { SearchResult } from './components/productos/SearchProduct';
import { Perfil } from './components/perfil/Perfil';
import { CambiarPefil } from './components/perfil/CambiarPefil';
import { Footer } from './components/Footer';
import { Producto } from './components/productos/Producto';
import { PerfilOptico } from './components/perfilOptico/PerfilOptico';
import { OpticoNuevo } from './components/perfilOptico/OpticoNuevo';
import { CitasOptico } from './components/perfilOptico/CitasOptico';
import { PedirCita } from './components/cita/PedirCita';
import { EditarOptico } from './components/perfilOptico/EditarOptico';
import { Cart } from './components/cart/Cart';
import { Checkout } from './components/cart/Checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { MisPedidos } from './components/perfil/MisPedidos';
import { Pedido } from './components/perfil/Pedido';
import { Revision } from './components/perfil/Revision';
import { PedidosOptico } from './components/perfilOptico/PedidosOptico';
import { Clientes } from './components/perfilOptico/Clientes';
import { RevisionClienteId } from './components/perfilOptico/RevisionClienteId';
import { RevisionOptico } from './components/perfilOptico/RevisionOptico';
import { Stock } from './components/perfilOptico/Stock';
import { PedidoOptico } from './components/perfilOptico/PedidoOptico';
import { NuevaRevision } from './components/perfilOptico/NuevaRevision';



const stripePromise = loadStripe('tu_clave_publica_de_stripe');

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/registro' element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/genero/:genero" element={<Genero />} />
        <Route path="/productos/search" element={<SearchResult />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/cambiarPefil' element={<CambiarPefil />} />
        <Route path='/producto/:id' element={<Producto />} />
        <Route path='/perfilOptico' element={<PerfilOptico />} />
        <Route path='/opticoNuevo' element={<OpticoNuevo setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/citasOptico' element={<CitasOptico />} />
        <Route path='/pedirCita' element={<PedirCita />} />
        <Route path='/editarOptico/:id' element={<EditarOptico />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
        } />
        <Route path='/misPedidos' element={<MisPedidos />} />
        <Route path='/pedido/:id' element={<Pedido />} />
        <Route path='/pedido/optico/:id' element={<PedidoOptico />} />
        <Route path='/pedidosOptico' element={<PedidosOptico />} />
        <Route path='/clientes' element={<Clientes />} />
        <Route path='/revision/:id' element={<Revision />} />
        <Route path='/revision/cliente/:id' element={<RevisionClienteId />} />
        <Route path='/revision/optico/:id' element={<RevisionOptico />} />
        <Route path='/stock' element={<Stock />} />
        <Route path='/nuevaRevision/:id' element={<NuevaRevision />} />
      </Routes>
      <br></br>
      <br></br>
      <Footer />
    </Router>
  );
}

export default App;
