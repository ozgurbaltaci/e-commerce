import React, { useEffect, useState } from "react";
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
import { FiPackage } from "react-icons/fi";

import { useLocation } from "react-router-dom";
import Labels from "./Labels";
import IncrementDecrementButtonGroup from "./IncrementDecrementButtonGroup";

const productsInCart = [
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

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    //get Cart Items HTTP request will be here
    setCartItems(productsInCart);
  }, []);

  const handleIncreaseAmount = (productId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, desiredAmount: item.desiredAmount + 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  const handleDecreaseAmount = (productId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === productId) {
        const newAmount = item.desiredAmount - 1;

        if (newAmount <= 0) {
          return null;
        } else {
          return { ...item, desiredAmount: newAmount };
        }
      } else {
        return item;
      }
    });
    const filteredItems = updatedItems.filter((item) => item !== null);
    setCartItems(filteredItems);
  };

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
            {cartItems.map((item, index) => {
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
                      <Labels
                        labelIcon={
                          <FiPackage style={{ fontSize: "6px" }}></FiPackage>
                        }
                        labelName="Free Shipping"
                      ></Labels>
                      <Typography style={{ fontSize: "8px" }}>
                        Will be delivered until 27th of July
                      </Typography>
                    </div>
                    <IncrementDecrementButtonGroup
                      height={"15"}
                      initialValue={item.desiredAmount}
                      item={item}
                      handleDecreaseAmount={handleDecreaseAmount}
                      handleIncreaseAmount={handleIncreaseAmount}
                    />
                    <Typography>
                      {item.discountedPrice
                        ? item.discountedPrice * item.desiredAmount
                        : item.price * item.desiredAmount}
                    </Typography>
                    <Button
                      onClick={() => {
                        const afterDeleteCartItems = cartItems.filter(
                          (product) => product.id !== item.id
                        );
                        setCartItems(afterDeleteCartItems);
                        //TODO: set desired amount of that product as 0 by UPDATE request.
                      }}
                    >
                      X
                    </Button>
                  </ListItem>
                  {index !== cartItems.length - 1 && <Divider></Divider>}
                </div>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
