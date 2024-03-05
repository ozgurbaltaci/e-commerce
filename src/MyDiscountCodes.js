import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const MyReviews = () => {
  const [coupons, setCoupons] = useState([]);
  const [copiedCoupon, setCopiedCoupon] = useState();
  const [tooltipText, setTooltipText] = useState("Copy coupon code");

  const [isDiscountCodesLoading, setIsDiscountCodesLoading] = useState(true);

  useEffect(() => {
    // Fetch coupons of current user.
    // There are two coupons tables
    // coupons table: show the coupons that every user has
    // special_coupons_for_users table: show the coupons for the defined users only

    axios
      .get(`http://localhost:3002/getCoupons`)
      .then((response) => {
        setCoupons(response.data);
        setIsDiscountCodesLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    var dummyData = [
      {
        coupon_id: 1,
        coupon_title: "50 ₺ Discount on Olive World!",
        coupon_description: "Valid on all products",
        coupon_code: "USDHBC",
        validity_start_date: "2024.02.02",
        validity_end_date: "2024.03.02",
        available_manufacturer_id: 1,
        coupon_discount_amount: null,
        coupon_discount_percentage: 50,
      },
      {
        coupon_id: 2,
        coupon_title: "50 ₺ Discount on Olive World!",
        coupon_description: "Valid on all products",
        coupon_code: "KHAJS",
        validity_start_date: "2024.03.03",
        validity_end_date: "2024.05.03",
        available_manufacturer_id: 1,
        coupon_discount_amount: 200,
        coupon_discount_percentage: null,
      },
    ];
  }, []);
  function formatDateWithoutTimezone(dateStr) {
    const date = new Date(dateStr);

    // Get the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0 indexed
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as desired
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

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
  const calculateRemainingTime = (endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();

    const diffTime = end - now;
    console.log(diffTime);
    if (diffTime < 0) {
      return { days: -1, hours: -1 }; // Return 0 days and 0 hours if the time has already passed
    }

    const remainingDays = Math.floor(diffTime / oneDay);
    const remainingHours = diffTime / (1000 * 60 * 60);

    return { days: remainingDays, hours: remainingHours.toFixed(0) };
  };

  return (
    <>
      {isDiscountCodesLoading ? (
        <div>Your discount codes are loading...</div>
      ) : (
        coupons.map((coupon, index) => {
          const timesLeft = calculateRemainingTime(coupon.validity_end_date);
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
                  backgroundColor: timesLeft.days === -1 && "#F1F1F1",
                }}
              >
                <div style={{ width: "60px" }}>
                  <div
                    className="discount_img"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={require("./discount_green.png")}
                      width={"45px"}
                      height={"45px"}
                    ></img>
                  </div>

                  {timesLeft.hours <= 72 && (
                    <div
                      style={{
                        fontSize: "7px",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        color: "red",
                        minWidth: "50px",
                      }}
                    >
                      {console.log("here", timesLeft.days)}
                      {timesLeft.days === -1
                        ? `Expired!`
                        : timesLeft.days >= 1 && timesLeft.days <= 6
                        ? `Last ${timesLeft.days} day(s)!`
                        : timesLeft.hours >= 0 &&
                          `Last ${timesLeft.hours} hour(s)!`}
                    </div>
                  )}
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
                    style={{
                      fontSize: "9px",
                      color: "#4C4C4C",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{ width: "100%" }}
                      className="description_and_validty_date"
                    >
                      <div>{coupon.coupon_description}</div>
                      <div style={{ display: "flex" }}>
                        Validty Date:
                        <div style={{ marginLeft: "1px" }}>
                          {formatDateWithoutTimezone(
                            coupon.validity_start_date
                          )}
                        </div>
                        <div style={{ margin: "0px 1px" }}>{` - `}</div>
                        <div>
                          {formatDateWithoutTimezone(coupon.validity_end_date)}
                        </div>
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
        })
      )}
    </>
  );
};

export default MyReviews;
