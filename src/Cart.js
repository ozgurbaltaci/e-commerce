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
<<<<<<< Updated upstream
=======
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
>>>>>>> Stashed changes
} from "@material-ui/core";
import { FiPackage } from "react-icons/fi";

import { useLocation } from "react-router-dom";
import Labels from "./Labels";
import IncrementDecrementButtonGroup from "./IncrementDecrementButtonGroup";
<<<<<<< Updated upstream

const productsInCart = [
  {
    id: 1,
    manufacturorName: "Manufacturor name",
=======
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const availablePaymentMethods = [
  {
    paymentId: 1,
    paymentType: "Visa, MasterCard",
    representativeImage:
      "https://www.vipbt.com.tr/wp-content/uploads/2021/01/mastercard-ve-visa-nedir-arasindaki-farklar-nelerdir1.jpg",
  },
  {
    paymentId: 2,
    paymentType: "Apple Pay",
    representativeImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/800px-Apple_Pay_logo.svg.png",
  },
  {
    paymentId: 3,
    paymentType: "Google Pay",
    representativeImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png",
  },
];
const productsInCart = [
  {
    id: 1,
    manufacturorName: "Manufacturor name 1",
    manufacturorId: 1,
>>>>>>> Stashed changes
    productName: "Product Name",
    price: 10.99,
    discountedPrice: null,
    desiredAmount: 1,
    image:
      "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
  },
  {
    id: 2,
<<<<<<< Updated upstream
    manufacturorName: "Manufacturor name",
=======
    manufacturorName: "Manufacturor name 2",
    manufacturorId: 2,
>>>>>>> Stashed changes
    productName: "Product Name",
    price: 19.99,
    discountedPrice: 10.99,
    desiredAmount: 1,
    image:
      "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
  },
  {
    id: 3,
<<<<<<< Updated upstream
    manufacturorName: "Manufacturor name",
=======
    manufacturorName: "Manufacturor name 2",
    manufacturorId: 2,
>>>>>>> Stashed changes
    productName: "Product Name",
    price: 19.99,
    discountedPrice: 10.99,
    desiredAmount: 1,
    image:
      "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
  },
<<<<<<< Updated upstream
=======
  {
    id: 4,
    manufacturorName: "Manufacturor name 2",
    manufacturorId: 2,
    productName: "Product Name",
    price: 19.99,
    discountedPrice: 100.99,
    desiredAmount: 1,
    image:
      "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
  },
];

const savedAdresses = [
  { addressId: 1, address: "Kohoutova 1550/11, 613 00, Brno/Czech Republic" },
  {
    addressId: 2,
    address:
      "Kohoutova 1550/11, 613 00, Brno/Czech Republic and much much longer address that you can't imagine. It is very long to hold it in a small box. So that's why I kept writing to fill this address area.",
  },
>>>>>>> Stashed changes
];

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
<<<<<<< Updated upstream
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
=======
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const item of cartItems) {
      totalPrice += item.discountedPrice
        ? item.discountedPrice * item.desiredAmount
        : item.price * item.desiredAmount;
    }
    return totalPrice;
  };

  useEffect(() => {
    //get Cart Items HTTP request will be here
    setCartItems(productsInCart);
    const totalPrice = calculateTotalPrice();
    setTotalItemPrice(totalPrice);
    const tempShippingFee = totalPrice > 100 ? 0 : 9;
    setShippingFee(tempShippingFee);
  }, [cartItems]);

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

  const groupedItems = {};

  for (const item of cartItems) {
    //Object destructing deniyormuş bu işleme
    const { manufacturorId } = item; //It means const x = item.manufacturorId. Don't be confused. And we need curly braces to do this.
    if (groupedItems.hasOwnProperty(manufacturorId)) {
      groupedItems[manufacturorId].push(item);
    } else {
      groupedItems[manufacturorId] = [item];
    }
    /** Yukardaki kod ile bu kod tamamı ile aynı
    const x = item.manufacturorId;
    if (groupedItems.hasOwnProperty(x)) {
      groupedItems[x].push(item);
    } else {
      groupedItems[x] = [item];
    } */

    /**OBJECT DESTRUCTION EXAMPLE: 
    const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    city: 'New York',
    country: 'USA',
    };

    // Extracting multiple properties using object destructuring
    const { firstName, lastName, age } = person;

    console.log(firstName); // Output: John
    console.log(lastName); // Output: Doe
    console.log(age); // Output: 30
     */
  }
  console.log(groupedItems);

  const GreenRadio = withStyles({
    root: {
      color: "gray",
      "&$checked": {
        color: "#2FB009",
      },
      fontSize: "6px",
      "&:hover": {
        backgroundColor: "transparent", // This sets the hover background color to transparent
      },
    },

    checked: {},
  })((props) => (
    <Radio
      style={{ marginTop: "2px" }}
      disableRipple
      size="small"
      color="default"
      {...props}
    />
  ));

  return (
    <>
      <div style={{ display: "flex", margin: "60px 80px" }}>
        <div
          style={{
            display: "block",
            width: "70%",
          }}
        >
          {Object.entries(groupedItems).map((element, index) => {
            const manufacturerId = element[0];
            const items = element[1];
            return (
              <Card
                key={manufacturerId}
                style={{ marginTop: index !== 0 && "20px" }}
              >
                <CardContent style={{ padding: 0 }}>
                  <Typography style={{ padding: "10px" }}>
                    {items[index].manufacturorName}
                  </Typography>
                  <Divider></Divider>
                  <List>
                    {items.map((item, index) => {
                      return (
                        <div style={{ position: "relative" }} key={item.id}>
                          <ListItem>
                            <div>
                              <img
                                src={item.image}
                                style={{ width: "130px" }}
                                alt={item.productName}
                              ></img>
                            </div>
                            <div
                              style={{
                                display: "grid",
                                gap: "5px",
                                marginLeft: "5px",
                              }}
                            >
                              {item.productName}
                              <Labels
                                labelIcon={
                                  <FiPackage
                                    style={{ fontSize: "6px" }}
                                  ></FiPackage>
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
                          {index !== items.length - 1 && <Divider></Divider>}
                        </div>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div style={{ width: "30%", marginLeft: "20px" }}>
          {
            <Card style={{ height: "100%" }}>
              <CardContent style={{ padding: 0 }}>
                <div style={{ padding: "2px 10px" }}>
                  <Typography
                    style={{ padding: "10px 0px", fontWeight: "bold" }}
                  >
                    Select Payment Method
                  </Typography>
                  <Divider></Divider>

                  <div style={{ padding: "0px 0px" }}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="pay in the door"
                        name="radio-buttons-group"
                      >
                        {availablePaymentMethods.map((item, index) => (
                          <FormControlLabel
                            style={{
                              marginBottom: "-12px",
                              display: "flex",
                              alignItems: "center",
                            }} // Adjust the margin here
                            value={item.paymentType}
                            control={<GreenRadio />}
                            label={
                              <img
                                src={item.representativeImage}
                                style={{ width: "40px", marginTop: "7px" }}
                              ></img>
                            }
                          />
                        ))}
                        <FormControlLabel
                          value={"pay in the door"}
                          control={<GreenRadio />}
                          label={
                            <span style={{ fontSize: "14px" }}>
                              Pay in the door (It will cost 2€ more)
                            </span>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <Divider></Divider>
                <div style={{ padding: "2px 10px" }}>
                  <Typography
                    style={{ padding: "10px 0px", fontWeight: "bold" }}
                  >
                    Select Delivery Address
                  </Typography>
                  <Divider></Divider>
                  <div style={{ padding: "8px 0px" }}>
                    {" "}
                    {savedAdresses.map((item, index) => (
                      <div
                        style={{
                          border: "1px solid gray",
                          borderRadius: "5px",
                        }}
                      >
                        {item.address.length > 50
                          ? item.address.substring(0, 50) + "..." // Display first 50 characters and add "..." at the end
                          : item.address}
                      </div>
                    ))}
                    <button
                      style={{
                        height: "25px",
                        bottom: "5px",
                        right: "5px",
                        left: "5px",

                        backgroundColor: "#2FB009",
                        borderRadius: "3px",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "none",
                        color: "white",
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Add new+
                    </button>
                  </div>
                </div>
                <Divider></Divider>
                <div style={{ padding: "2px 10px" }}>
                  <Typography
                    style={{ padding: "10px 0px", fontWeight: "bold" }}
                  >
                    Receipt
                  </Typography>
                  <Divider></Divider>
                  <div style={{ padding: "8px 0px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                      }}
                    >
                      <div>Item total</div>
                      <div>{totalItemPrice.toFixed(2)} TL</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>Shipping Fee</div>
                      <div>{shippingFee.toFixed(2)} TL</div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                      }}
                    >
                      <div>Cart total</div>
                      <div>{(totalItemPrice + shippingFee).toFixed(2)} TL</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          }
        </div>
      </div>
    </>
>>>>>>> Stashed changes
  );
};

export default Cart;
