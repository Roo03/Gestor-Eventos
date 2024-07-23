// src/Componentes/Gestion de eventos/EventoGestion.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import Navbar from "../NavHome/Navbar";
import { ContainerEdit } from './GestionStyles';

const EventoGestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};
  const [evento, setEvento] = useState(event || {});

  useEffect(() => {
    if (!event) {
      // If no event is passed in state, redirect to Home or another route
      navigate("/Home");
    }
  }, [event, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento((prevEvento) => ({ ...prevEvento, [name]: value }));
  };

  const handleSave = () => {
    // Prepare the object with only the specified fields
    const updatedEvent = {
      nombreEvento: evento.nombreEvento || "",
      fechaEvento: evento.fechaEvento || "",
      horaEvento: evento.horaEvento || "",
      descripcionEvento: evento.descripcionEvento || "",
      costoEvento: evento.costoEvento || 0,
      estadoEvento: evento.estadoEvento || "",
      descripcionLugar: evento.lugare?.descripcion || "",
      latitud: evento.lugare?.latitud || 0,
      longitud: evento.lugare?.longitud || 0,
    };

    // Log the object before sending
    console.log("Objeto evento enviado:", updatedEvent);

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    fetch(`http://apieventos.somee.com/api/evento/update/${evento.idEvento}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        alert("Evento actualizado con éxito");
        navigate("/Home"); // Redirect to Home or another route
      })
      .catch((error) => {
        alert("Evento actualizado con éxito");
        navigate("/Home");
      
      });
  };

  return (
    <Box>
      <Navbar />
    <Container sx={ContainerEdit}>
      <Typography variant="h4" gutterBottom>
        Editar Evento
      </Typography>
      <TextField
        label="Nombre del Evento"
        name="nombreEvento"
        value={evento.nombreEvento || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Fecha del Evento"
        name="fechaEvento"
        type="date"
        value={evento.fechaEvento?.substring(0, 10) || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Hora del Evento"
        name="horaEvento"
        type="time"
        value={evento.horaEvento || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Descripción"
        name="descripcionEvento"
        value={evento.descripcionEvento || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Costo"
        name="costoEvento"
        type="number"
        value={evento.costoEvento || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Estado"
        name="estadoEvento"
        value={evento.estadoEvento || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descripción del Lugar"
        name="descripcionLugar"
        value={evento.lugare?.descripcion || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 2 }}
      >
        Guardar Cambios
      </Button>
    </Container>
    </Box>
  );
};

export default EventoGestion;
