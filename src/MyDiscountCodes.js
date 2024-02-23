import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const MyReviews = () => {
  const [coupons, setCoupons] = useState([]);
  const [copiedCoupon, setCopiedCoupon] = useState();
  const [tooltipText, setTooltipText] = useState("Copy coupon code");

  useEffect(() => {
    // Fetch coupons of current user.
    var dummyData = [
      {
        coupon_id: 1,
        coupon_title: "50 ₺ Discount on Olive World!",
        coupon_description: "Valid on all products",
        coupon_code: "USDHBC",
        validity_start_date: "2024.02.02",
        validity_end_date: "2024.03.02",
        manufacturer_id: 1,
      },
      {
        coupon_id: 2,
        coupon_title: "50 ₺ Discount on Olive World!",
        coupon_description: "Valid on all products",
        coupon_code: "KHAJS",
        validity_start_date: "2024.03.03",
        validity_end_date: "2024.05.03",
        manufacturer_id: 1,
      },
    ];
    setCoupons(dummyData);
  }, []);

  const handleSeeProducts = () => {
    //navigate user to the products in discount
  };

  const handleCopyClick = (coupon_code) => {
    navigator.clipboard
      .writeText(coupon_code)
      .then(() => {
        setTooltipText("Copied!");
        setTimeout(() => {
          setTooltipText("Copy coupon code");
        }, 900); // Reset tooltip text after 2 seconds
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  };

  return (
    <>
      {coupons.map((coupon, index) => {
        return (
          <>
            <Card
              style={{
                marginBottom: "10px",
                fontSize: "11px",
                padding: "14px",
                width: "fit-content",
                minWidth: "150px",
                height: "fit-content",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="discount_img">
                <img
                  src={require("./discount_green.png")}
                  width={"45px"}
                  height={"45px"}
                ></img>
              </div>
              <div style={{ marginLeft: "5px", width: "100%" }}>
                <div
                  className="discount_title_and_see_products"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      width: "80%",
                      fontSize: "14px",
                    }}
                  >
                    {coupon.coupon_title}
                  </div>

                  <div
                    className="see_products_button"
                    style={{
                      width: "20%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      style={{
                        width: "75px",
                        height: "18px",
                        fontSize: "9px",
                        backgroundColor: "rgba(255,82,0,0.16)",
                        border: "none",
                        color: "rgba(255,82,0)",
                        borderRadius: "2px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleSeeProducts();
                      }}
                    >
                      See Products
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    borderTop: "1px dashed #E0E0E0",
                    width: "100%",
                    margin: "5px 0px",
                  }}
                ></div>
                <div
                  className="bottomDiv"
                  style={{ fontSize: "9px", color: "#4C4C4C", display: "flex" }}
                >
                  <div
                    style={{ width: "100%" }}
                    className="description_and_validty_date"
                  >
                    <div>{coupon.coupon_description}</div>
                    <div style={{ display: "flex" }}>
                      Validty Date:
                      <div style={{ marginLeft: "1px" }}>
                        {coupon.validity_start_date}
                      </div>
                      <div style={{ margin: "0px 1px" }}>{` - `}</div>
                      <div>{coupon.validity_end_date}</div>
                    </div>
                  </div>
                  <Tooltip
                    title={tooltipText}
                    slotProps={{
                      popper: {
                        sx: {
                          [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                            {
                              marginTop: "0px",
                            },
                          [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                            {
                              marginBottom: "0px",
                            },
                          [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                            {
                              marginLeft: "0px",
                            },
                          [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                            {
                              marginRight: "0px",
                            },
                        },
                      },
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "black",
                        cursor: "pointer",
                      }}
                      className="coupon_code"
                    >
                      <div
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => handleCopyClick(coupon.coupon_code)}
                      >
                        {coupon.coupon_code}
                      </div>
                      <ContentCopyIcon
                        style={{
                          fontSize: "13px",
                          marginLeft: "3px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleCopyClick(coupon.coupon_code)}
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </Card>
          </>
        );
      })}
    </>
  );
};

export default MyReviews;
