import React from "react";
import Box from "@mui/material/Box";

const CategoryBox = ({
  navTo,
  imagePath,
  label,
  width = "300px",
  height = "120px",
}) => {
  return (
    <Box
      component="img"
      sx={{
        height: height,
        width: "90%",
        borderRadius: "7px",
      }}
      src={imagePath}
      alt={label}
    />
  );
};

export default CategoryBox;
