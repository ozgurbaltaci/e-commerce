import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function isValidLuhnNumber(number) {
  const digits = number.toString().split("").map(Number);

  let sum = 0;
  for (let i = digits.length - 1; i >= 0; i--) {
    if ((digits.length - i) % 2 === 0) {
      let doubled = digits[i] * 2;
      if (doubled > 9) {
        doubled -= 9;
      }
      sum += doubled;
    } else {
      sum += digits[i];
    }
  }

  return sum % 10 === 0;
}
function PaymentForm({
  cardNumber,
  setCardNumber,
  cardExpirationDate,
  setCardExpirationDate,
  cardCVV,
  setCardCVV,
  isCardValid,
  setIsCardValid,
}) {
  const handleCardNumberChange = (event) => {
    // Remove non-numeric characters from the input
    const enteredCardNumber = event.target.value.replace(/\D/g, "");

    // Limit the input length to 16 digits (typical for card numbers)
    const limitedCardNumber = enteredCardNumber.slice(0, 16);

    // Format the card number into groups of 4
    const formattedCardNumber = limitedCardNumber
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setCardNumber(formattedCardNumber);
    setIsCardValid(isValidLuhnNumber(limitedCardNumber)); // Validate the limited input
  };
  const handleExpirationDateChange = (event) => {
    let input = event.target.value;

    // Remove any non-numeric characters
    input = input.replace(/\D/g, "");

    // Add a slash after the first two characters if the input length is 4
    if (input.length === 4) {
      input = input.substring(0, 2) + "/" + input.substring(2);
    }

    // Update the state with the formatted value
    setCardExpirationDate(input);
  };

  const handleCardCVVChange = (event) => {
    // Remove non-numeric characters from the input
    const enteredCardCVV = event.target.value.replace(/\D/g, "");

    setCardCVV(enteredCardCVV);
  };

  return (
    <div style={{ padding: "5px 0px " }}>
      <TextField
        label="Card Number"
        variant="outlined"
        size="small"
        error={!isCardValid}
        color=""
        fullWidth
        value={cardNumber}
        onChange={handleCardNumberChange}
        inputProps={{
          inputMode: "numeric", // Ensure numeric keyboard on mobile
          pattern: "[0-9]*", // Only allow numeric input
          maxLength: 19,
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "8px",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Expiration Date"
          variant="outlined"
          fullWidth
          size="small"
          value={cardExpirationDate}
          onChange={handleExpirationDateChange}
          placeholder="MM/YY"
          inputProps={{
            inputMode: "numeric", // Ensure numeric keyboard on mobile
            pattern: "[0-9]*", // Only allow numeric input
            maxLength: 4,
          }}
          style={{ marginTop: "10px" }}
        />

        <TextField
          label="CVV"
          variant="outlined"
          fullWidth
          size="small"
          value={cardCVV}
          onChange={handleCardCVVChange}
          inputProps={{
            inputMode: "numeric", // Ensure numeric keyboard on mobile
            pattern: "[0-9]*", // Only allow numeric input
            maxLength: 3,
          }}
          style={{ marginTop: "10px" }}
        />
      </div>
    </div>
  );
}

export default PaymentForm;
