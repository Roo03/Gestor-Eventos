import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link as MuiLink,
  Modal,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { mainContainer, loginContainer } from "./LoginStyles";

function Login() {
//   const auth = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
//   const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState("");

//   const validateEmail = (email) => {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     let valid = true;

//     if (!validateEmail(email)) {
//       setEmailError("Email inválido");
//       valid = false;
//     } else {
//       setEmailError("");
//     }

//     if (password.length < 6) {
//       setPasswordError("La contraseña debe tener al menos 6 caracteres");
//       valid = false;
//     } else {
//       setPasswordError("");
//     }

//     if (valid) {
//       try {
//         await auth.login(email, password);
//         setShowLoginModal(true);
//       } catch (error) {
//         console.error("Error logging in:", error);
//         setLoginError("Email o contraseña incorrectos");
//       }
//     }
//   };

//   const handleGoogle = async (e) => {
//     e.preventDefault();
//     try {
//       await auth.loginWithGoogle();
//       setShowLoginModal(true);
//     } catch (error) {
//       console.error("Error logging in with Google:", error);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowLoginModal(false);
//   };

  return (
    <Box sx={mainContainer}>
      <Container sx={loginContainer}>
        <Container component="main" maxWidth="xs">
          <Box
            className="boxLogin"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#FFFFF",
            }}
          >
            <Typography component="h1" variant="h5">
              Agenda en linea
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Bienvenido al gestor de eventos 
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                // onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                // onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!passwordError}
                helperText={passwordError}
              />
              {loginError && (
                <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
                  {loginError}
                </Typography>
              )}
              <Button
                // onClick={(e) => handleLogin(e)}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              <Grid container>
              </Grid>
            </Box>
          </Box>
          <Modal
            // open={showLoginModal}
            // onClose={handleCloseModal}
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
                Sesión iniciada correctamente
              </Typography>
              <Typography id="login-modal-description" sx={{ mt: 2 }}>
                Has iniciado sesión exitosamente.
              </Typography>
              <Button
                // onClick={handleCloseModal}
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                component={RouterLink} to="/"
              >
                Continuar
              </Button>
            </Box>
          </Modal>
        </Container>
      </Container>
    </Box>
  );
}

export default Login;
