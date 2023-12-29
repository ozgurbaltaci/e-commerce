import React from "react";

const button = (props) => {
  const lastHoveredProductId = props.hoveredProductId;
  const currentHoveredProductId = props.id;
  return (
    <button
      style={{
        display:
          lastHoveredProductId === currentHoveredProductId ? "flex" : "none",
        width: props.width || "100%",
        height: props.height || "25px",

        backgroundColor: "#2FB009",
        borderRadius: "3px",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        color: "white",
      }}
      variant="contained"
      color="primary"
      onClick={() => props.onClick()}
    >
      {props.buttonText}
    </button>
  );
};

export default button;
