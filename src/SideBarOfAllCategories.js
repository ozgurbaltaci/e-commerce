import React, { useState, useEffect } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Card,
  Grid,
  Typography,
  Divider,
  Avatar,
  Box,
} from "@material-ui/core";

import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const SideBarOfAllCategories = ({ currentSelectedSubCategoryId }) => {
  const [selectedOption, setSelectedOption] = useState(
    currentSelectedSubCategoryId
  );
  const userName = localStorage.getItem("user_name");
  const userSurname = localStorage.getItem("user_surname");

  const handleOptionClick = (
    category_id,
    category_name,
    sub_category_id,
    sub_category_name
  ) => {
    setSelectedOption(sub_category_id);
    navigate(
      `/category/${category_id}/${category_name}/${sub_category_id}/${sub_category_name}`
    );
  };

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories with subcategories from backend API using Axios
    axios
      .get(`http://localhost:3002/getCategoriesWithSubCategories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const renderSideBar = () => (
    <Card
      style={{
        padding: "15px",
        width: "fit-content",
        minWidth: "150px",
        height: "fit-content",
        marginRight: "25px",
      }}
    >
      {categories.map(
        ({ category_name, category_id, sub_categories }, groupIndex) => (
          <div key={groupIndex}>
            <div style={{ fontSize: "11px", color: "#2FB009" }}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/category/${category_id}/${category_name}`);
                }}
              >
                {category_name}
              </div>
            </div>
            {sub_categories.map((subCategory, index) => (
              <Typography
                key={index}
                style={{
                  cursor: "pointer",
                  marginLeft: "3px",
                  marginTop: "4px",
                  fontWeight:
                    parseInt(selectedOption) ===
                    parseInt(subCategory.sub_category_id)
                      ? "bold"
                      : "normal",
                }}
                onClick={() => {
                  handleOptionClick(
                    category_id,
                    category_name,
                    subCategory.sub_category_id,
                    subCategory.sub_category_name
                  );
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "10px",
                  }}
                >
                  <FiberManualRecordIcon
                    style={{ fontSize: "4px", marginRight: "4px" }}
                  />
                  {subCategory.sub_category_name}
                </div>
              </Typography>
            ))}
            {groupIndex !== categories.length - 1 && (
              <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
            )}
          </div>
        )
      )}
    </Card>
  );

  return (
    <>
      <div style={{ display: "flex" }}>{renderSideBar()}</div>
    </>
  );
};

export default SideBarOfAllCategories;
