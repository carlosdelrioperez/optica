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
import { PerfilOptico } from './components/perfil/PerfilOptico';
import { OpticoNuevo } from './components/perfil/OpticoNuevo';


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
      </Routes>
      <br></br>
      <br></br>
      <Footer />
    </Router>
  );
}

export default App;
