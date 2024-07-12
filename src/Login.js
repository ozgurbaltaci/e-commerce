import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Button from "@mui/material/Button";
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
import AuthContext from "./auth-context";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HandyGreenLogo from "./HandyGreenLogo";

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

export default function SignIn() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [formData, setFormData] = useState({
    user_mail: "",
    user_password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSellerLogin, setIsSellerLogin] = useState(false);

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

  const doUserLoginRequest = async () => {
    try {
      const response = await axios.post(
        "https://handygreen-back-end.vercel.app//login",
        formData
      );

      if (response.status === 200) {
        const response_data = response.data;
        if (response_data) {
          localStorage.setItem("user_id", response_data.user_id);
          localStorage.setItem("user_name", response_data.user_name);
          const expirationTime = new Date(
            response_data.accessTokenExpirationTime
          );

          authCtx.login(
            response_data.accessToken,
            expirationTime.toISOString(),
            response_data.user_id,
            null, //seller_id
            response_data.user_name
          );
          localStorage.setItem("user_surname", response_data.user_surname);
          localStorage.setItem("user_phone", response_data.user_phone);
          localStorage.setItem("user_mail", response_data.user_mail);

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
  };

  const doSellerLoginRequest = async () => {
    try {
      const response = await axios.post(
        "https://handygreen-back-end.vercel.app//sellerLogin",
        formData
      );

      if (response.status === 200) {
        const response_data = response.data;
        if (response_data) {
          const expirationTime = new Date(
            response_data.accessTokenExpirationTime
          );

          authCtx.login(
            response_data.accessToken,
            expirationTime.toISOString(),
            null, //user_id
            response_data.manufacturer_id,
            response_data.user_name
          );
          console.log("bakalim neymiş", response.data.manufacturer_id);
          localStorage.setItem("isSeller", true);
          localStorage.setItem(
            "seller_id",
            parseInt(response.data.manufacturer_id)
          );

          navigate(
            `/seller/${parseInt(response.data.manufacturer_id)}/mainPage`
          );
        }
      } else {
        errorToast("A server error happened.");
      }
    } catch (error) {
      if (error.response.status === 401) {
        errorToast("Invalid credentials!");
      }
    }
  };

  const doLoginRequest = () => {
    if (!isSellerLogin) {
      doUserLoginRequest();
    } else {
      doSellerLoginRequest();
    }
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
      doLoginRequest();
    }
  };

  return (
    <>
      <Toast />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "32px" }}>Login</div>
          <div
            style={{
              fontSize: "10px",
              display: "flex",
              gap: "6px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                fontWeight: !isSellerLogin && "bold",
                color: !isSellerLogin && "#2FB009",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsSellerLogin(false);
              }}
            >
              User
            </div>
            <div
              style={{
                fontWeight: isSellerLogin && "bold",
                color: isSellerLogin && "#2FB009",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsSellerLogin(true);
              }}
            >
              Seller
            </div>
          </div>

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
              size="small"
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
              size="small"
              name="user_password"
              label="Password"
              type="password"
              id="password"
              value={formData.user_password}
              onChange={handleChange}
              autoComplete="current-password"
            />

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
              Sign In
            </Button>
            <Grid
              container
              sx={{
                ".MuiTypography-root": {
                  fontFamily: "Cabin",
                },
              }}
            >
              <Grid item xs>
                <Link href="#" variant="body2" style={{ fontStyle: "Cabin" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href={!isSellerLogin ? "/register" : "/sellerRegister"}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
