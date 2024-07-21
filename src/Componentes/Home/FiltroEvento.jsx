import React, { useState } from 'react';
import { Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';

const FiltroEvento = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('Mostrar todo');

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <Box display="flex" justifyContent="center" marginLeft="1100px" my={2}>
      <FormControl variant="outlined">
        <InputLabel id="filter-label">Filtrar eventos</InputLabel>
        <Select
          labelId="filter-label"
          value={activeFilter}
          onChange={handleFilterChange}
          label="Filtrar Eventos"
        >
          <MenuItem value="Mostrar todo">Mostrar todo</MenuItem>
          <MenuItem value="Activo">Eventos Activos</MenuItem>
          <MenuItem value="Inactivo">Eventos Inactivos</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FiltroEvento;
