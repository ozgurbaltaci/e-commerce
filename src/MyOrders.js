import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import Divider from "@mui/material/Divider";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import classes from "./MyOrders.module.css";
import OrderStatusStepper from "./OrderStatusStepper";

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
                expandIcon={<ArrowDownwardIcon />}
                style={{ height: "10px" }} // Set the desired height
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
                  <AccordionDetails>
                    <div style={{ display: "flex" }}>
                      <img
                        key={index}
                        src={product.image}
                        style={{
                          width: "70px",
                          height: "70px",
                          boxShadow: "0 0 5px 2px rgba(0,0,0,0.01)",
                          borderRadius: "2px",
                        }}
                        alt={product.product_name}
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ display: "block" }}>
                          <div>{product.product_name}</div>
                          <div>{product.price_on_add}₺</div>
                        </div>
                        <div style={{ display: "block" }}>
                          <div>Desired Amount:</div>
                          <div> {product.desired_amount}</div>
                        </div>
                        <div style={{ display: "block" }}>
                          <div>Total Price:</div>
                          <div> {product.total_price_for_product}</div>
                        </div>
                        <button
                          style={{
                            width: "84px",
                            height: "24px",
                            fontSize: "10px",
                          }}
                        >
                          Review Order
                        </button>
                        <button
                          style={{
                            width: "84px",
                            height: "24px",
                            fontSize: "10px",
                          }}
                        >
                          Buy Again
                        </button>
                      </div>
                    </div>
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
          >
            <div style={{ display: "flex" }}>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
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
                    color: "#00990F",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {order.total_price}₺
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
