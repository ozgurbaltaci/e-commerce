import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import MyButton from "./components/MyButton";
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { successToast } from "./Toaster";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& $notchedOutline": {
            borderColor: "green", // Change this to your desired border color
          },
        },
      },
    },
  },
});

const ProductDeteailsPage = () => {
  const [productDetails, setProductDetails] = useState([]);
  const { productId } = useParams();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [isReviewInputFocused, setIsReviewInputFocused] = useState(false);
  const [rating, setRating] = useState(0);
  const [nonSelectedRatingPointError, setNonSelectedRatingPointError] =
    useState(false);
  useEffect(() => {
    let apiUrl = `https://e-commerce-back-end-two.vercel.app/getProductDetails/${productId}`;
    const userId = localStorage.getItem("user_id");
    if (userId) {
      apiUrl += `?user_id=${userId}`;
    }

    try {
      axios.get(apiUrl).then((response) => {
        setProductDetails(response.data);
      });
    } catch (err) {}
  }, []);

  const renderStars = (starPoint, specificFontSize) => {
    const starElements = [];
    const fullStars = Math.floor(starPoint);
    const hasHalfStar = starPoint - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starElements.push(
          <TiStarFullOutline
            key={i}
            style={{
              color: "rgb(245, 195, 69)",
              fontSize: specificFontSize ? specificFontSize : "18px",
            }}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        starElements.push(
          <TiStarHalfOutline
            key={i}
            style={{
              color: "rgb(245, 195, 69)",
              fontSize: specificFontSize ? specificFontSize : "18px",
            }}
          />
        );
      } else {
        starElements.push(
          <TiStarOutline
            key={i}
            style={{ fontSize: specificFontSize ? specificFontSize : "18px" }}
          />
        );
      }
    }

    return starElements;
  };

  const renderRatingStars = () => {
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starElements.push(
          <TiStarFullOutline
            key={i}
            style={{
              color: "rgb(245, 195, 69)",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => handleStarClick(i)}
          />
        );
      } else {
        starElements.push(
          <TiStarOutline
            key={i}
            style={{ fontSize: "18px", cursor: "pointer" }}
            onClick={() => handleStarClick(i)}
          />
        );
      }
    }
    return starElements;
  };

  const handleCommentInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleSubmitComment = async () => {
    if (rating > 0) {
      setNonSelectedRatingPointError(false);

      try {
        if (commentInput.trim() !== "" && rating > 0) {
          const response = await axios
            .post(
              `https://e-commerce-back-end-two.vercel.app/saveRatingAndReview/${productId}`,
              {
                ratingPoint: rating,
                review: commentInput,
                manufacturer_id: productDetails.manufacturer_id,
              }
            )
            .then((response) => {
              if (response.status === 201) {
                successToast("Your review saved successfully!");
              }
            });
          setComments([...comments, commentInput]);
          setCommentInput(""); // Clear input field after submission
          setRating(0);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setNonSelectedRatingPointError(true);
    }
  };

  const handleReviewInputFocus = () => {
    setIsReviewInputFocused(true);
  };

  const handleReviewInputBlur = () => {
    setIsReviewInputFocused(false);
  };

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const displayCommentOwnerName = (user_name, user_surname) => {
    // Get the first two letters of the name and surname
    const abbreviatedName = user_name.slice(0, 1);
    const abbreviatedSurname = user_surname.slice(0, 1);

    // Create a string of 4 asterisks
    const asterisks = "****";

    // Combine the abbreviated name with the asterisks
    const maskedName = abbreviatedName + asterisks;

    // Combine the abbreviated surname with the asterisks
    const maskedSurname = abbreviatedSurname + asterisks;

    return `${maskedName} ${maskedSurname}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex" }}>
        <div className="imageDetails">
          <img
            src={productDetails.image}
            style={{
              width: "500px",
              height: "484px",
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
            height: "484px",
            position: "relative",
          }}
        >
          <div style={{ fontSize: "26px", fontWeight: "bold" }}>
            {productDetails.manufacturer_name}
          </div>
          <div
            style={{
              fontSize: "21px",
              maxHeight: "54px",
              overflow: "hidden",
              lineHeight: "27px",
            }}
          >
            {productDetails.description}
          </div>

          <div className="ratingStars">
            <div
              style={{
                display: "flex",
                fontSize: "12px",
                margin: "5px 0px",
                alignItems: "center",
                width: "fit-content",
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div style={{ fontWeight: "bold", marginRight: "5px" }}>
                {`${
                  productDetails.star_point
                    ? parseFloat(productDetails.star_point).toFixed(1)
                    : "0.0"
                }`}
              </div>

              {renderStars(parseFloat(productDetails.star_point).toFixed(1))}
              <FiberManualRecordIcon
                style={{
                  color: "#999999",
                  fontSize: "6px",
                  margin: "0px 2px",
                }}
              ></FiberManualRecordIcon>
              <span
                style={{
                  marginLeft: "2px",
                  fontSize: "10px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
              >{`${
                productDetails.ratings_count && productDetails.ratings_count
              } Review(s)`}</span>
            </div>
          </div>
          <div className="priceInfo">
            <div
              style={{
                fontWeight: "bold",
                fontSize:
                  productDetails.discounted_price === null ? "25px" : "14px",
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
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                {productDetails.discounted_price} TL
              </div>
            )}
          </div>

          <Divider style={{ margin: "5px 0px" }}></Divider>
          <div style={{ fontSize: "12px" }}>
            <div
              className="categoryName"
              style={{ marginBottom: "5px", display: "flex" }}
            >
              <span style={{ width: "135px", fontWeight: "bold" }}>
                Category Name
              </span>
              <div style={{ fontWeight: "bold" }}>:</div>

              <div style={{ marginLeft: "7px" }}>
                {productDetails.category_name}
              </div>
            </div>
            <div
              className="subCategoryName"
              style={{ marginBottom: "5px", display: "flex" }}
            >
              <span style={{ width: "135px", fontWeight: "bold" }}>
                Sub-Category Name
              </span>
              <div style={{ fontWeight: "bold" }}>:</div>

              <div style={{ marginLeft: "7px" }}>
                {productDetails.sub_category_name}
              </div>
            </div>
            <div
              className="stockQuantity"
              style={{ marginBottom: "5px", display: "flex" }}
            >
              <span style={{ width: "135px", fontWeight: "bold" }}>
                Stock Quantity
              </span>
              <div style={{ fontWeight: "bold" }}>:</div>
              <div style={{ marginLeft: "7px" }}>
                {productDetails.stock_quantity}
              </div>
            </div>
          </div>

          <div
            className="actionButtons"
            style={{ display: "flex", margin: "10px 0px" }}
          >
            <button
              style={{
                width: "100%",
                height: "40px",
                marginRight: "10px",

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

            <div
              style={{
                width: "40px", // Specific width for the circle
                height: "40px", // Same height as width to ensure a perfect circle
                borderRadius: "50%", // Makes it a circle
                border: "1px solid #9999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {productDetails.is_favorite ? (
                productDetails.is_favorite === true ? (
                  <Favorite color="secondary" style={{ fontSize: 22 }} />
                ) : (
                  <FavoriteBorder style={{ fontSize: 22 }} />
                )
              ) : (
                <FavoriteBorder style={{ fontSize: 22 }} />
              )}
            </div>
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

      <div
        className="reviews_and_ratings"
        style={{
          padding: "20px 32px 20px 32px",
          border: "1px solid #9999 ",
          borderRadius: "7px",
        }}
      >
        <div>
          <h3>Rate the Product: </h3>
          <div className="ratingStars">{renderRatingStars()}</div>

          <textarea
            value={commentInput}
            onChange={handleCommentInputChange}
            placeholder="Type your comment here..."
            style={{
              minHeight: "100px",
              display: "block",
              width: "100%",
            }}
          />
          <div
            style={{
              display: !nonSelectedRatingPointError ? "none" : "block",
              color: "red",
              fontSize: "10px",
              marginTop: "5px",
            }}
          >
            {" "}
            Please rate the product before saving your review!
          </div>
          <button
            style={{
              width: "180px",
              padding: "8px",
              marginTop: "8px",
              backgroundColor: "#2FB009",
              borderRadius: "3px",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "13px",
              fontFamily: "Cabin",
            }}
            variant="contained"
            color="primary"
            onClick={handleSubmitComment}
          >
            {"Save your rating"}
          </button>
        </div>
        <Divider style={{ margin: "20px 0px" }}></Divider>
        <div>
          <h2>Comments</h2>
          {productDetails.reviewsAndRatings &&
            productDetails.reviewsAndRatings.map((comment, index) => (
              <>
                <div style={{ display: "flex", marginTop: "25px" }}>
                  <Avatar
                    style={{
                      backgroundColor: "#E0E0E0",
                      color: "black",
                      fontWeight: "bold",
                      width: "40px",
                      height: "40px",
                      fontSize: "12px",
                      fontFamily: "Cabin",
                    }}
                  >
                    {comment.user_name.charAt(0).toUpperCase()}
                    {comment.user_surname.charAt(0).toUpperCase()}
                  </Avatar>
                  <div style={{ display: "block", marginLeft: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>{renderStars(comment.rating, "10px")}</div>
                      <div
                        style={{ fontSize: "7px", marginTop: "2px" }}
                      >{`| ${displayCommentOwnerName(
                        comment.user_name,
                        comment.user_surname
                      )}`}</div>
                    </div>
                    <div
                      style={{
                        width: "400px",
                        height: "fit-content",
                        backgroundColor: "#F4F4F4",
                        borderRadius: "3px",
                        fontSize: "11px",
                        minHeight: "50px",
                        maxHeight: "200px",
                        padding: "10px",
                        overflowY: "auto",
                        textOverflow: "ellipsis",
                        scrollbarWidth: "thin", // Modern tarayıcılarda ince bir scroll barı göstermek için

                        scrollbarColor: "#9999 #F4F4F4", // Scroll barı rengi
                        display: "block",
                      }}
                    >
                      {" "}
                      {comment.review_text}
                    </div>
                  </div>
                </div>
                <Divider style={{ width: "100%", marginTop: "25px" }}></Divider>
              </>
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ProductDeteailsPage;
