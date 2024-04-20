import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import MyButton from "./components/MyButton";
import axios from "axios";
import Toast, { successToast, errorToast } from "./Toaster";
import LoaderInBackdrop from "./components/LoaderInBackdrop";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  Remove,
  Add,
} from "@material-ui/icons";

import IncrementDecrementButtonGroup from "./IncrementDecrementButtonGroup";

import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";
import Skeleton from "react-loading-skeleton";

import Labels from "./Labels";

const ProductCardHolder = ({
  products,
  setCartItems,
  cartItems,
  parentComponent,
  handleUpdateDesiredAmount,
  custom_xs = 12,
  custom_sm = 4,
  custom_md = 3,
  custom_lg = 3,
  isItCalledFromFavoritesPage = false,
  setFavoriteItems,
}) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [addedProductId, setAddedProductId] = useState(null);
  const currentUserId = localStorage.getItem("user_id");
  const [isThereFavoritesUpdateOperation, setIsThereFavoritesUpdateOperation] =
    useState(false);
  const [isThereAddToCartOperation, setIsThereAddToCartOperation] =
    useState(false);
  const [favorites, setFavorites] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize favorites state based on the products data
    const initialFavorites = {};
    products.forEach((product) => {
      initialFavorites[product.product_id] = product.is_favorite || false;
    });
    setFavorites(initialFavorites);
  }, [products]);

  const handleAddToCart = async (product) => {
    if (localStorage.getItem("user_id")) {
      setIsThereAddToCartOperation(true);
      const price_on_add =
        product.discountedPrice !== null
          ? product.discountedPrice
          : product.price;

      try {
        const response = await axios.post(
          `http://localhost:3002/addToCart/${currentUserId}/${product.product_id}/${price_on_add}`
        );

        if (response.status === 201) {
          setIsThereAddToCartOperation(false);
          const insertedRow = response.data;
          setCartItems([...cartItems, insertedRow]);
        }
      } catch (error) {
        setIsThereAddToCartOperation(false);
        alert("Product could not be added to your cart");
        console.log(error);
      }
    } else {
      errorToast("You should log in first to add product to your cart!");
      navigate("/login");
    }
  };

  const handleAddToFavorites = async (product) => {
    if (localStorage.getItem("user_id")) {
      setIsThereFavoritesUpdateOperation(true);

      if (product.is_favorite) {
        // If it exists, remove it from the favorites array

        try {
          const response = await axios.delete(
            `http://localhost:3002/removeFromFavorite/${currentUserId}/${product.product_id}`
          );
          if (isItCalledFromFavoritesPage) {
            setFavoriteItems(
              products.filter((item) => product.product_id !== item.product_id)
            );
          }

          setIsThereFavoritesUpdateOperation(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        // If it doesn't exist, add it to the favorites array
        try {
          const response = await axios.post(
            `http://localhost:3002/addToFavorite/${currentUserId}/${product.product_id}`
          );
        } catch (error) {
          console.log(error);
        }

        setIsThereFavoritesUpdateOperation(false);
      }
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [product.product_id]: !favorites[product.product_id],
      }));
    } else {
      errorToast("You should log in first to add product to your favorites!");
      navigate("/login");
    }
  };

  const handleProductCardMouseEnter = (product_id) => {
    setHoveredProductId(product_id);
  };

  const handleProductCardMouseLeave = () => {
    setHoveredProductId(null);
  };

  const isItemAddedToCart = (product) => {
    console.log("cartItems", cartItems);
    return cartItems
      ? cartItems.some((item) => item.product_id === product.product_id)
      : false;
  };

  const getCartItemAmount = (product_id) => {
    console.log("ajajjaj", cartItems, " ve product_id: ", product_id);

    const cartItem = cartItems.find((item) => item.product_id === product_id);
    return cartItem ? cartItem.desired_amount : 0;
  };

  const renderStars = (starPoint) => {
    const starElements = [];
    const fullStars = Math.floor(starPoint);
    const hasHalfStar = starPoint - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starElements.push(
          <TiStarFullOutline key={i} style={{ color: "rgb(245, 195, 69)" }} />
        );
      } else if (i === fullStars && hasHalfStar) {
        starElements.push(
          <TiStarHalfOutline key={i} style={{ color: "rgb(245, 195, 69)" }} />
        );
      } else {
        starElements.push(<TiStarOutline key={i} />);
      }
    }

    return starElements;
  };

  return (
    <Grid container spacing={3} style={{ overflowX: "hidden" }}>
      <LoaderInBackdrop
        isThereUpdateOperation={
          isThereFavoritesUpdateOperation || isThereAddToCartOperation
        }
      ></LoaderInBackdrop>
      {products.map((product) => (
        <>
          {console.log("render edilen productlar ", products)}

          <Grid
            item
            key={product.id}
            xs={custom_xs}
            sm={custom_sm}
            md={custom_md}
            lg={custom_lg}
          >
            <Card
              style={{
                width: "100%",
                height: "310px",
                position: "relative",
                cursor: "pointer",
              }}
              onMouseEnter={() =>
                handleProductCardMouseEnter(product.product_id)
              }
              onMouseLeave={handleProductCardMouseLeave}
              onClick={() => {
                navigate(
                  `/category/${product.category_id}/${product.sub_category_id}/${product.product_id}`
                );
              }}
            >
              <IconButton
                style={{
                  position: "absolute",
                  right: 5,
                  top: 5,
                  backgroundColor: "white",
                  padding: "5px",
                }}
                aria-label="Add to favorites"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToFavorites(product);
                }}
              >
                {favorites[product.product_id] ? (
                  favorites[product.product_id] === true ? (
                    <Favorite color="secondary" style={{ fontSize: 16 }} />
                  ) : (
                    <FavoriteBorder style={{ fontSize: 16 }} />
                  )
                ) : (
                  <FavoriteBorder style={{ fontSize: 16 }} />
                )}
              </IconButton>
              <CardMedia
                component="img"
                image={product.image}
                style={{ width: "100%", height: "50%" }}
              />
              <CardContent style={{ paddingTop: "10px" }}>
                <Typography
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    width: "fit-content",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onMouseOver={(e) => (e.target.style.color = "#00990F")}
                    onMouseOut={(e) => (e.target.style.color = "black")}
                    onClick={() => {
                      navigate(
                        `/manufacturer/${product.manufacturerId}/${product.manufacturerName}`
                      );
                    }}
                  >
                    {product.manufacturerName}
                  </div>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    width: "fit-content",
                  }}
                >
                  {product.productName}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    marginTop: "4px",
                  }}
                >
                  {product.campaigns &&
                    product.campaigns.map((item, index) => {
                      return (
                        <div style={{ marginRight: "2px" }}>
                          <Labels labelName={item}></Labels>
                        </div>
                      );
                    })}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "12px",
                    marginTop: "4px",
                    alignItems: "center",
                    width: "fit-content",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {renderStars(product.starPoint)}
                  <span
                    style={{
                      marginLeft: "2px",
                      fontSize: "10px",
                    }}
                  >{`(${product.ratingsCount})`}</span>
                </div>

                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize:
                      product.discountedPrice === null ? "14px" : "12px",
                    textDecoration:
                      product.discountedPrice === null
                        ? "none"
                        : "line-through",
                    color:
                      product.discountedPrice === null ? "#00990F" : "#707070",
                  }}
                >
                  {product.price}₺
                </Typography>
                {product.discountedPrice !== null && (
                  <Typography
                    style={{
                      color: "#00990F",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.discountedPrice}₺
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <div
                  style={{
                    display: "flex",
                    height: "25px",
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    left: "5px",
                  }}
                >
                  {isItemAddedToCart(product) ? (
                    <>
                      <div style={{ width: "60%" }}>
                        <IncrementDecrementButtonGroup
                          counterWidth="500px"
                          height="25"
                          initialValue={getCartItemAmount(product.product_id)}
                          item={product}
                          handleUpdateDesiredAmount={handleUpdateDesiredAmount}
                        />
                      </div>
                      <Typography
                        style={{
                          width: "40%",
                          display: "flex",
                          backgroundColor: "#2FB009",
                          borderRadius: "3px",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "none",
                          color: "white",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/cart");
                        }}
                      >
                        Buy Now
                      </Typography>
                    </>
                  ) : (
                    <MyButton
                      hoveredProductId={hoveredProductId}
                      id={product.product_id}
                      buttonText={"Add to Cart"}
                      onClick={(e) => {
                        handleAddToCart(product);
                      }}
                    ></MyButton>
                  )}
                </div>
              </CardActions>
            </Card>
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default ProductCardHolder;
