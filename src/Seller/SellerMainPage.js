import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import Divider from "@mui/material/Divider";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Card, Grid, Paper } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import classes from "../MyOrders.module.css";
import OrderStatusStepper from "../OrderStatusStepper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./SellerMainPage.css";

const SellerMainPage = () => {
  const [manufacturerData, setManufacturerData] = useState({
    manufacturer_id: 0,
    manufacturer_name: "",
    manufacturer_image: null,
    manufacturer_rating: 0.0,
    totalSales: 0,
    totalIncome: 0.0,
    pendingOrders: 0,
  });
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({}); // State to store order statuses individually

  const handleOrderStatusChange = async (event, orderId, manufacturer_id) => {
    const newOrderStatus = event.target.value;
    // Update the order status for the specific order ID
    setOrderStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: newOrderStatus,
    }));
    try {
      await axios
        .put(
          `http://localhost:3002/updateOrderStatus/${orderId}/${manufacturer_id}/${newOrderStatus}
          )}`
        )
        .then((response) => {
          if (response.status === 200) {
            alert("successfull");
          }
        });
    } catch (error) {
      alert(error);
    }
  };
  const { manufacturer_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3002/getManufacturersOrders/${manufacturer_id}`)
      .then((response) => {
        setManufacturerData(response.data.manufacturerInfo);
        setOrders(response.data.orders);
      });
  }, [manufacturer_id]);
  const arr = {
    averageRating: 4.3,
    pendingOrders: 3,
    monthlyIncome: 350.342,
    refunds: 4,
    totalSales: 88,
    totalIncome: 887.0,
  };

  const functions = [
    { function_name: "Past Orders", navigateTo: "" },
    { function_name: "Pending Orders", navigateTo: "" },
    { function_name: "Returns", navigateTo: "" },
    { function_name: "My Products", navigateTo: "" },
    { function_name: "Add Product", navigateTo: "" },
    { function_name: "Account Settings", navigateTo: "" },
  ];

  const getOrderedProducts = (order) => {
    return (
      <TableContainer component={Paper}>
        {console.log("gelenOrder: ", order)}
        <Table
          sx={{
            minWidth: 650,
            ".MuiTableCell-root": {
              fontSize: "11px",
              fontFamily: "Cabin",
              padding: "8px",
            },
            ".MuiTableCell-body": { color: "#00990F", fontSize: "11px" },
          }}
          aria-label="simple table"
          stickyHeader={true}
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Delivery Deadline
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Stock Quantity
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Unit Price</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Desired Amount
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Total Price</TableCell>
            </TableRow>
          </TableHead>
          {order.products.map((product, index) => (
            <TableBody key={index}>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>
                  <img
                    src={product.image}
                    style={{
                      display: "flex",
                      width: "50px",
                      height: "50px",
                      boxShadow: "0 0 5px 2px rgba(0,0,0,0.01)",
                      borderRadius: "2px",
                      marginRight: "15px",
                    }}
                    alt={product.product_name}
                  />
                </TableCell>
                <TableCell style={{ color: "black" }}>
                  {product.product_name}
                </TableCell>
                <TableCell>{order.delivery_deadline}</TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell>{product.price_on_add}</TableCell>
                <TableCell>{product.desired_amount}</TableCell>
                <TableCell>{product.total_price_for_product}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    );
  };

  const renderDataCard = (label, data) => {
    return (
      <Card
        key={label}
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginBottom: "5px",
            }}
          >
            {label}
          </div>
          <div
            style={{
              color: "#2FB009",
            }}
          >
            {data}
          </div>
        </div>
      </Card>
    );
  };
  const renderOrders = () => {
    return (
      <div style={{ fontSize: "9px", width: "100%" }}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Accordion key={order.order_id}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls={`panel-${order.order_id}-content`}
                id={`panel-${order.order_id}-header`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div style={{ display: "flex", width: "100%" }}>
                  <div
                    className="avatars"
                    style={{
                      display: "flex",
                      width: "84px",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "12%",
                    }}
                  >
                    {order.products.slice(0, 2).map((product, index) => (
                      <Avatar
                        className={classes.imgAvatar}
                        key={index}
                        alt={product.product_name}
                        src={product.image}
                        sx={{
                          width: "38px",
                          height: "38px",
                          boxShadow: "0 0 5px 2px rgba(0,0,0,0.08)",
                        }}
                      />
                    ))}
                    {order.products.length > 2 && (
                      <Avatar
                        sx={{
                          width: "38px",
                          height: "38px",
                          backgroundColor: "#EDEDED",
                          fontSize: "12px",
                          color: "black",
                          marginLeft: "-15px",
                        }}
                      >
                        +{order.products.length - 2}
                      </Avatar>
                    )}
                  </div>
                  <div
                    className="order_id_and_date"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "11%",
                    }}
                  >
                    <div>
                      <strong>Order ID: {order.order_id}</strong>

                      <div>{order.order_date}</div>
                    </div>
                  </div>
                  <div
                    className="receiver_info"
                    style={{
                      width: "71%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      container
                      spacing={1}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid
                        item
                        xs={2}
                        sm={2}
                        md={2}
                        lg={2}
                        style={{ paddingLeft: "15px" }}
                      >
                        {order.receiver_name}
                      </Grid>
                      <Grid item xs={2} sm={2} md={2} lg={2}>
                        {order.receiver_phone}
                      </Grid>
                      <Grid item xs={5} sm={5} md={5} lg={5}>
                        {order.delivery_address}
                      </Grid>

                      <Grid
                        item
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div style={{ marginRight: "8px" }}>
                          <button
                            style={{
                              height: "24px",
                              width: "85px",

                              fontSize: "9px",
                              fontWeight: "bold",
                              backgroundColor: "rgba(173,176,9,0.16)",
                              border: "none",
                              color: "rgba(173,176,9)",
                              borderRadius: "2px",
                            }}
                          >
                            Review Order
                          </button>
                        </div>
                        <div>
                          <FormControl
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                              ".MuiOutlinedInput-root": {
                                display: "flex",
                                width: "85px",

                                height: "24px",
                                padding: "0px",
                                margin: "0px",
                                fontSize: "9px",
                                fontWeight: "bold",
                                fontStyle: "normal",
                                color: "rgba(47,176,9)",
                                backgroundColor: "rgba(47,176,9, 0.16)",

                                border: "none",
                                borderRadius: "2px",
                                fontFamily: "Cabin",
                                fontStyle: "normal",
                              },
                              ".MuiOutlinedInput-root em": {
                                fontStyle: "normal",
                              },
                              "& fieldset": {
                                border: "none",
                              },
                              ".MuiSvgIcon-root": {
                                fontSize: "16px",
                                color: "rgba(47,176,9)",
                              },
                              ".MuiMenuItem-root ": {
                                fontStyle: "normal",
                                fontSize: "8px",
                              },

                              ".MuiMenuItem-root": {
                                color: "rgba(47,176,9,0.16)",
                              },
                            }}
                          >
                            <Select
                              value={
                                orderStatuses[order.order_id] ||
                                order.order_status_id
                              }
                              onChange={(event) =>
                                handleOrderStatusChange(
                                  event,
                                  order.order_id,
                                  manufacturerData.manufacturer_id
                                )
                              }
                              displayEmpty
                              inputProps={{
                                "aria-label": "Without label",
                              }}
                            >
                              <MenuItem value={1}>Recived</MenuItem>
                              <MenuItem value={2}>Preparing</MenuItem>
                              <MenuItem value={3}>On the way</MenuItem>
                              <MenuItem value={4}>Arrived</MenuItem>
                              <MenuItem value={5}>Completed</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div
                    className="order_total_price"
                    style={{
                      width: "6%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      color: "#00990F",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {order.total_price} TL
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>{getOrderedProducts(order)}</AccordionDetails>
            </Accordion>
          ))
        ) : (
          <div style={{ fontSize: "14px" }}>
            Looks like you haven't placed any orders yet. Start exploring our
            amazing products now!
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      <div style={{ fontWeight: "bold" }}>
        {manufacturerData.manufacturer_name}
      </div>
      <div
        style={{
          height: "200px",
          width: "100%",
          display: "flex",
        }}
      >
        <img
          src={manufacturerData.manufacturer_image}
          width={"200px"}
          height={"192px"}
          style={{
            objectFit: "cover",
            marginRight: "16px",
          }}
          alt="seller image"
        />

        <Grid container spacing={1}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Grid
              container
              spacing={1}
              style={{ height: "200px", overflow: "hidden" }}
            >
              <Grid item xs={4} sm={4} md={4} lg={4}>
                {renderDataCard(
                  "Rating",

                  parseFloat(manufacturerData.manufacturer_rating).toFixed(1)
                )}
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                {renderDataCard("Total Sales", manufacturerData.totalSales)}
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                {renderDataCard("Total Income", manufacturerData.totalIncome)}
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                {renderDataCard(
                  "Pending Orders",
                  manufacturerData.pendingOrders
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Grid
              container
              spacing={1}
              style={{
                height: "200px",
                overflow: "hidden",
              }}
            >
              {functions.map((item) => {
                return (
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Card
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0,139,255, 0.16)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "#008BFF",
                          }}
                        >
                          {item.function_name}
                        </div>
                      </div>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>

      {renderOrders()}
    </div>
  );
};

export default SellerMainPage;
