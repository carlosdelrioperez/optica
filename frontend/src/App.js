import './App.css';
import { Header } from './components/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Registro';
import { Home } from './components/home/Home';
import React, { useState } from 'react';
import Genero from './components/productos/Genero';
import { SearchResult } from './components/productos/SearchProduct';

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
      </Routes>
    </Router>
  );
}

export default App;
