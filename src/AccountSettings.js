import React, { useEffect, useState } from "react";
import { Card, Divider, TextField, Grid, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "./AccountSettings.css";
import axios from "axios";

const AccountSettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);

  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState(false);

  const [currentUser, setCurrentUser] = useState({
    user_name: "",
    user_surname: "",
    user_mail: "",
    user_phone: "",
    user_birth_date: "",
    day: "",
    month: "",
    year: "",
  });
  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () =>
    setShowConfirmNewPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function formatDateWithoutTimezone(dateStr) {
    const date = new Date(dateStr);

    // Get the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0 indexed
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as desired

    return { day: day, month: month, year: year };
  }
  useEffect(() => {
    axios
      .get(
        `http://localhost:3002/getCurrentUser/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then((response) => {
        if (response.data) {
          var birthDate = response.data.user_birth_date
            ? formatDateWithoutTimezone(response.data.user_birth_date)
            : "";
          setCurrentUser((prevUser) => ({
            ...prevUser,
            ...response.data,
            // Parsing user_birth_date and setting day, month, year
            day: birthDate.day,

            month: birthDate.month,
            year: birthDate.year,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="accountSettings">
      {console.log(currentUser)}
      <Card
        style={{
          width: "100%",
          display: "flex",
          height: "100%",
          padding: "15px 0px",
        }}
      >
        <div
          className="personal_information"
          style={{
            fontSize: "10px",
            width: "50%",
            padding: "0px 15px",
          }}
        >
          <div>
            <div
              style={{
                color: "#2FB009",
                fontSize: "16px",
                fontWeight: "bold",

                marginBottom: "20px",
              }}
            >
              Personal Information
            </div>

            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <div style={{ fontWeight: "bold" }}>Name</div>
                    <TextField
                      variant="outlined"
                      name="user_name"
                      value={currentUser.user_name}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        style: {
                          height: "40px",
                          fontSize: "10px",
                          width: "100%",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <div style={{ fontWeight: "bold" }}>Surname</div>
                    <TextField
                      variant="outlined"
                      name="user_surname"
                      value={currentUser.user_surname}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        style: {
                          height: "40px",
                          fontSize: "10px",
                          width: "100%",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div style={{ fontWeight: "bold" }}>E-mail</div>
                    <TextField
                      variant="outlined"
                      name="user_mail"
                      value={currentUser.user_mail}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        style: {
                          height: "40px",
                          fontSize: "10px",
                          width: "100%",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div style={{ fontWeight: "bold" }}>Phone Number</div>
                    <TextField
                      variant="outlined"
                      name="user_phone"
                      value={currentUser.user_phone}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        style: {
                          height: "40px",
                          fontSize: "10px",
                          width: "100%",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container spacing={1}>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <div style={{ fontWeight: "bold" }}>Birth Day</div>
                    <TextField
                      variant="outlined"
                      name="day"
                      value={currentUser.day}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        style: {
                          height: "40px",
                          fontSize: "10px",
                          width: "100%",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <div style={{ fontWeight: "bold" }}>Birth Month</div>
                    <TextField
                      variant="outlined"
                      name="month"
                      value={currentUser.month}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        style: {
                          height: "40px",
                          fontSize: "10px",
                          width: "100%",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <div style={{ fontWeight: "bold" }}>Birth Year</div>
                    <TextField
                      variant="outlined"
                      name="year"
                      value={currentUser.year}
                      onChange={handleInputChange}
                      fullWidth
                      InputProps={{
                        style: {
                          height: "40px",
                          fontSize: "10px",
                          width: "100%",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <button
                    style={{
                      width: "100%",
                      height: "32px",
                      marginRight: "10px",

                      backgroundColor: "#2FB009",
                      borderRadius: "3px",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "12px",
                      fontFamily: "Cabin",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {"SAVE CHANGES"}
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
        <Divider orientation="vertical" style={{ height: "100%" }}></Divider>
        <div
          className="change_password"
          style={{
            width: "50%",
            height: "100%",
            padding: "0px 15px",
            fontSize: "10px",
          }}
        >
          <div>
            <div
              style={{
                color: "#2FB009",
                fontSize: "16px",
                fontWeight: "bold",

                marginBottom: "20px",
              }}
            >
              Change Password
            </div>

            <Grid container spacing={1} direction={"column"}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div style={{ fontWeight: "bold" }}>Current Password</div>
                <OutlinedInput
                  style={{ height: "40px", fontSize: "10px" }}
                  type={showCurrentPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end" style={{ zIndex: 1 }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCurrentPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <VisibilityOff style={{ fontSize: "14px" }} />
                        ) : (
                          <Visibility style={{ fontSize: "14px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div style={{ fontWeight: "bold" }}>New Password</div>
                <OutlinedInput
                  style={{ height: "40px", fontSize: "10px" }}
                  type={showNewPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end" style={{ zIndex: 1 }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? (
                          <VisibilityOff style={{ fontSize: "14px" }} />
                        ) : (
                          <Visibility style={{ fontSize: "14px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div style={{ fontWeight: "bold" }}>Confirm New Password</div>
                <OutlinedInput
                  style={{ height: "40px", fontSize: "10px" }}
                  type={showConfirmNewPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end" style={{ zIndex: 1 }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmNewPassword ? (
                          <VisibilityOff style={{ fontSize: "14px" }} />
                        ) : (
                          <Visibility style={{ fontSize: "14px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <button
                  style={{
                    width: "100%",
                    height: "32px",
                    marginRight: "10px",

                    backgroundColor: "#2FB009",
                    borderRadius: "3px",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "12px",
                    fontFamily: "Cabin",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {"CHANGE PASSWORD"}
                </button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountSettings;
