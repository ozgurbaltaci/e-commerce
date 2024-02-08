import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import MyButton from "./components/MyButton";

const ProductDeteailsPage = () => {
  const [productDetails, setProductDetails] = useState([]);
  const { productId } = useParams();
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3002/getProductDetails/${productId}`)
        .then((response) => {
          setProductDetails(response.data);
        });
    } catch (err) {}
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="imageDetails">
          <img
            src={productDetails.image}
            style={{
              width: "550px",
              height: "532px",
              border: "1px solid #EEEEEE",
              borderRadius: "7px",
            }}
          ></img>
        </div>

        <div
          className="productDetails"
          style={{
            marginLeft: "30px",
            width: "100%",
            height: "532px",
            position: "relative",
          }}
        >
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            {productDetails.manufacturer_name}
          </div>
          <div style={{ fontSize: "24px" }}>{productDetails.description}</div>
          <div className="priceInfo" style={{ padding: "10px 0px" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize:
                  productDetails.discounted_price === null ? "32px" : "22px",
                textDecoration:
                  productDetails.discounted_price === null
                    ? "none"
                    : "line-through",
                color:
                  productDetails.discounted_price === null
                    ? "#00990F"
                    : "#707070",
              }}
            >
              {productDetails.price} TL
            </div>
            {productDetails.discounted_price !== null && (
              <div
                style={{
                  color: "#00990F",
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                {productDetails.discounted_price} TL
              </div>
            )}
          </div>
          {console.log(productDetails)}

          <Divider></Divider>
          <div className="categoryName">
            Category Name: {productDetails.category_name}
          </div>
          <div className="categoryName">
            Sub Category Name: {productDetails.sub_category_name}
          </div>
          <div className="categoryName">
            Stock Quantity: {productDetails.stock_quantity}
          </div>

          <div className="actionButtons">
            <button
              style={{
                width: "100%",
                height: "40px",

                backgroundColor: "#2FB009",
                borderRadius: "3px",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
                fontFamily: "Cabin",
              }}
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {"Add to Cart"}
            </button>
          </div>
          <div
            className="infoBox"
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              borderRadius: "7px",
              border: "1px solid #E0E0E0",
              overflow: "hidden",
            }}
          >
            <div>
              {" "}
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  padding: "12px  0px 0px 12px",
                }}
              >
                Shipping Policy:
              </div>
              <ul style={{ fontSize: "11px", paddingRight: "15px" }}>
                <li>
                  Our shipping days are Tuesdays and Thursdays. Orders placed
                  before 10:00 AM on Tuesday will be shipped on the same day,
                  and orders placed before 10:00 AM on Thursday will be shipped
                  on Thursday. Shipments are processed and dispatched on Tuesday
                  and Thursday mornings.
                </li>
                <li>
                  Shipping fee is 29.99 TL for purchases over 400 TL, and free
                  for purchases over 400 TL and only available on Turkey.
                </li>
              </ul>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  padding: "0px  0px 0px 12px",
                }}
              >
                Cancellation & Refund Policy:
              </div>
              <ul
                style={{
                  fontSize: "11px",
                  paddingRight: "15px",
                }}
              >
                <li>You can return your goods within 30 days.</li>
                <li style={{}}>
                  You can cancel at any time before your shipping is on the way.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDeteailsPage;
