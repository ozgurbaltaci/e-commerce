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
import classes from "./MyOrders.module.css";
import OrderStatusStepper from "./OrderStatusStepper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MyOrders = () => {
  const [orders, setOrders] = useState({ orders: [] });

  useEffect(() => {
    axios
      .get(`http://localhost:3002/getOrders/${localStorage.getItem("user_id")}`)
      .then((response) => {
        setOrders({ orders: response.data.orders });
      });
  }, []);

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
        <Card style={{ marginBottom: "20px" }}>
          <div>
            <Accordion defaultExpanded={true}>
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
                  {groupedProducts[manufacturerId][0].manufacturer_name}
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
        </Card>
      </div>
    ));
  };

  return (
    <div style={{ fontSize: "9px" }}>
      {orders.orders.map((order) => (
        <Accordion key={order.order_id}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls={`panel-${order.order_id}-content`}
            id={`panel-${order.order_id}-header`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  width: "84px",
                  justifyContent: "center",
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "90px" }}>
                  <strong>Order ID: {order.order_id}</strong>

                  <div>{order.order_date}</div>
                </div>
                <div style={{ width: "500px" }}>
                  <OrderStatusStepper
                    activeStep={order.order_status_id}
                  ></OrderStatusStepper>
                </div>
                <div
                  style={{
                    width: "70px",
                    display: "flex",
                    justifyContent: "flex-end",
                    color: "#00990F",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {order.total_price} TL
                </div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>{getOrderedProducts(order)}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MyOrders;
