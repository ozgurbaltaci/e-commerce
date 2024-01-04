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
import axios from "axios";

import PaymentForm from "./PaymentForm";
import "./Cart.css";
import CartItems from "./CartItems";
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
import LoaderInBackdrop from "./components/LoaderInBackdrop";

import { FiPackage } from "react-icons/fi";

import { useLocation } from "react-router-dom";
import Labels from "./Labels";
import IncrementDecrementButtonGroup from "./IncrementDecrementButtonGroup";
import { withStyles } from "@material-ui/core/styles";
import MyButton from "./components/MyButton";

const availablePaymentMethods = [
  /**  {
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
  }, */
  {
    paymentId: 4,
    paymentType: "Pay in the door",
  },
  {
    paymentId: 1,
    paymentType: "Visa, MasterCard",
    representativeImage:
      "https://www.vipbt.com.tr/wp-content/uploads/2021/01/mastercard-ve-visa-nedir-arasindaki-farklar-nelerdir1.jpg",
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
  const [provinceError, setProvinceError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [neighborhoodError, setNeighborhoodError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [buildingNumberError, setBuildingNumberError] = useState(false);
  const [floorError, setFloorError] = useState(false);
  const [doorNumberError, setDoorNumberError] = useState(false);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState("1");
  const [payInDoorFee, setPayInDoorFee] = useState(0);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cardHolder, setCardHolder] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpirationDate, setCardExpirationDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const [isCardValid, setIsCardValid] = useState(true);

  const [isThereUpdateOperation, setIsThereUpdateOperation] = useState(false);

  const handleProductSelection = (product, isSelected) => {
    setSelectedProducts((prevSelectedProducts) => {
      const updatedSet = new Set(prevSelectedProducts);

      if (isSelected) {
        updatedSet.add(product);
      } else {
        // Find and remove the specific product from the set
        for (const p of updatedSet) {
          if (p.product_id === product.product_id) {
            updatedSet.delete(p);
            break;
          }
        }
      }

      return Array.from(updatedSet);
    });
  };

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
    for (const product of selectedProducts) {
      const selectedProduct = cartItems.find(
        (item) => item.product_id === product.product_id
      );

      if (selectedProduct) {
        totalPrice += selectedProduct.discountedPrice
          ? selectedProduct.discountedPrice * selectedProduct.desired_amount
          : selectedProduct.price * selectedProduct.desired_amount;
      }
    }

    return totalPrice;
  };

  useEffect(() => {
    //get Cart Items HTTP request will be here
    const user_id = localStorage.getItem("user_id");
    axios
      .get(`http://localhost:3002/getCart/${user_id}`) // Make a GET request with Axios, including the product_id as a parameter in the URL
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setTotalItemPrice(totalPrice);
    const tempShippingFee = totalPrice > 100 || totalPrice === 0 ? 0 : 9;
    setShippingFee(tempShippingFee);
    if (selectedPaymentMethodId === "4" && totalPrice > 0) {
      setPayInDoorFee(10);
    } else {
      setPayInDoorFee(0);
    }
  }, [cartItems, selectedProducts, selectedPaymentMethodId]);

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
    setProvinceError(false);
    setSelectedDistrict("");
    setSelectedNeighborhood("");
    setSelectedStreet("");
    setNeighborhoods([]);
    setStreets([]);
  };

  const handleDistrictChange = (event) => {
    const ilce_title = event.target.value;
    setSelectedDistrict(ilce_title);
    setDistrictError(false);

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
    setNeighborhoodError(false);

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
    setStreetError(false);
  };

  const handleBuildingNumberChange = (event) => {
    setSelectedBuildingNumber(event.target.value);
    setBuildingNumberError(false);
  };

  const handleFloorNumberChange = (event) => {
    setSelectedFloorNumber(event.target.value);
    setFloorError(false);
  };
  const handleDoorNumberChange = (event) => {
    setSelectedDoorNumber(event.target.value);
    setDoorNumberError(false);
  };

  const handleUpdateDesiredAmount = async (product_id, newAmount) => {
    setIsThereUpdateOperation(true);

    try {
      // Make an Axios request to update the desired amount on the server
      const user_id = localStorage.getItem("user_id");
      if (newAmount === 0) {
        const updatedItems = cartItems.filter(
          (item) => item.product_id !== product_id
        );
        setCartItems(updatedItems);
        await axios.delete(
          `http://localhost:3002/removeFromCart/${user_id}/${product_id}`
        );
        setIsThereUpdateOperation(false);
        return; // Exit the function early if removeFromCart is called
      }

      const response = await axios.put(
        `http://localhost:3002/updateDesiredAmount/${user_id}/${product_id}`,
        {
          desired_amount: newAmount,
        }
      );

      // Check if the update was successful
      if (response.status === 200) {
        // If successful, update the state locally using the callback function
        const updatedItems = cartItems.map((item) =>
          item.product_id === product_id
            ? { ...item, desired_amount: newAmount } // Make sure it's 'desired_amount'
            : item
        );

        const updatedSelectedProducts = selectedProducts.map((item) =>
          item.product_id === product_id
            ? { ...item, desired_amount: newAmount } // Make sure it's 'desired_amount'
            : item
        );
        console.log("updatedSelectedProducts: ", updatedSelectedProducts);
        setSelectedProducts(updatedSelectedProducts);
        setCartItems(updatedItems);
        setIsThereUpdateOperation(false);
      } else {
        console.error("Failed to update desired amount.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const groupedItems = {};

  for (const item of cartItems) {
    //Object destructing deniyormuş bu işleme
    const { manufacturer_id } = item; //It means const x = item.manufacturerId. Don't be confused. And we need curly braces to do this.
    if (groupedItems.hasOwnProperty(manufacturer_id)) {
      groupedItems[manufacturer_id].push(item);
    } else {
      groupedItems[manufacturer_id] = [item];
    }
    /** Yukardaki kod ile bu kod tamamı ile aynı
    const x = item.manufacturerId;
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

  const handleCheckout = async () => {
    console.log("sss", selectedProducts);
    // Ödeme oluşturma isteği burada oluşturulmalı
    /**
     * price
     * paidPrice
     * paymentCard: {
        cardHolderName: "John Doe",
        cardNumber: "4127111111111113",
        expireMonth: "12",
        expireYear: "2030",
        cvc: "123",
        registerCard: "0",
      },
       shippingAddress: {
        contactName: "Jane Doe",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34742",
      },

     */
    try {
      const payment = await fetch(`http://localhost:3002/createPayment`, {
        method: "POST",
        body: JSON.stringify({
          price: (totalItemPrice + shippingFee + payInDoorFee).toFixed(2),
          paidPrice: (totalItemPrice + shippingFee + payInDoorFee).toFixed(2),
          paymentCard: {
            cardHolderName: "John Doe",
            cardNumber: cardNumber.replace(/\s+/g, ""),
            expireMonth: "12",
            expireYear: "2030",
            cvc: cardCVV,
            registerCard: "0",
          },
          basketItems: [
            ...selectedProducts.map((item) => ({
              id: item.product_id,
              name: item.productName,
              category1: "Collectibles", // Replace with your actual category1
              category2: "Accessories", // Replace with your actual category2
              itemType: "PHYSICAL", // Replace with your actual itemType
              price:
                item.discountedPrice !== null
                  ? item.discountedPrice.toFixed(2) * item.desired_amount
                  : item.price.toFixed(2) * item.desired_amount, // Format the price to two decimal places
            })),
            // Add shipping fee item if it's non-zero
            ...(shippingFee > 0
              ? [
                  {
                    id: 10,
                    name: "Shipping Fee",
                    category1: "Collectibles", // Replace with your actual category1
                    category2: "Accessories", // Replace with your actual category2
                    itemType: "PHYSICAL", // Replace with your actual itemType
                    price: shippingFee.toFixed(2),
                  },
                ]
              : []),
            // Add PayInDoor fee item if it's non-zero
            ...(payInDoorFee > 0
              ? [
                  {
                    id: 11,
                    name: "PayInDoor Fee",
                    category1: "Collectibles", // Replace with your actual category1
                    category2: "Accessories", // Replace with your actual category2
                    itemType: "PHYSICAL", // Replace with your actual itemType

                    price: payInDoorFee.toFixed(2),
                  },
                ]
              : []),
          ],
          shippingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742",
          },
          buyerInfo: {
            user_id: localStorage.getItem("user_id"),
            user_name: localStorage.getItem("user_name"),
            user_surname: localStorage.getItem("user_surname"),
            user_phone: localStorage.getItem("user_phone"),
            user_mail: localStorage.getItem("user_mail"),
          },
        }),

        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res); // Log the entire response
        if (res.status === 200) {
          alert(`Payment is successful.`);
        } else if (res.status === 201) {
          alert("You are not authorized");
        } else {
          alert(`Error: Payment failed.`);
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <LoaderInBackdrop
        isThereUpdateOperation={isThereUpdateOperation}
      ></LoaderInBackdrop>
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
                  error={provinceError}
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
                  error={districtError}
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
                  error={neighborhoodError}
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
                  error={streetError}
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
                error={buildingNumberError}
              />
              <TextField
                required
                label="Floor number"
                value={selectedFloorNumber}
                onChange={handleFloorNumberChange}
                error={floorError}
              />
              <TextField
                required
                label="Door number"
                value={selectedDoorNumber}
                onChange={handleDoorNumberChange}
                error={doorNumberError}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setProvinceError(false);
              setDistrictError(false);
              setNeighborhoodError(false);
              setStreetError(false);
              setBuildingNumberError(false);
              setFloorError(false);
              setDoorNumberError(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (
                selectedProvince !== "" &&
                selectedDistrict !== "" &&
                selectedNeighborhood !== "" &&
                selectedStreet !== "" &&
                selectedBuildingNumber !== "" &&
                selectedFloorNumber !== "" &&
                selectedDoorNumber !== ""
              ) {
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
                handleClose();
              } else {
                if (selectedProvince === "") {
                  setProvinceError(true);
                }
                if (selectedDistrict === "") {
                  setDistrictError(true);
                }
                if (selectedNeighborhood === "") {
                  setNeighborhoodError(true);
                }
                if (selectedStreet === "") {
                  setStreetError(true);
                }
                if (selectedBuildingNumber === "") {
                  setBuildingNumberError(true);
                }
                if (selectedFloorNumber === "") {
                  setFloorError(true);
                }
                if (selectedDoorNumber === "") {
                  setDoorNumberError(true);
                }
              }
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
            const itemsInManufacturer = element[1];
            return (
              <CartItems
                handleUpdateDesiredAmount={handleUpdateDesiredAmount}
                cartItems={cartItems}
                setCartItems={setCartItems}
                manufacturerId={manufacturerId}
                index={index}
                itemsInManufacturer={itemsInManufacturer}
                onProductSelection={handleProductSelection}
              ></CartItems>
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
                        defaultValue="1"
                        name="radio-buttons-group"
                        onChange={(event) =>
                          setSelectedPaymentMethodId(event.target.value)
                        }
                      >
                        {availablePaymentMethods.map((item, index) => (
                          <FormControlLabel
                            style={{
                              marginBottom:
                                index !== availablePaymentMethods.length - 1
                                  ? "-12px"
                                  : "0px",
                              display: "flex",
                              alignItems: "center",
                            }}
                            value={item.paymentId.toString()}
                            control={<GreenRadio />}
                            label={
                              item.representativeImage ? (
                                <img
                                  src={item.representativeImage}
                                  style={{ width: "40px", marginTop: "7px" }}
                                ></img>
                              ) : (
                                `${item.paymentType} (it will cost extra 10TL)`
                              )
                            }
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <div>
                      {" "}
                      {selectedPaymentMethodId === "1" && (
                        <PaymentForm
                          cardHolder={cardHolder}
                          setCardHolder={setCardHolder}
                          cardNumber={cardNumber}
                          setCardNumber={setCardNumber}
                          cardExpirationDate={cardExpirationDate}
                          setCardExpirationDate={setCardExpirationDate}
                          cardCVV={cardCVV}
                          setCardCVV={setCardCVV}
                          isCardValid={isCardValid}
                          setIsCardValid={setIsCardValid}
                        ></PaymentForm>
                      )}
                    </div>
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
                                borderRadius: "5px",
                                backgroundColor: "#F3F3F3",
                                padding: "5px",
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
                  <div style={{ margin: "5px 0px" }}>
                    <MyButton
                      buttonText={"Add New+"}
                      onClick={() => handleClickOpen()}
                      width="30%"
                      height="20px"
                    ></MyButton>
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
                      }}
                    >
                      {selectedPaymentMethodId === "4" && (
                        <>
                          <div>Pay in the door</div>{" "}
                          <div>{payInDoorFee.toFixed(2)} TL</div>
                        </>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                      }}
                    >
                      <div>Cart total</div>
                      <div>
                        {(totalItemPrice + shippingFee + payInDoorFee).toFixed(
                          2
                        )}{" "}
                        TL
                      </div>
                    </div>
                  </div>
                  <MyButton
                    buttonText={"Proceed to Checkout"}
                    onClick={handleCheckout}
                    width="100%"
                    height="25px"
                  ></MyButton>
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
