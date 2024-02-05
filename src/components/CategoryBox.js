import React from "react";
import Box from "@mui/material/Box";
import { Navigate, useNavigate } from "react-router-dom";

const CategoryBox = ({
  navTo,
  imagePath,
  label,
  categoryId,
  category_name,
  width = "300px",
  height = "120px",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the dynamic category route when a category is clicked
    navigate(`/category/${categoryId}/${category_name}`);
  };
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
      onClick={handleClick}
    />
  );
};

export default CategoryBox;
