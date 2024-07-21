import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import EventCard from './EventCard';
import { gridContainer } from './HomeStyles';
import Navbar from '../NavHome/Navbar';
import FiltroEvento from './FiltroEvento';
import Cookies from 'js-cookie';

function HomeEventos() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const userData = Cookies.get('user');
    
    if (token && userData) {
      // Set user data from cookie
      setUser(JSON.parse(userData));
      
      // Fetch events
      fetch('http://apieventos.somee.com/api/evento', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setEvents(data);
          setFilteredEvents(data);
        })
        .catch(error => console.error('Error fetching events:', error));
    } else {
      console.error('No token or user data found');
    }
  }, []);

  const handleFilterChange = (filter) => {
    if (filter === 'Mostrar todo') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.estadoEvento === filter));
    }
  };

  return (
    <>
      <Navbar />
      <FiltroEvento onFilterChange={handleFilterChange} />
      <Box sx={gridContainer}>
        {filteredEvents.map((event, index) => (
          <EventCard key={index} event={event} user={user} />
        ))}
      </Box>
    </>
  );
}

export default HomeEventos;
