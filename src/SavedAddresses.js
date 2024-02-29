import React, { useEffect, useState } from "react";
import { Card, Divider, TextField, Grid, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "./AccountSettings.css";
import axios from "axios";
import Toast, { successToast, errorToast } from "./Toaster";

const SavedAddresses = () => {
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3002/getSavedAddressesOfUser/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then((response) => {
        if (response.data) {
          setSavedAddresses(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const renderSavedAddressesCard = (savedAddress) => {
    return (
      <Card style={{ width: "100%" }}>
        <div style={{ padding: "8px", fontSize: "11px" }}>
          <div style={{ fontWeight: "bold" }}>
            {savedAddress.address_title.toUpperCase()}
          </div>
        </div>
        <Divider></Divider>
        <div style={{ padding: "8px", fontSize: "10px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "2px" }}>
            {savedAddress.receiver_full_name}
          </div>
          <div style={{ marginBottom: "2px" }}>
            {" "}
            {savedAddress.neighborhood}
          </div>

          <div style={{ display: "flex", marginBottom: "2px" }}>
            {savedAddress.building_number} {savedAddress.street},{" "}
            {savedAddress.neighborhood}, {savedAddress.district}/
            {savedAddress.province}
          </div>
          <div style={{ display: "flex", marginBottom: "2px" }}>
            {savedAddress.district}/{savedAddress.province}
          </div>
          <div style={{ marginBottom: "5px" }}>
            {savedAddress.receiver_phone_number}
          </div>
          <Grid container spacing={"3px"}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              {" "}
              <button
                style={{
                  width: "100%",
                  fontWeight: "bold",
                  height: "18px",
                  fontSize: "9px",
                  backgroundColor: "rgba(0,139,255,0.16)",
                  border: "none",
                  color: "rgba(0,139,255)",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                Edit
              </button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              {" "}
              <button
                style={{
                  width: "100%",
                  height: "18px",
                  fontSize: "9px",
                  fontWeight: "bold",

                  backgroundColor: "rgba(237,74,0,0.16)",
                  border: "none",
                  color: "rgba(237,74,0)",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                Delete
              </button>
            </Grid>
          </Grid>
        </div>
      </Card>
    );
  };

  return (
    <>
      <Toast></Toast>
      <div className="accountSettings">
        <Card
          style={{
            width: "100%",
            display: "flex",
            height: "100%",
            padding: "15px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                style={{
                  height: "100%",
                  width: "100%",
                  border: "1px dashed rgba(47, 176, 9)",
                  backgroundColor: "rgba(47, 176, 9, 0.14)",
                  boxShadow: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {" "}
                <div>
                  <img
                    src={require("./add_new_icon.png")}
                    width={"35px"}
                    height={"35px"}
                  ></img>
                </div>
                <div
                  style={{
                    color: "rgba(47, 176, 9)",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Add New Address
                </div>
              </Card>
            </Grid>
            {savedAddresses.map((savedAddress, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  {renderSavedAddressesCard(savedAddress)}
                </Grid>
              );
            })}
          </Grid>
        </Card>
      </div>
    </>
  );
};
export default SavedAddresses;
