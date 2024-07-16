import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Link as MuiLink, Modal } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { mainContainer, imageContainer, RegisterContainer } from "./RegisterStyles";

function Register() {
//   const [emailRegister, setEmailRegister] = useState("");
//   const [passwordRegister, setPasswordRegister] = useState("");
//   const [firstNameRegister, setFirstNameRegister] = useState(""); 
//   const [lastNameRegister, setLastNameRegister] = useState(""); 
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const validateEmail = (email) => {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     let valid = true;

//     if (!validateEmail(emailRegister)) {
//       setEmailError("Email inválido");
//       valid = false;
//     } else {
//       setEmailError("");
//     }

//     if (passwordRegister.length < 6) {
//       setPasswordError("La contraseña debe tener al menos 6 caracteres");
//       valid = false;
//     } else {
//       setPasswordError("");
//     }

//     if (valid) {
//       try {
//         await auth.register(emailRegister, passwordRegister, firstNameRegister, lastNameRegister); 
//         setShowLoginModal(true);
//       } catch (error) {
//         console.error("Error registering user:", error);
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setShowLoginModal(false);
//   };

  return (
    <Container sx={mainContainer}>
      <Container sx={imageContainer}></Container>
      <Container sx={RegisterContainer}>
      <Container component="main" maxWidth="xs">
        <Box
          className="boxLogin"
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" className="loginLogo">
            Agenda para agendar
          </Typography>
          <Typography variant="body2" color="textSecondary" className="loginDesc">
            Registrate en nuestra agenda de eventos
          </Typography>
          <Box id="signup-form" component="form" noValidate sx={{ mt: 1 }} className="loginBox">
            <TextField
            //   onChange={(e) => setFirstNameRegister(e.target.value)} 
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
            //   onChange={(e) => setLastNameRegister(e.target.value)} 
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
            //   onChange={(e) => setEmailRegister(e.target.value)}
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
            //   onChange={(e) => setPasswordRegister(e.target.value)}
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
            //   onClick={(e) => handleRegister(e)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="loginButton"
            >
              Terminar registro
            </Button>
            <Grid container>
              <Grid item>
                <MuiLink component={RouterLink} to="/" variant="body2">
                  {'¿Ya tienes una cuenta? Iniciar sesión'}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Modal
        //   open={showLoginModal}
        //   onClose={handleCloseModal}
          aria-labelledby="login-modal-title"
          aria-describedby="login-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="login-modal-title" variant="h6" component="h2">
              Usuario registrado
            </Typography>
            <Typography id="login-modal-description" sx={{ mt: 2 }}>
              Tu cuenta ha sido registrada exitosamente.
            </Typography>
            <Button
            //   onClick={handleCloseModal}
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              component={RouterLink} to="/Login"
            >
              Continuar con inicio de sesión
            </Button>
          </Box>
        </Modal>
      </Container>
      </Container>
    </Container>
  );
}

export default Register;
