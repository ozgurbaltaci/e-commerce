import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { div } from "@material-ui/core";
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
import HandyGreenLogo from "./HandyGreenLogo";

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
      <div
        style={{
          display: "flex",
          overflow: "hidden",
          padding: "10px 0px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <HandyGreenLogo></HandyGreenLogo>
        </div>
        {localStorage.getItem("isSeller") !== "true" ? (
          <>
            <div>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search for products or manufacturers"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                InputProps={{
                  style: {
                    height: 35,
                    minWidth: 370,
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
            </div>
            {authCtx.isLoggedIn ? (
              <div style={{ display: "flex", gap: "32px" }}>
                <div>
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
                </div>{" "}
                <div>
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
                </div>
                <div>
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
                </div>
              </div>
            ) : (
              <div>
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
              </div>
            )}
          </>
        ) : (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              authCtx.logout();
              navigate("/login");
            }}
          >
            Logout{" "}
          </div>
        )}
      </div>
      <Divider style={{ position: "absolute", right: 0, left: 0 }}></Divider>
    </div>
  );
};

export default NavBar;
