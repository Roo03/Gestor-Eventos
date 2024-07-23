import './App.css';
import Login from './Componentes/Login/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Componentes/NavHome/Navbar';
import HomeEventos from './Componentes/Home/HomeEventos';
import EventCard from './Componentes/Home/EventCard';
import EventoGestion from './Componentes/Gestion de eventos/EventoGestion';
import FiltroEvento from './Componentes/Home/FiltroEvento';
import DetallesEvento from './Componentes/Gestion de eventos/DetallesEvento';
import Eventos from './Componentes/Fiestas/Eventos';
import Register from './Componentes/Registro/Registro';
import EventosCalendario from './Componentes/Calendario/EventosCalendario';
import GestionEvento from './Componentes/Gestion de eventos/EventoGestion';

function App() {
  const token = localStorage.getItem('token');

  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Home" element={token ? <HomeEventos /> : <Navigate to="/" />} />
        <Route path="/Eventos" element={token ? <Eventos/>: <Navigate to="/" />}/>
        <Route path="/EventCard" element={<EventCard />} />
        <Route path="/GestionEvento" element={<EventoGestion />} />
        <Route path="/Filtros" element={<FiltroEvento />} />
        <Route path="/detalles/:idEvento" element={<DetallesEvento />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Calendario" element={ token ? <EventosCalendario/> : <Navigate to="/"/>}/>
      </Routes>
    </main>
  );
}

export default App;