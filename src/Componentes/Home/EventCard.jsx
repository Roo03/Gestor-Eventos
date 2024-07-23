  import React from 'react';
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';
  import CardMedia from '@mui/material/CardMedia';
  import Typography from '@mui/material/Typography';
  import Button from '@mui/material/Button';
  import CardActions from '@mui/material/CardActions';
  import { cardStyles, mediaStyles, cardContentStyles, cardActionsStyles } from './HomeStyles';
  import { Link, useNavigate } from 'react-router-dom';

  function EventCard({ event }) {
    const navigate = useNavigate();

    const handleViewDetails = () => {
      navigate(`/detalles/${event.idEvento}`);
    };

    const handleEditEvent = () => {
      navigate(`/GestionEvento`, { state: { event } });
    };    

    return (
      <Card sx={cardStyles}>
      <CardMedia
        component="img"
        alt={event.nombreEvento}
        height="140"
        image={'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} // Ensure this URL is correct and accessible
        sx={mediaStyles}
      />
        <CardContent sx={cardContentStyles}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
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
        </CardContent>
        <CardActions sx={cardActionsStyles}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            component={Link}
            onClick={handleViewDetails}
            to={`/detalles/${event.idEvento}`}
          >
            Más detalles
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            onClick={handleEditEvent}
          >
            Editar evento
          </Button>
        </CardActions>
      </Card>
    );
  }

  export default EventCard;
