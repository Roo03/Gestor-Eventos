import React, { useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { navbarStyles, toolbarStyles, buttonStyles, titleStyles, drawerStyles, drawerPaperStyles } from './NavbarStyles';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("expiration");

    // Redirigir a la página de inicio de sesión
    navigate("/");

    handleClose();
  };

  const menuItems = [
    { text: 'Eventos Activos', to: '/Home' },
    { text: 'Eventos Nuevos', to: '/Eventos' },
    { text: 'Calendario', to: '/Calendario' }
  ];

  return (
    <>
      <AppBar position="static" sx={navbarStyles}>
        <Toolbar sx={toolbarStyles}>
          <Typography variant="h6" component="div" sx={titleStyles}>
            Agenda para eventos
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                component={Link}
                to={item.to}
                sx={buttonStyles}
              >
                {item.text}
              </Button>
            ))}
            <IconButton
              color="inherit"
              onClick={handleMenu}
              sx={buttonStyles}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/" onClick={handleLogout} >Cerrar Sesión</MenuItem>
            </Menu>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={drawerStyles}
        PaperProps={{ sx: drawerPaperStyles }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem button component={Link} to={item.to} key={index}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <Divider />
            <ListItem button component={Link} to="/" onClick={handleLogout}>
              <AccountCircleIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
