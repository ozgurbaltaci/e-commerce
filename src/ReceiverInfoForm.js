import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ReceiverInfoForm.css";

function ReceiverInfoForm({
  receiverName,
  setReceiverName,
  receiverPhone,
  setReceiverPhone,
  addressTitle,
  setAddressTitle,
}) {
  const handleReceiverNameChange = (event) => {
    // Remove non-numeric characters from the input
    const enteredReceiverName = event.target.value;

    setReceiverName(enteredReceiverName);
  };

  const handleReceiverPhoneChange = (event) => {
    const enteredPhoneNumber = event.target.value;

    setReceiverPhone(enteredPhoneNumber);
  };

  const handleAddressTitleChange = (event) => {
    const enteredAddressTitle = event.target.value;

    setAddressTitle(enteredAddressTitle);
  };

  return (
    <div style={{ padding: "10px 0px" }}>
      <TextField
        required
        id="addressTtile"
        label="Address Title"
        size="small"
        variant="outlined"
        fullWidth
        value={addressTitle}
        onChange={handleAddressTitleChange}
      />

      <TextField
        required
        id="receiverName"
        label="Receiver Name"
        size="small"
        variant="outlined"
        fullWidth
        value={receiverName}
        onChange={handleReceiverNameChange}
        style={{ marginTop: "10px" }}
      />

      <TextField
        required
        fullWidth
        id="phoneNumber"
        label="Phone Number"
        name="receiver_phone"
        size="small"
        value={receiverPhone}
        onChange={handleReceiverPhoneChange}
        inputProps={{
          inputMode: "numeric", // Ensure numeric keyboard on mobile
          pattern: "[0-9]*", // Only allow numeric input
        }}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
}

export default ReceiverInfoForm;
