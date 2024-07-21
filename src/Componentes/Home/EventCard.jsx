import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { cardStyles, mediaStyles, cardContentStyles, cardActionsStyles } from './HomeStyles';
import { Link } from 'react-router-dom';

function EventCard({ event, user }) {
  return (
    <Card sx={cardStyles}>
      <CardMedia
        component="img"
        alt={event.nombreEvento}
        height="140"
        image={event.imagen}
        sx={mediaStyles}
      />
      <CardContent sx={cardContentStyles}>
        <Typography gutterBottom variant="h6" component="div">
          {event.nombreEvento}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Estado: {event.estadoEvento}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Fecha: {event.fechaEvento}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Hora: {event.horaEvento}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Lugar: {event.lugar}
        </Typography>
      </CardContent>
      <CardActions sx={cardActionsStyles}>
        <Button size="small" color="primary" component={Link} to={`/detalles/${event.idEvento}`}>
          Más detalles
        </Button>
        {user?.esAdmin && (
          <Button size="small" color="primary" sx={{ marginLeft: 'auto' }}>
            Editar evento
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default EventCard;
