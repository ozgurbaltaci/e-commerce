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
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";

import "./Cart.css";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import sehirler from "./json_files/sehir.json";
import ilceler from "./json_files/ilce.json";
import mahalleler from "./json_files/mahalle.json";
import sokaklar_caddeler from "./json_files/sokak_cadde.json";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FiPackage } from "react-icons/fi";

import { useLocation } from "react-router-dom";
import Labels from "./Labels";
import IncrementDecrementButtonGroup from "./IncrementDecrementButtonGroup";
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
    productName: "Product Name",
    price: 10.99,
    discountedPrice: null,
    desiredAmount: 1,
    image:
      "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
  },
  {
    id: 2,
    manufacturorName: "Manufacturor name 2",
    manufacturorId: 2,
    productName: "Product Name",
    price: 19.99,
    discountedPrice: 10.99,
    desiredAmount: 1,
    image:
      "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
  },
  {
    id: 3,
    manufacturorName: "Manufacturor name 2",
    manufacturorId: 2,
    productName: "Product Name",
    price: 19.99,
    discountedPrice: 10.99,
    desiredAmount: 1,
    image:
      "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
  },
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

const Cart = () => {
  const [savedAdresses, setSavedAddresses] = useState([
    { addressId: 1, address: "Kohoutova 1550/11, 613 00, Brno/Czech Republic" },
    {
      addressId: 2,
      address:
        "Kohoutova 1550/11, 613 00, Brno/Czech Republic and much much longer address that you can't imagine. It is very long to hold it in a small box. So that's why I kept writing to fill this address area.",
    },
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [open, setOpen] = React.useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [streets, setStreets] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState("");
  const [selectedBuildingNumber, setSelectedBuildingNumber] = useState("");
  const [selectedFloorNumber, setSelectedFloorNumber] = useState("");
  const [selectedDoorNumber, setSelectedDoorNumber] = useState("");

  useEffect(() => {
    setProvinces(sehirler[2].data);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleSelectProvince = (event) => {
    const sehir_title = event.target.value;
    setSelectedProvince(sehir_title);

    const provinceObject = provinces.find(
      (provinceObject) => provinceObject.sehir_title === sehir_title
    );
    const sehir_key = provinceObject.sehir_key;
    const selectedProvinceDistricts = ilceler[2].data.filter(
      (ilce) => ilce.ilce_sehirkey === sehir_key
    );
    setDistricts(selectedProvinceDistricts);
    setSelectedDistrict("");
    setSelectedNeighborhood("");
    setSelectedStreet("");
    setNeighborhoods([]);
    setStreets([]);
  };

  const handleDistrictChange = (event) => {
    const ilce_title = event.target.value;
    setSelectedDistrict(ilce_title);

    const districtObject = districts.find(
      (districtObject) => districtObject.ilce_title === ilce_title
    );
    const ilce_key = districtObject.ilce_key;
    const selectedDistrictNeigbourhoods = mahalleler[2].data.filter(
      (mahalle) => mahalle.mahalle_ilcekey === ilce_key
    );
    setNeighborhoods(selectedDistrictNeigbourhoods);
    setSelectedNeighborhood("");
    setSelectedStreet("");
    setStreets([]);
  };

  const handleNeighborChange = (event) => {
    const mahalle_title = event.target.value;
    setSelectedNeighborhood(mahalle_title);

    const neighborhoodObject = neighborhoods.find(
      (neighborhoodObject) => neighborhoodObject.mahalle_title === mahalle_title
    );
    const mahalle_key = neighborhoodObject.mahalle_key;
    const selectedNeighborhoodsStreets = sokaklar_caddeler[2].data.filter(
      (sokak) => sokak.sokak_cadde_mahallekey === mahalle_key
    );
    setStreets(selectedNeighborhoodsStreets);
    setSelectedStreet("");
  };
  const handleStreetChange = (event) => {
    const street_title = event.target.value;
    setSelectedStreet(street_title);
  };

  const handleBuildingNumberChange = (event) => {
    setSelectedBuildingNumber(event.target.value);
  };

  const handleFloorNumberChange = (event) => {
    setSelectedFloorNumber(event.target.value);
  };
  const handleDoorNumberChange = (event) => {
    setSelectedDoorNumber(event.target.value);
  };
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
      {console.log("sehirler: ", provinces)}
      {console.log("districts: ", districts)}

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Add new address</DialogTitle>
        <DialogContent>
          <div className="DialogContent">
            {" "}
            <DialogContentText>
              To add new address, please fill the form respectively.
            </DialogContentText>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Province</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedProvince}
                  label="Age"
                  onChange={handleSelectProvince}
                >
                  {provinces.map((province, index) => {
                    return (
                      <MenuItem
                        key={province.sehir_id}
                        value={province.sehir_title}
                      >
                        {province.sehir_title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="districts">District</InputLabel>
                <Select
                  labelId="districts"
                  id="districts"
                  value={selectedDistrict}
                  label="Districts"
                  onChange={handleDistrictChange}
                >
                  {districts.map((district, index) => {
                    return (
                      <MenuItem
                        key={district.ilce_id}
                        value={district.ilce_title}
                      >
                        {district.ilce_title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="neighborhoods">Neighborhood</InputLabel>
                <Select
                  labelId="neighborhoods"
                  id="neighborhoods"
                  value={selectedNeighborhood}
                  label="neighborhoods"
                  onChange={handleNeighborChange}
                >
                  {neighborhoods.map((neighbor, index) => {
                    return (
                      <MenuItem
                        key={neighbor.mahalle_id}
                        value={neighbor.mahalle_title}
                      >
                        {neighbor.mahalle_title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="streets">Street</InputLabel>
                <Select
                  labelId="streets"
                  id="streets"
                  value={selectedStreet}
                  label="streets"
                  onChange={handleStreetChange}
                >
                  {streets.map((street, index) => {
                    return (
                      <MenuItem
                        key={street.sokak_cadde_id}
                        value={street.sokak_cadde_title}
                      >
                        {street.sokak_cadde_title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "8px",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <TextField
                required
                label="Building number"
                value={selectedBuildingNumber}
                onChange={handleBuildingNumberChange}
              />
              <TextField
                required
                label="Floor number"
                value={selectedFloorNumber}
                onChange={handleFloorNumberChange}
              />
              <TextField
                required
                label="Door number"
                value={selectedDoorNumber}
                onChange={handleDoorNumberChange}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              setSavedAddresses([
                ...savedAdresses,
                {
                  addressId: Math.random(1000),
                  address: `${selectedProvince} province, ${selectedDistrict} district, ${selectedNeighborhood} neighborhood, ${selectedStreet} street, 
                  building ${selectedBuildingNumber},
                  floor ${selectedFloorNumber},
                  door ${selectedDoorNumber}`,
                },
              ]);
            }}
          >
            Add this address
          </Button>
        </DialogActions>
      </Dialog>
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
                            }}
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
                <div
                  style={{
                    padding: "2px 10px",
                  }}
                >
                  <Typography
                    style={{ padding: "10px 0px", fontWeight: "bold" }}
                  >
                    Select Delivery Address
                  </Typography>
                  <Divider></Divider>

                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="1"
                      name="delivery-radio-group"
                    >
                      {savedAdresses.map((item, index) => (
                        <FormControlLabel
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "5px",
                          }} // Adjust the margin here
                          value={item.addressId.toString()}
                          control={<GreenRadio />}
                          label={
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
                          }
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <button
                    style={{
                      width: "30%",
                      height: "25px",
                      bottom: "5px",
                      right: "5px",
                      left: "5px",
                      marginTop: "5px",

                      backgroundColor: "#2FB009",
                      borderRadius: "3px",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                      color: "white",
                    }}
                    onClick={handleClickOpen}
                    variant="contained"
                    color="primary"
                  >
                    Add new+
                  </button>
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
  );
};

export default Cart;
