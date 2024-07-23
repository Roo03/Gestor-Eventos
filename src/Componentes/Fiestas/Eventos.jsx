//---
import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Box,
  Card,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  CircularProgress
} from "@mui/material";
import { useMediaQuery } from "react-responsive";
import "mapbox-gl/dist/mapbox-gl.css"; // Importar los estilos de Mapbox
import Mapss from "../Mapss";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Navbar from '../NavHome/Navbar';

const Eventos = () => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    description: "",
    cost: "",
  });
  const [guests, setGuests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [marker, setMarker] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [invitados, setInvitados] = useState([]);
  const [invitadoSeleccionado, setInvitadoSeleccionado] = useState("");
  const [error, setError] = useState(null);
  const [idSeleccionado, setIdSeleccionado] = useState([]);
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 768 });
  const isSmallScreen = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });
  
 
const obtenerCoordenadasDesdeLocalStorage = async () => {
  try {
    const coordinates = localStorage.getItem('selectedLocation');
    if (coordinates) {
      const { latitude, longitude } = JSON.parse(coordinates);
      console.log("coordenadas desde Eventos", { latitude, longitude });
      return { latitude, longitude };
    } else {
      return { latitude: null, longitude: null };
    }
  } catch (error) {
    console.error("Error al parsear las coordenadas desde localStorage:", error);
    return { latitude: null, longitude: null };
  }
};

  useEffect(() => {
    // Fetch invitados from API
    fetch("http://apieventos.somee.com/api/invitadoespecial")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Registros recibidos:", data); // Imprimir los datos en consola
        setInvitados(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error fetching invitados:", error);
        setError("No se pudieron cargar los invitados.");
        setCargando(false);
      });
  }, []);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleAddGuest = () => {
    if (invitadoSeleccionado) {
      const guest = invitados.find((inv) => inv.idInvitado === parseInt(invitadoSeleccionado));
      if (guest && !guests.some(g => g.idInvitado === guest.idInvitado)) {
        setGuests([...guests, guest]); // Agregar el objeto completo
        setIdSeleccionado([...idSeleccionado, guest.idInvitado]);
        console.log("ID del invitado agregado:", guest.idInvitado); // Imprimir el ID del invitado
        setInvitadoSeleccionado(""); // Resetear selección después de agregar
      }
    }
  };

  const handleRemoveGuest = (index) => {
    const removedGuest = guests[index];
    const newGuests = guests.filter((_, i) => i !== index);
    setGuests(newGuests);
    console.log("ID del invitado eliminado:", removedGuest.idInvitado); // Imprimir el ID del invitado eliminado
  };

const guardarEvento = async (objEvento) => {
  try {
    const token = localStorage.getItem("token"); // Recuperar el token de localStorage
    const response = await fetch("http://apieventos.somee.com/api/evento/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(objEvento),
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const result = await response.json();
    console.log("Evento guardado exitosamente:", result);
  } catch (error) {
    console.error("Error guardando el evento:", error);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const { latitude, longitude } = await obtenerCoordenadasDesdeLocalStorage();
    // Validación simple
    if (!event.name || !event.date || !event.time || !event.description) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }


  // Crear el objeto objEvento
  const objEvento = {



    nombreEvento: event.name,
    fechaEvento: event.date,
    horaEvento: `${event.time}:00`, 
    descripcionEvento: event.description,
    costoEvento: parseFloat(event.cost)|| 0,
    estadoEvento: "Activo",
    descripcionLugar: "Elegido por el usuario",
    latitud: latitude,
    longitud: longitude,
    invitadosEspeciales: idSeleccionado,
  };

  console.log("Objeto Evento:", objEvento);
  // Aquí podrías enviar objEvento a tu API o realizar alguna acción adicional
  guardarEvento(objEvento);
};

if (cargando) {
  return (
    <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Container>
  );
}

  return (
   <>
<Navbar/>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Evento
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Nombre"
                name="name"
                value={event.name}
                onChange={handleEventChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Fecha"
                name="date"
                type="date"
                value={event.date}
                onChange={handleEventChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Hora"
                name="time"
                type="time"
                value={event.time}
                onChange={handleEventChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Descripción"
                name="description"
                value={event.description}
                onChange={handleEventChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Costo"
                name="cost"
                type="number"
                value={event.cost}
                onChange={handleEventChange}
              />
              <Typography variant="h6" gutterBottom>
                Invitados {guests.length}
                <Button variant="outlined" onClick={() => setModalOpen(true)}>
                  <AddIcon />
                </Button>
              </Typography>
            </CardContent>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              onClick={handleSubmit}
            >
              Guardar Evento
            </Button>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Mapss />
        </Grid>
      </Grid>
      <Modal open={modalOpen} >
        <Box
          display="flex"
          flexDirection="column"
          padding={2}
          bgcolor="white"
          margin="auto"
          marginTop={4}
          width={300}
        >
          {cargando ? (
            <CircularProgress />
          ) : (
            <>
              <Select
                fullWidth
                margin="normal"
                value={invitadoSeleccionado}
                onChange={(e) => setInvitadoSeleccionado(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecciona un invitado
                </MenuItem>
                {error ? (
                  <MenuItem disabled>{error}</MenuItem>
                ) : (
                  invitados.length > 0 ? (
                    invitados.map((inv) => (
                      <MenuItem key={inv.idInvitado} value={inv.idInvitado}>
                        {inv.nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No hay registros</MenuItem>
                  )
                )}
              </Select>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddGuest}
                sx={{ mt: 1 }}
              >
                Agregar Invitado
              </Button>
              <Table size="small" sx={{ mt: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {guests.map((guest, index) => (
                    <TableRow key={index}>
                      <TableCell>{guest.nombre}</TableCell> {/* Muestra solo el nombre del invitado */}
                      <TableCell>
                        <IconButton
                          edge="end"
                          color="secondary"
                          onClick={() => handleRemoveGuest(index)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setModalOpen(false)}
            style={{ marginTop: "20px" }}
          >
            Salir
          </Button>
        </Box>
      </Modal>
    </Container>
    </>
  );
};

export default Eventos;
