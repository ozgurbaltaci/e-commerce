import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Navigate, useNavigate } from "react-router-dom";
import { Divider } from "@material-ui/core";
import AuthContext from "./auth-context";
import { useContext } from "react";
import LoginIcon from "@mui/icons-material/Login";

import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div
      className="navBar"
      style={{ marginBottom: "20px", overflow: "hidden" }}
    >
      <Grid
        container
        spacing={3}
        style={{
          height: "80px",
          overflow: "hidden",
          padding: "10px 0px",
        }}
        alignItems="center" // Set alignItems to "center" for vertical alignment
      >
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              color: "#2FB009",
              cursor: "pointer",
            }}
            onClick={() => navigate("/mainPage")}
          >
            HandyGreen
          </div>
        </Grid>
        <Grid item xs={12} sm={4} md={6} lg={6}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search for products or manufacturers"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              style: {
                height: 35,
                fontSize: "10px",
                color: "#555555",
                width: "90%",
              },
              endAdornment: (
                <SearchIcon
                  style={{ cursor: "pointer", fontSize: "16px" }}
                  onClick={handleSearch}
                />
              ),
            }}
          />
        </Grid>
        {authCtx.isLoggedIn ? (
          <>
            <Grid item xs={12} sm={1} md={1} lg={1}>
              <div
                style={{
                  textAlign: "right",
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/profile")}
              >
                <PersonOutlineOutlinedIcon
                  style={{ fontSize: "18px" }}
                ></PersonOutlineOutlinedIcon>
                Profile
              </div>
            </Grid>{" "}
            <Grid item xs={12} sm={1} md={1} lg={1}>
              <div
                style={{
                  textAlign: "right",
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/favorites")}
              >
                <FavoriteBorderOutlinedIcon
                  style={{ fontSize: "18px" }}
                ></FavoriteBorderOutlinedIcon>
                Favorites
              </div>
            </Grid>
            <Grid item xs={12} sm={1} md={1} lg={1}>
              <div
                style={{
                  textAlign: "right",
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/cart")}
              >
                <ShoppingCartOutlinedIcon
                  style={{ fontSize: "18px" }}
                ></ShoppingCartOutlinedIcon>
                Cart
              </div>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div
              style={{
                textAlign: "right",
                fontSize: "12px",
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              <LoginIcon style={{ fontSize: "18px" }}></LoginIcon>
              Login
            </div>
          </Grid>
        )}
      </Grid>
      <Divider style={{ position: "absolute", right: 0, left: 0 }}></Divider>
    </div>
  );
};

export default NavBar;
