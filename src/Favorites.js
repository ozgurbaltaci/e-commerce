import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@material-ui/core";

import AddProduct from "./AddProduct";

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    axios
      .get(`http://localhost:3002/getFavoritesOfUser/${user_id}`) // Make a GET request with Axios, including the product_id as a parameter in the URL
      .then((response) => {
        setFavoriteItems(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          marginLeft: "80px",
          marginTop: "40px",
        }}
      >
        <Card
          style={{
            width: "500px",
          }}
        >
          <CardContent style={{ padding: 0 }}>
            <Typography style={{ padding: "10px" }}>
              Favorites of {localStorage.getItem("userFullName")}
            </Typography>

            <Divider></Divider>
            <List>
              {favoriteItems.map((item, index) => {
                return (
                  <div style={{ position: "relative" }}>
                    <ListItem>
                      <div>
                        <img src={item.image} style={{ width: "130px" }}></img>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gap: "5px",
                          marginLeft: "5px",
                        }}
                      >
                        {item.manufacturer_name}
                      </div>
                      {item.product_name}
                      {item.price}
                      {item.discounted_price !== "NaN" && item.discounted_price}
                      {/**TODO: Change CSS manufacturerName, productName, price, discountedPrice */}
                    </ListItem>
                    {index !== favoriteItems.length - 1 && <Divider></Divider>}
                  </div>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Favorites;
