import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import MyButton from "./components/MyButton";

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
  currUserFavoriteProductsIds,
  setCartItems,
  cartItems,
}) => {
  const [favorites, setFavorites] = useState(currUserFavoriteProductsIds);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [addedProductId, setAddedProductId] = useState(null);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, { ...product, desiredAmount: 1 }]);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedItems);
  };

  const handleIncreaseAmount = (productId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, desiredAmount: item.desiredAmount + 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  const handleDecreaseAmount = (productId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === productId) {
        const newAmount = item.desiredAmount - 1;
        if (newAmount <= 0) {
          return null;
        } else {
          return { ...item, desiredAmount: newAmount };
        }
      } else {
        return item;
      }
    });
    const filteredItems = updatedItems.filter((item) => item !== null);
    setCartItems(filteredItems);
  };

  const handleAddToFavorites = (product) => {
    const index = favorites.indexOf(product.id);
    if (index !== -1) {
      // If it exists, remove it from the favorites array

      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== product.id)
      );
    } else {
      // If it doesn't exist, add it to the favorites array
      setFavorites((prevFavorites) => [...prevFavorites, product.id]);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some((favId) => favId === productId);
  };

  const handleProductCardMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleProductCardMouseLeave = () => {
    setHoveredProductId(null);
  };

  const isItemAddedToCart = (product) => {
    return cartItems.some((item) => item.id === product.id);
  };

  const getCartItemAmount = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.desiredAmount : 0;
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
      {products.map((product) => (
        <>
          <Grid item key={product.id}>
            <Card
              style={{
                width: 260,
                height: 384,
                position: "relative",
              }}
              onMouseEnter={() => handleProductCardMouseEnter(product.id)}
              onMouseLeave={handleProductCardMouseLeave}
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
                onClick={() => handleAddToFavorites(product)}
              >
                {isFavorite(product.id) ? (
                  <Favorite color="secondary" style={{ fontSize: 16 }} />
                ) : (
                  <FavoriteBorder style={{ fontSize: 16 }} />
                )}
              </IconButton>
              <CardMedia
                component="img"
                image={product.image}
                style={{ width: 274, height: 224 }}
              />
              <CardContent style={{ paddingTop: "10px" }}>
                <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {product.manufacturerName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.productName}
                </Typography>
                <div style={{ display: "flex", marginTop: "4px" }}>
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
                      product.discountedPrice === "NaN" ? "14px" : "12px",
                    textDecoration:
                      product.discountedPrice === "NaN"
                        ? "none"
                        : "line-through",
                    color:
                      product.discountedPrice === "NaN" ? "#00990F" : "#707070",
                  }}
                >
                  {product.price}₺
                </Typography>
                {product.discountedPrice !== "NaN" && (
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
                          item={product}
                          handleDecreaseAmount={handleDecreaseAmount}
                          initialValue={getCartItemAmount(product.id)}
                          handleIncreaseAmount={handleIncreaseAmount}
                        ></IncrementDecrementButtonGroup>
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
                        }}
                      >
                        Buy Now
                      </Typography>
                    </>
                  ) : (
                    <MyButton
                      hoveredProductId={hoveredProductId}
                      productId={product.id}
                      buttonText={"Add to Cart"}
                      onClick={() => handleAddToCart(product)}
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
