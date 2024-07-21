import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ContainerDetails, EventBox, RegistrationButton, RegistrationTable } from './GestionStyles';
import Navbar from '../NavHome/Navbar';
import Cookies from 'js-cookie';

function DetallesEvento() {
  const { idEvento } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(Cookies.get('user'));

  useEffect(() => {
    if (idEvento) {
      fetch(`http://apieventos.somee.com/api/evento?idEvento=${idEvento}`)
        .then(response => response.json())
        .then(data => {
          setEventDetails(data[0]);
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));

      fetch(`http://apieventos.somee.com/api/registrations?idEvento=${idEvento}`)
        .then(response => response.json())
        .then(data => setRegistrations(data))
        .catch(error => console.error('Error fetching registrations:', error));
    }
  }, [idEvento]);

  const handleRegister = () => {
    if (user && !registrations.some(reg => reg.email === user.email)) {
      const now = new Date();
      const newRegistration = {
        id: registrations.length + 1,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        fechaRegistro: now.toLocaleDateString(),
        horaRegistro: now.toLocaleTimeString(),
      };

      setRegistrations([...registrations, newRegistration]);

      fetch('http://apieventos.somee.com/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRegistration),
      }).catch(error => console.error('Error saving registration:', error));
    }
  };

  if (loading) {
    return <Typography variant="h6">Cargando detalles del evento...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Navbar />
      <Container sx={ContainerDetails}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={EventBox}>
              <Typography variant="h4">{eventDetails.nombreEvento}</Typography>
              <Typography variant="h6">Estado: {eventDetails.estadoEvento}</Typography>
              <Typography variant="body1">Fecha: {eventDetails.fechaEvento}</Typography>
              <Typography variant="body1">Hora: {eventDetails.horaEvento}</Typography>
              <Typography variant="body1">Lugar: {eventDetails.lugar}</Typography>
              <Button variant="contained" sx={RegistrationButton} onClick={handleRegister}>
                Registrarse
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h4">Usuarios registrados</Typography>
            <TableContainer component={Paper} sx={RegistrationTable}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Fecha de Registro</TableCell>
                    <TableCell>Hora de Registro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {registrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell>{registration.nombre}</TableCell>
                      <TableCell>{registration.apellido}</TableCell>
                      <TableCell>{registration.email}</TableCell>
                      <TableCell>{registration.fechaRegistro}</TableCell>
                      <TableCell>{registration.horaRegistro}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DetallesEvento;
