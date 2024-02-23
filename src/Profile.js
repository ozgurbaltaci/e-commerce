import React, { useState, useEffect } from "react";
import MyOrders from "./MyOrders";
import MyReviews from "./MyReviews";
import MyDiscountCodes from "./MyDiscountCodes";
import Toast, { successToast, errorToast } from "./Toaster";

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
    group: "Profile",
    options: ["My Orders", "My Reviews", "My Discount Codes"],
  },
  {
    group: "Settings",
    options: ["Account Settings", "Saved Addresses", "Saved Cards"],
  },
  { group: "Logout", options: ["Log out"] },
];
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("My Orders");
  const userName = localStorage.getItem("user_name");
  const userSurname = localStorage.getItem("user_surname");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    // Add any additional logic you want to perform on option selection
  }, [selectedOption]);

  const renderSideBar = () => (
    <Card style={{ padding: "15px", width: "200px" }}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "#E0E0E0",
                color: "black",
                fontWeight: "bold",
                width: "86px",
                height: "86px",
                fontSize: "24px",
              }}
            >
              {userName.charAt(0).toUpperCase()}
              {userSurname.charAt(0).toUpperCase()}
            </Avatar>
          </div>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0px 8px 0px",
            }}
            item
          >
            {capitalizeFirstLetter(userName)}
            &nbsp;
            {capitalizeFirstLetter(userSurname)}
          </Grid>
        </Grid>
        <Grid>
          <Divider></Divider>
        </Grid>
        {sideBarOptions.map(({ group, options }, groupIndex) => (
          <>
            {options.map((option, index) => (
              <Grid item key={index}>
                <Typography
                  style={{
                    cursor: "pointer",
                    padding: "0px 12px",
                    fontSize: "16px",
                    fontWeight: selectedOption === option ? "bold" : "normal",
                  }}
                  onClick={() => {
                    groupIndex !== sideBarOptions.length - 1 &&
                      handleOptionClick(option);
                  }}
                >
                  {option}
                </Typography>
              </Grid>
            ))}
            {groupIndex !== sideBarOptions.length - 1 && <Divider></Divider>}
          </>
        ))}
      </Grid>
    </Card>
  );

  const renderSelectedOption = () => (
    <Box style={{ display: "block", marginLeft: "20px", width: "100%" }}>
      <Typography variant="h2" style={{ marginBottom: "10px" }}>
        {selectedOption}
      </Typography>

      {(() => {
        switch (selectedOption) {
          case "My Orders":
            return <MyOrders />;
            break;
          case "My Reviews":
            return <MyReviews />;
            break;
          case "My Discount Codes":
            return <MyDiscountCodes />;
            break;
          default:
            // Your code for other cases
            break;
        }
      })()}
    </Box>
  );

  return (
    <>
      <div style={{ display: "flex" }}>
        {renderSideBar()}
        {renderSelectedOption()}
      </div>
    </>
  );
};

export default Profile;
