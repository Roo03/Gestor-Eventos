import './App.css';
import Login from './Componentes/Login/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import Register from './Componentes/RegistroEvento/Register';

function App() {
  return (
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </main>
  );
}

export default App;
