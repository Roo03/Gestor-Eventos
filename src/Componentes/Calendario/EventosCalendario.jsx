import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Asegúrate de incluir el CSS
import { Container, Typography, Paper, Box, List, ListItem } from '@mui/material';
import Navbar from '../NavHome/Navbar';

const EventosCalendario = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEvents, setShowEvents] = useState([]);

  // Fetch eventos desde la API
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://apieventos.somee.com/api/evento?PageSize=999');
      const data = await response.json();
      setEvents(data);
      console.log("eventos recibidos", data)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filtrar eventos por fecha seleccionada
  useEffect(() => {
   
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Convertir a formato yyyy-mm-dd
    console.log("Fecha seleccionada en el componente calendario:", formattedDate);
    const filteredEvents = events.filter(event => event.fechaEvento === formattedDate);
    setShowEvents(filteredEvents);
  }, [selectedDate, events]);

  return (
    <>
    <Navbar/>
    <Container maxWidth="md">
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} p={2}>
        <Box flex={1}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              style={{ marginTop: '16px' }}
            />
          </Paper>
        </Box>
        <Box flex={2} paddingLeft={{ xs: 0, md: 2 }} paddingTop={{ xs: 2, md: 0 }}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Eventos del {selectedDate.toDateString()}
            </Typography>
            <List>
              {showEvents.length > 0 ? (
                showEvents.map(event => (
                  <ListItem key={event.idEvento}>
                    <Typography variant="body1">
                      <strong>{event.nombreEvento}</strong> - {event.horaEvento}
                    </Typography>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <Typography variant="body1">No hay eventos para esta fecha.</Typography>
                </ListItem>
              )}
            </List>
          </Paper>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default EventosCalendario;
