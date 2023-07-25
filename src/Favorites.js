import React, { useState, useEffect } from "react";
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

const favoritesOfUser = [
  {
    id: 1,
    manufacturorName: "Manufacturor name",
    productName: "Product Name",
    price: 10.99,
    discountedPrice: null,
    desiredAmount: 1,
    image:
      "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
  },
  {
    id: 2,
    manufacturorName: "Manufacturor name",
    productName: "Product Name",
    price: 19.99,
    discountedPrice: 10.99,
    desiredAmount: 1,
    image:
      "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
  },
  {
    id: 3,
    manufacturorName: "Manufacturor name",
    productName: "Product Name",
    price: 19.99,
    discountedPrice: 10.99,
    desiredAmount: 1,
    image:
      "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
  },
];

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  useEffect(() => {
    //get Favorite Items HTTP request will be here
    setFavoriteItems(favoritesOfUser);
  }, []);

  return (
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
          <Typography style={{ padding: "10px" }}>Title Section</Typography>

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
                      style={{ display: "grid", gap: "5px", marginLeft: "5px" }}
                    >
                      {item.productName}
                    </div>
                  </ListItem>
                  {index !== favoriteItems.length - 1 && <Divider></Divider>}
                </div>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default Favorites;
