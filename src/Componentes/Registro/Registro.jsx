import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Link as MuiLink, Modal } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { mainContainer, loginContainer, boxLogin, titleStyle, subtitleStyle, loginButton, errorMessage } from "./RegistroStyles";

function Register() {
  const [firstNameRegister, setFirstNameRegister] = useState("");
  const [lastNameRegister, setLastNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(emailRegister)) {
      setEmailError("Email inválido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (passwordRegister.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        const response = await fetch('http://apieventos.somee.com/api/usuario/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: firstNameRegister,
            apellido: lastNameRegister,
            correoElectronico: emailRegister,
            contraseña: passwordRegister
          }),
        });

        // Lee la respuesta solo una vez
        const responseData = await response.json();

        if (response.ok) {
          setShowLoginModal(true);
        } else {
          // Maneja el error del servidor aquí
          setErrorMessage("Error al registrar usuario: " + (responseData.message || "Error desconocido"));
        }
      } catch (error) {
        console.error("Error en la solicitud:", error); // Depura el error en la solicitud
        setErrorMessage("Error al registrar usuario: " + error.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };

  return (
    <Box sx={mainContainer}>
      <Container sx={loginContainer}>
        <Container component="main" maxWidth="xs">
          <Box className="boxLogin" sx={boxLogin}>
            <Typography component="h1" variant="h5" sx={titleStyle}>
              Agenda para agendar
            </Typography>
            <Typography variant="body2" sx={subtitleStyle}>
              Regístrate en nuestra agenda de eventos
            </Typography>
            <Box id="signup-form" component="form" noValidate sx={{ mt: 1 }} className="loginBox">
              <TextField
                onChange={(e) => setFirstNameRegister(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                name="firstName"
                autoComplete="given-name"
                className="loginInput"
              />
              <TextField
                onChange={(e) => setLastNameRegister(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="family-name"
                className="loginInput"
              />
              <TextField
                onChange={(e) => setEmailRegister(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                className="loginInput"
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                onChange={(e) => setPasswordRegister(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                className="loginInput"
                error={!!passwordError}
                helperText={passwordError}
              />
              <Button
                onClick={(e) => handleRegister(e)}
                type="submit"
                fullWidth
                variant="contained"
                sx={loginButton}
                className="loginButton"
              >
                Terminar registro
              </Button>
              {errorMessage && (
                <Typography color="error" variant="body2" sx={errorMessage}>
                  {errorMessage}
                </Typography>
              )}
              <Grid container>
                <Grid item>
                  <MuiLink component={RouterLink} to="/" variant="body2">
                    {'¿Ya tienes una cuenta? Iniciar sesión'}
                  </MuiLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Container>

      <Modal open={showLoginModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Registro exitoso</Typography>
          <Typography variant="body2">¡Tu cuenta ha sido creada exitosamente!</Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Ir al inicio de sesión
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Register;
