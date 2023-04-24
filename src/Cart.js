import React from "react";
import {
  Card,
  CardContent,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@material-ui/core";

import { useLocation } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const { productsInCart } = location.state;
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
            {productsInCart.map((item) => {
              return (
                <>
                  <ListItem>
                    <img src={item.image} style={{ width: "130px" }}></img>
                    {item.name}
                  </ListItem>
                  <Divider></Divider>
                </>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
