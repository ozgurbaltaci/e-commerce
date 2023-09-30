import Avatar from "@mui/material/Avatar";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import axios from "axios";

function isValidEmail(email) {
  // Basic email validation regex
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  if (phoneNumber === "") {
    return true; //Ignore "" caused by non-numeric character replacements.
  }
  console.log("phone:", phoneNumber);
  // Remove any non-digit characters from the phone number
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Check if the cleaned phone number matches the Turkish phone number pattern
  const phoneRegex = /^(05\d{9}|905\d{9}|5\d{9}|\+905\d{9})$/;
  return phoneRegex.test(cleanedPhoneNumber);
}

function isValidPassword(password) {
  // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_surname: "",
    user_mail: "",
    user_phone: "",
    user_role: "customer",
    user_password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    // Check if the field previously had an error and is now valid
    if (newErrors[name]) {
      if (
        (name === "user_mail" && isValidEmail(value)) ||
        (name === "user_phone" &&
          isValidPhoneNumber(value.replace(/\D/g, ""))) ||
        (name === "user_password" && isValidPassword(value)) ||
        (name === "user_name" && value.trim() !== "") || // Check for name
        (name === "user_surname" && value.trim() !== "") || // Check for surname
        (name === "confirm_password" && value === formData.user_password) // Check for confirmationPassword
      ) {
        newErrors[name] = ""; // Clear the error for this field by setting it to an empty string
      }
    } else {
      // Check for name
      if (name === "user_name" && value.trim() === "") {
        newErrors[name] = "First name is required";
      }

      // Check for surname
      if (name === "user_surname" && value.trim() === "") {
        newErrors[name] = "Last name is required";
      }

      // Check for email
      if (name === "user_mail") {
        if (value.trim() === "") {
          newErrors[name] = "Valid email is required";
        } else if (!isValidEmail(value)) {
          newErrors[name] = "Invalid email format";
        }
      }

      // Check for phone number
      if (name === "user_phone") {
        if (value.trim() === "") {
          newErrors[name] = "Valid Turkish phone number is required";
        } else if (!isValidPhoneNumber(value.replace(/\D/g, ""))) {
          newErrors[name] = "Invalid phone number format";
        }
      }
    }

    // Check for password
    if (name === "user_password") {
      if (formData.confirm_password !== "") {
        if (value !== formData.confirm_password) {
          newErrors.confirm_password = "Password confirmation does not match";
        } else {
          newErrors.confirm_password = "";
        }
      }

      if (value.trim() === "") {
        newErrors[name] = "Password is required";
      } else if (!isValidPassword(value)) {
        newErrors[name] =
          "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter and one digit.";
      }
    }

    // Check for password confirmation
    if (name === "confirm_password" && value !== formData.user_password) {
      newErrors[name] = "Password confirmation does not match";
    }

    setErrors(newErrors);
    {
      name === "user_phone"
        ? setFormData({ ...formData, user_phone: value.replace(/\D/g, "") })
        : setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.user_name.trim() === "") {
      newErrors.user_name = "First name is required";
    }

    if (formData.user_surname.trim() === "") {
      newErrors.user_surname = "Last name is required";
    }

    if (formData.user_mail.trim() === "" || !isValidEmail(formData.user_mail)) {
      newErrors.user_mail = "Valid email is required";
    }

    if (
      formData.user_phone.trim() === "" ||
      !isValidPhoneNumber(formData.user_phone)
    ) {
      newErrors.user_phone = "Valid Turkish phone number is required";
    }

    if (
      formData.user_password.trim() === "" ||
      !isValidPassword(formData.user_password)
    ) {
      newErrors.user_password =
        "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    if (formData.user_password !== formData.confirm_password) {
      newErrors.confirm_password = "Password confirmation does not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3002/register",
          formData
        );
        if (response.status === 201) {
          alert("Registration is successfull.");
        } else {
          alert("A server error happened.");
        }

        console.log(response.data); // Show or process the successful registration message from the API
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>some avatar</Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="user_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.user_name}
                  onChange={handleChange}
                  autoFocus
                  error={!!errors.user_name}
                  helperText={errors.user_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="user_surname"
                  value={formData.user_surname}
                  onChange={handleChange}
                  autoComplete="family-name"
                  error={!!errors.user_surname}
                  helperText={errors.user_surname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="user_phone"
                  value={formData.user_phone}
                  onChange={handleChange}
                  inputProps={{
                    inputMode: "numeric", // Ensure numeric keyboard on mobile
                    pattern: "[0-9]*", // Only allow numeric input
                  }}
                  error={!!errors.user_phone}
                  helperText={errors.user_phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.user_password}
                  onChange={handleChange}
                  error={!!errors.user_password}
                  helperText={errors.user_password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  error={!!errors.confirm_password}
                  helperText={errors.confirm_password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
