import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  TextField,
  Modal,
  Box,
  Card,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useMediaQuery } from "react-responsive";
import "mapbox-gl/dist/mapbox-gl.css"; // Importar los estilos de Mapbox
import Mapss from "../Mapss";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Navbar from '../NavHome/Navbar';
import { useParams } from "react-router-dom";

const EventosEditar = () => {
  const { id } = useParams();
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
  const [invitadoRecibido, setInvitadoRecibido] = useState("");
  const [error, setError] = useState(null);
  const [idSeleccionado, setIdSeleccionado] = useState([]); // Inicializado como arreglo
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const [invitadoSeleccionado, setInvitadoSeleccionado] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 768 });
  const isSmallScreen = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  const obtenerCoordenadasDesdeLocalStorage = async () => {
    try {
      const coordinates = localStorage.getItem('selectedLocation');
      if (coordinates) {
        const { latitude, longitude } = JSON.parse(coordinates);
        console.log("coordenadas desde EventosEditar", { latitude, longitude });
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
        console.log("invitados especiales recibidos:", data); // Imprimir los datos en consola
        setInvitados(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error fetching invitados:", error);
        setError("No se pudieron cargar los invitados.");
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    // Obtener el ID del evento desde el localStorage
    const eventId = 21//localStorage.getItem('selectedEventId');

    if (eventId) {
      // Fetch event details by ID from API
      fetch('http://apieventos.somee.com/api/evento?IdEvento=${eventId}')
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const eventData = data.find(event => event.idEvento === parseInt(eventId));
          if (eventData) {
            setEvent({
              name: eventData.nombreEvento,
              date: eventData.fechaEvento,
              time: eventData.horaEvento,
              description: eventData.descripcionEvento,
              cost: eventData.costoEvento,
            });
            setInvitadoRecibido(eventData.invitadosEspeciales);
            setLatitud(eventData.latitud);
            setLongitud(eventData.longitud);
            setIdSeleccionado(eventData.invitadosEspeciales.map(invitado => invitado.idInvitado));

            console.log("Datos del evento:", eventData); // Imprimir los datos del evento en consola
          }
        })
        .catch((error) => {
          console.error("Error fetching event details:", error);
        });
    } else {
      console.error("No se encontró el ID del evento en localStorage.");
    }
  }, []);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Implement submit logic here
  };

  const handleSelectChange = (event) => {
    setInvitadoSeleccionado(event.target.value);
  };

  const handleAddGuest = () => {
    if (invitadoSeleccionado && Array.isArray(idSeleccionado) && !idSeleccionado.includes(invitadoSeleccionado)) {
      setIdSeleccionado((prevSelected) => [...prevSelected, invitadoSeleccionado]);
    }
  };

  const handleRemoveGuest = (id) => {
    if (Array.isArray(idSeleccionado)) {
      setIdSeleccionado((prevSelected) => prevSelected.filter((guestId) => guestId !== id));
    }
  };

  return (
    <>
      <Navbar />
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
                  Invitados {Array.isArray(idSeleccionado) ? idSeleccionado.length : 0}
                  <Container>
                  <Button sx={buttonMas} variant="outlined" onClick={() => setModalOpen(true)} >
                    <AddIcon/>
                  </Button>
                  </Container>
                </Typography>
              </CardContent>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Guardar
              </Button>
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Mapss latitud={latitud} longitud={longitud} />
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Seleccionar Invitados
          </Typography>
          {cargando ? (
            <CircularProgress />
          ) : (
            <>
              <Select
                fullWidth
                margin="normal"
                value={invitadoSeleccionado}
                onChange={handleSelectChange}
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
              >
                Agregar Invitado
              </Button>
              <Typography variant="h6" margin="normal">
                Invitados Seleccionados
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(idSeleccionado) &&
                    invitados
                      .filter((invitado) => idSeleccionado.includes(invitado.idInvitado))
                      .map((invitado) => (
                        <TableRow key={invitado.idInvitado}>
                          <TableCell>{invitado.nombre}</TableCell>
                          <TableCell align="right">
                            <IconButton onClick={() => handleRemoveGuest(invitado.idInvitado)}>
                              <RemoveIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </>
          )}
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const buttonMas = {
  position: "absolute",
  width: "600px",
 marginLeft:"50px"
};

export default EventosEditar;