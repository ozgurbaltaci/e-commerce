import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Divider, Button } from "@mui/material";

import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";
import LoaderInBackdrop from "./components/LoaderInBackdrop";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [updatedRating, setUpdatedRating] = useState(0);

  useEffect(() => {
    // Fetch categories with subcategories from backend API using Axios
    axios
      .get(
        `http://localhost:3002/getReviewsOfCurrentUser/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
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

  const handleClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditModalOpen = (review) => {
    setUpdatedRating(review.rating);
    setSelectedReview(review.id); // Set selected review when edit button is clicked
    setEditedReviewText(review.review_text); // Set the initial value of edited review text
    setIsEditModalOpen(true);
  };

  const handleReviewTextChange = (event) => {
    setEditedReviewText(event.target.value); // Update edited review text when text field value changes
  };
  const handleStarClick = (starIndex) => {
    setUpdatedRating(starIndex + 1);
  };
  const renderRatingStars = () => {
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      if (i < updatedRating) {
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

  const handleSaveChanges = () => {
    // Send update request to backend
    axios
      .put(`http://localhost:3002/updateReview/${selectedReview}`, {
        updatedReviewText: editedReviewText,
        updatedRating: updatedRating,
      })
      .then((response) => {
        console.log(response.data.message);
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating review:", error);
      });
  };

  return (
    <>
      <LoaderInBackdrop isThereUpdateOperation={false}></LoaderInBackdrop>
      <Dialog open={isEditModalOpen} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Edit comment</DialogTitle>
        <DialogContent>
          <div className="DialogContent">
            {" "}
            <DialogContentText>
              To edit your comment, please edit your current comment in the form
              respectively.
            </DialogContentText>
            {renderRatingStars()}
            <textarea
              required
              value={editedReviewText} // Set value of textarea to edited review text
              onChange={handleReviewTextChange} // Handle textarea value changes
              style={{ width: "100%", height: "150px" }} // Adjust size as needed
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSaveChanges();
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        style={{
          padding: "15px",
          width: "fit-content",
          minWidth: "150px",
          height: "fit-content",
          width: "100%",
        }}
      >
        {reviews.map((review, index) => {
          return (
            <>
              <div
                style={{
                  marginBottom: "12px",
                  fontSize: "11px",
                  minHeight: "35px",
                  padding: "10px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    src={review.image}
                    width={"94px"}
                    height={"74px"}
                    style={{ borderRadius: "2px" }}
                  ></img>
                  <div style={{ marginLeft: "6px", width: "100%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "100%" }}>
                        <div
                          className="sellerNameAndDescription"
                          style={{ display: "flex" }}
                        >
                          <div style={{ fontWeight: "bold" }}>
                            {review.manufacturer_name}
                          </div>
                          <div style={{ marginLeft: "3px", color: "#262626" }}>
                            {review.description}
                          </div>
                        </div>

                        <div className="stars">
                          {renderStars(review.rating, "11px")}
                        </div>
                      </div>
                      <div
                        className="buttonGroup"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <button
                          style={{
                            width: "75px",
                            height: "18px",
                            fontSize: "9px",
                            backgroundColor: "rgba(0,139,255,0.16)",
                            border: "none",
                            color: "rgba(0,139,255)",
                            borderRadius: "2px",
                            marginRight: "6px",
                          }}
                          onClick={() => {
                            handleEditModalOpen(review);
                          }}
                        >
                          Edit Review
                        </button>

                        <button
                          style={{
                            width: "75px",
                            height: "18px",
                            fontSize: "9px",
                            backgroundColor: "rgba(237,74,0,0.16)",
                            border: "none",
                            color: "rgba(237,74,0)",
                            borderRadius: "2px",
                          }}
                        >
                          Delete Review
                        </button>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "10px",
                        backgroundColor: "#F2F1F1",
                        borderRadius: "3px",
                        minHeight: "25px",
                      }}
                    >
                      {review.review_text}
                    </div>
                  </div>
                </div>
              </div>
              <Divider style={{ margin: "10px 0px" }}></Divider>
            </>
          );
        })}
      </Card>
    </>
  );
};

export default MyReviews;
