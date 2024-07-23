import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import EventCard from './EventCard';
import Navbar from '../NavHome/Navbar';
import FiltroEvento from './FiltroEvento';
import Pagination from '@mui/material/Pagination';
import { gridContainer, paginationContainer } from './HomeStyles';

function HomeEventos() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://apieventos.somee.com/api/evento?PageSize=999', {
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
      console.error('No token found');
    }
  }, []);

  const handleFilterChange = (filter) => {
    if (filter === 'Mostrar todo') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.estadoEvento === filter));
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />
      <FiltroEvento onFilterChange={handleFilterChange} />
      <Box sx={gridContainer}>
        {paginatedEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </Box>
      <Box sx={paginationContainer}>
        <Pagination
          count={Math.ceil(filteredEvents.length / eventsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
}

export default HomeEventos;
