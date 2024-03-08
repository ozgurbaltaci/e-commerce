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

const SellerMainPage = () => {
  const [manufacturerData, setManufacturerData] = useState(null);
  const [orders, setOrders] = useState([]);

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
    // Create an object to store products grouped by manufacturer_id
    const groupedProducts = {};

    // Group products by manufacturer_id
    order.products.forEach((product) => {
      const manufacturerId = product.manufacturer_id;

      if (!groupedProducts[manufacturerId]) {
        groupedProducts[manufacturerId] = [];
      }

      groupedProducts[manufacturerId].push(product);
    });

    // Render the grouped products
    return Object.keys(groupedProducts).map((manufacturerId, index) => (
      <div key={index}>
        <div>
          <Accordion style={{ marginBottom: "15px" }} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={
                <KeyboardArrowDownIcon style={{ fontSize: "12px" }} />
              }
              style={{ minHeight: "30px", maxHeight: "30px" }} // Set the desired height
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "11px",
                }}
              >
                Ordered Products
              </div>
            </AccordionSummary>
            {groupedProducts[manufacturerId].map((product, index) => (
              <>
                {" "}
                <Divider />
                <AccordionDetails style={{ display: "flex" }}>
                  <img
                    key={index}
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
                  <Grid
                    container
                    spacing={5}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={12} sm={3} md={3}>
                      <div
                        style={{
                          display: "block",
                          fontSize: "11px",
                        }}
                      >
                        <div
                          style={{
                            display: "block",
                            whiteSpace: "nowrap", // Prevent text wrapping
                            overflow: "hidden",
                            textOverflow: "ellipsis", // Display ellipsis for overflow
                          }}
                        >
                          {" "}
                          {product.product_name}
                        </div>
                        <div style={{ color: "#00990F", fontWeight: "bold" }}>
                          {product.price_on_add}₺
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <div style={{ display: "block", fontSize: "11px" }}>
                        <div>Desired Amount:</div>
                        <div style={{ color: "#00990F", fontWeight: "bold" }}>
                          {" "}
                          {product.desired_amount}
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <div style={{ display: "block", fontSize: "11px" }}>
                        <div>Total Price:</div>
                        <div style={{ color: "#00990F", fontWeight: "bold" }}>
                          {" "}
                          {product.total_price_for_product}
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={4}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <button
                        style={{
                          width: "80px",
                          height: "24px",
                          fontSize: "9px",
                          fontWeight: "bold",
                          backgroundColor: "rgba(173,176,9,0.16)",
                          border: "none",
                          color: "rgba(173,176,9)",
                          borderRadius: "2px",
                          marginRight: "9px",
                        }}
                      >
                        Review Order
                      </button>

                      <button
                        style={{
                          width: "80px",
                          height: "24px",
                          fontSize: "9px",
                          fontWeight: "bold",
                          backgroundColor: "rgba(47,176,9,0.16)",
                          border: "none",
                          color: "rgba(47,176,9)",
                          borderRadius: "2px",
                        }}
                      >
                        Buy Again
                      </button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </>
            ))}
          </Accordion>
        </div>
      </div>
    ));
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
                  {console.log("orderımız: ", order)}
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
                        Özgür Baltacı
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
                        <button
                          style={{
                            width: "100%",
                            height: "24px",
                            fontSize: "9px",
                            fontWeight: "bold",
                            backgroundColor: "rgba(173,176,9,0.16)",
                            border: "none",
                            color: "rgba(173,176,9)",
                            borderRadius: "2px",
                            marginRight: "9px",
                          }}
                        >
                          Review Order
                        </button>
                        <button
                          style={{
                            width: "100%",
                            height: "24px",
                            fontSize: "9px",
                            fontWeight: "bold",
                            backgroundColor: "rgba(173,176,9,0.16)",
                            border: "none",
                            color: "rgba(173,176,9)",
                            borderRadius: "2px",
                            marginRight: "9px",
                          }}
                        >
                          Review Order
                        </button>
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
      <div style={{ fontWeight: "bold" }}>Name of the seller</div>
      <div
        style={{
          height: "200px",
          width: "100%",
          display: "flex",
        }}
      >
        <img
          src={require("../discount_green.png")}
          width={"200px"}
          height={"100%"}
          style={{ objectFit: "cover", marginRight: "20px" }}
          alt="seller image"
        />

        <Grid container spacing={1}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Grid
              container
              spacing={1}
              style={{ height: "200px", overflow: "hidden" }}
            >
              {Object.keys(arr).map((key) => {
                return (
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Card
                      key={key}
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
                          {key}
                        </div>
                        <div
                          style={{
                            color: "#2FB009",
                          }}
                        >
                          {arr[key]}
                        </div>
                      </div>
                    </Card>
                  </Grid>
                );
              })}
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
