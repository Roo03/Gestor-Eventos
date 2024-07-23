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
import { ContainerDetails, EventBox } from './GestionStyles';
import Navbar from '../NavHome/Navbar';
import Cookies from 'js-cookie';

function DetallesEvento() {
  const { idEvento } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);
  const user = JSON.parse(Cookies.get('user'));

  useEffect(() => {
    if (idEvento) {
      fetch(`http://apieventos.somee.com/api/evento?idEvento=${idEvento}`)
        .then(response => response.json())
        .then(data => {
          setEventDetails(data[0]);
          if (data[0].usuarioRegistro) {
            setUsuariosRegistrados([data[0].usuarioRegistro]);
          }
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [idEvento]);

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
              <Typography variant="body1">Lugar: {eventDetails.lugare.descripcion}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h4">Usuarios registrados</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Correo Electrónico</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usuariosRegistrados.map((usuario) => (
                    <TableRow key={usuario.idUsuario}>
                      <TableCell>{usuario.nombre}</TableCell>
                      <TableCell>{usuario.correoElectronico}</TableCell>
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
