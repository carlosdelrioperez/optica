import './App.css';
import { Header } from './components/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Registro';
import { Home } from './components/home/Home';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
