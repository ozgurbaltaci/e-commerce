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
import { Navigate, useNavigate } from "react-router-dom";
import Toast, { successToast, errorToast } from "./Toaster";
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

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    user_surname: "",
    user_mail: "",
    user_password: "",
    confirm_password: "",
    contact_person_full_name: "",
    contact_person_phone_number: "",
    manufacturer_description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    // Check if the field previously had an error and is now valid
    if (newErrors[name]) {
      if (
        (name === "user_mail" && isValidEmail(value)) ||
        (name === "contact_person_phone_number" &&
          isValidPhoneNumber(value.replace(/\D/g, ""))) ||
        (name === "user_password" && isValidPassword(value)) ||
        (name === "user_name" && value.trim() !== "") || // Check for name
        (name === "contact_person_full_name" && value.trim() !== "") || // Check for name
        (name === "user_surname" && value.trim() !== "") || // Check for surname
        (name === "confirm_password" && value === formData.user_password) // Check for confirmationPassword
      ) {
        newErrors[name] = ""; // Clear the error for this field by setting it to an empty string
      }
    } else {
      // Check for name
      if (name === "user_name" && value.trim() === "") {
        newErrors[name] = "Manufacturer name is required";
      }

      // Check for contact person name
      if (name === "contact_person_full_name" && value.trim() === "") {
        newErrors[name] = "Contact person's name is required";
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
      if (name === "contact_person_phone_number") {
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
      name === "contact_person_phone_number"
        ? setFormData({
            ...formData,
            contact_person_phone_number: value.replace(/\D/g, ""),
          })
        : setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.user_name.trim() === "") {
      newErrors.user_name = "First name is required";
    }
    if (formData.contact_person_full_name.trim() === "") {
      newErrors.contact_person_full_name = "Contact Person's name is required";
    }

    if (formData.user_mail.trim() === "" || !isValidEmail(formData.user_mail)) {
      newErrors.user_mail = "Valid email is required";
    }

    if (
      formData.contact_person_phone_number.trim() === "" ||
      !isValidPhoneNumber(formData.contact_person_phone_number)
    ) {
      newErrors.contact_person_phone_number =
        "Valid Turkish phone number is required";
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
          "http://localhost:3002/sellerRegister",
          formData
        );

        if (response.status === 201) {
          successToast("Registration is successfull.");
          setTimeout(() => navigate("/login"), 1000);
        } else {
          errorToast("A server error happened.");
        }
      } catch (error) {
        if (error.response.status === 409) {
          newErrors.user_mail = "Enter a new e-mail address";
          setErrors(newErrors);

          errorToast("This email is already registered");
        }
      }
    }
  };

  return (
    <div>
      <Toast />
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up as a Seller
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="user_name"
                  size="small"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  value={formData.user_name}
                  onChange={handleChange}
                  autoFocus
                  error={!!errors.user_name}
                  helperText={errors.user_name}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  size="small"
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
                  id="description"
                  size="small"
                  label="Store Description"
                  name="manufacturer_description"
                  value={formData.manufacturer_description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  name="contact_person_full_name"
                  size="small"
                  required
                  fullWidth
                  id="contactPersonFullName"
                  label="Contact PersonFull Name"
                  value={formData.contact_person_full_name}
                  onChange={handleChange}
                  autoFocus
                  error={!!errors.contact_person_full_name}
                  helperText={errors.contact_person_full_name}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  size="small"
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="contact_person_phone_number"
                  value={formData.contact_person_phone_number}
                  onChange={handleChange}
                  inputProps={{
                    inputMode: "numeric", // Ensure numeric keyboard on mobile
                    pattern: "[0-9]*", // Only allow numeric input
                  }}
                  error={!!errors.contact_person_phone_number}
                  helperText={errors.contact_person_phone_number}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
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
                  size="small"
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
              style={{ backgroundColor: "#2FB009", fontFamily: "Cabin" }}
              sx={{
                mt: 2,
                mb: 2,
              }}
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
