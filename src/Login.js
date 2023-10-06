import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Navigate, useNavigate } from "react-router-dom";
import Toast, { successToast, errorToast } from "./Toaster";

import { createTheme, ThemeProvider } from "@mui/material/styles";

function isValidEmail(email) {
  // Basic email validation regex
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_mail: "",
    user_password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    // Check if the field previously had an error and is now valid
    if (newErrors[name]) {
      if (name === "user_mail" && isValidEmail(value)) {
        newErrors[name] = ""; // Clear the error for this field by setting it to an empty string
      }
    } else {
      // Check for email
      if (name === "user_mail") {
        if (value.trim() === "") {
          newErrors[name] = "Valid email is required";
        } else if (!isValidEmail(value)) {
          newErrors[name] = "Invalid email format";
        }
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.user_mail.trim() === "" || !isValidEmail(formData.user_mail)) {
      newErrors.user_mail = "Valid email is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3002/login",
          formData
        );

        if (response.status === 200) {
          const response_data = response.data;
          if (response_data) {
            localStorage.setItem("user_id", response_data.user_id);
            localStorage.setItem("user_name", response_data.user_name);
            localStorage.setItem("accessToken", response_data.accessToken);

            successToast(`Welcome back ${response_data.user_name}`);
            setTimeout(() => navigate("/mainPage"), 1000);
          }
        } else {
          errorToast("A server error happened.");
        }
      } catch (error) {
        if (error.response.status === 401) {
          errorToast("Invalid credentials!");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toast />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>organics</Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="user_mail"
              value={formData.user_mail}
              onChange={handleChange}
              autoComplete="email"
              error={!!errors.user_mail}
              helperText={errors.user_mail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="user_password"
              label="Password"
              type="password"
              id="password"
              value={formData.user_password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
