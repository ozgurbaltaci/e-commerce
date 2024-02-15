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

const sideBarOptions = [
  {
    group: "Organic Products",
    options: [
      "Nuts",
      "Jams",
      "Olive Products",
      "Appetizers",
      "Pastes",
      "Fresh Fruits and Vegetables",
      "Legumes",
      "Gluten-free Products",
    ],
  },
  {
    group: "Handmade Products",
    options: [
      "Knit wears",
      "Christmas Products",
      "Belts",
      "Wallets",
      "hanmade other",
      "handmade one another",
      "handmade another",
      "handmade last one",
    ],
  },
];
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const SideBarOfAllCategories = () => {
  const [selectedOption, setSelectedOption] = useState();
  const userName = localStorage.getItem("user_name");
  const userSurname = localStorage.getItem("user_surname");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    // Add any additional logic you want to perform on option selection
  }, [selectedOption]);

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
      {sideBarOptions.map(({ group, options }, groupIndex) => (
        <>
          <div style={{ fontSize: "11px", color: "#2FB009" }}>{group}</div>
          {options.map((option, index) => (
            <div>
              <Typography
                style={{
                  cursor: "pointer",
                  marginLeft: "3px",
                  marginTop: "4px",

                  fontWeight: selectedOption === option ? "bold" : "normal",
                }}
                onClick={() => {
                  handleOptionClick(option);
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
                  {option}
                </div>
              </Typography>
            </div>
          ))}
          {groupIndex !== sideBarOptions.length - 1 && (
            <Divider
              style={{ marginTop: "10px", marginBottom: "10px" }}
            ></Divider>
          )}
        </>
      ))}
    </Card>
  );

  return (
    <>
      <div style={{ display: "flex" }}>{renderSideBar()}</div>
    </>
  );
};

export default SideBarOfAllCategories;
