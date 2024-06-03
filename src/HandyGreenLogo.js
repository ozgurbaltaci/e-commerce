import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const HandyGreenLogo = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontWeight: "bold",
        fontSize: "24px",
        color: "#2FB009",
        cursor: "pointer",
      }}
      onClick={() => {
        if (localStorage.getItem("isSeller") === "true") {
          navigate("/seller/mainPage");
        } else {
          navigate("/mainPage");
        }
      }}
    >
      HandyGreen
    </div>
  );
};

export default HandyGreenLogo;
