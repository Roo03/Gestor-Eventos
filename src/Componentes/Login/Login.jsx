import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mainContainer, loginContainer, boxLogin, titleStyle, subtitleStyle, loginButton, errorMessage } from "./LoginStyles";
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;
  
    if (!validateEmail(email)) {
      setEmailError("Email inválido");
      valid = false;
    } else {
      setEmailError("");
    }
  
    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }
  
    if (valid) {
      try {
        const loginData = {
          CorreoElectronico: email,
          Contraseña: password,
        };
  
        console.log("Sending login data:", loginData);
  
        const response = await fetch("http://apieventos.somee.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Response status:", response.status);
          console.log("Token:", data.token);
          console.log("Expiration:", data.expiration);
          
          // Guarda solo el token en localStorage
          localStorage.setItem('token', data.token);

          // Redirige a la ruta /home
          navigate('/Home');
        } else {
          const errorData = await response.json();
          setLoginError(errorData.message || "Error de autenticación");
        }
      } catch (error) {
        console.error("Error during login request:", error);
        setLoginError("Error interno del servidor. Inténtalo más tarde.");
      }
    }
  };

  return (
    <Box sx={mainContainer}>
      <Container sx={loginContainer}>
        <Container component="main" maxWidth="xs">
          <Box className="boxLogin" sx={boxLogin}>
            <Typography component="h1" variant="h5" sx={titleStyle}>
              Agenda en linea
            </Typography>
            <Typography variant="body2" sx={subtitleStyle}>
              Bienvenido al gestor de eventos
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                <Typography variant="body2" color="error" align="center" sx={errorMessage}>
                  {loginError}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={loginButton}
              >
                Iniciar sesión
              </Button>
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Button
                  component={Link}
                  to="/Register"
                  variant="text"
                  color="primary"
                >
                  ¿No tienes cuenta? Regístrate aquí
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Container>
    </Box>
  );
}

export default Login;
