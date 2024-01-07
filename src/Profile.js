import React, { useState, useEffect } from "react";
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
    <Card style={{ maxWidth: "fit-content", padding: "15px" }}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <div
            style={{
              width: "200px",
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
            &nbsp;&nbsp;
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
    <Box style={{ marginLeft: "20px" }}>
      <Typography variant="h2"> {selectedOption}</Typography>
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
