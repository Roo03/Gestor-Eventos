import './App.css';
import Login from './Componentes/Login/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import Register from './Componentes/RegistroEvento/Register';
import Navbar from './Componentes/NavHome/Navbar';
import HomeEventos from './Componentes/Home/HomeEventos';
import EventCard from './Componentes/Home/EventCard';
import EventoGestion from './Componentes/Gestion de eventos/EventoGestion';
import FiltroEvento from './Componentes/Home/FiltroEvento';
import Cookies from 'js-cookie';
import DetallesEvento from './Componentes/Gestion de eventos/DetallesEvento';

function App() {
  const token = Cookies.get('token');

  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Home" element={token ? <HomeEventos /> : <Navigate to="/" />} />
        <Route path="/EventCard" element={<EventCard />} />
        <Route path="/EventGestion" element={<EventoGestion />} />
        <Route path="/Filtros" element={<FiltroEvento />} />
        <Route path="/detalles/:idEvento" element={<DetallesEvento />} />
      </Routes>
    </main>
  );
}

export default App;
