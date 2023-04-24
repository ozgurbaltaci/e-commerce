import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
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

import { FiPackage } from "react-icons/fi";
import { GoTag } from "react-icons/go";
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";

import Labels from "./Labels";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Regular 400",
    fontSize: 12,
    fontWeightRegular: 400,
    fontWeightMedium: 500,

    h1: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 28,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 22,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.2,
    },
  },
});

const ProductCardHolder = ({
  products,
  onAddToCart,
  currUserFavoriteProductsIds,
  currUserCartItems,
}) => {
  const [favorites, setFavorites] = useState(currUserFavoriteProductsIds);
  const [cart, setCart] = useState(currUserCartItems);
  const [cartItems, setCartItems] = useState({});
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [product.id]: prevCartItems[product.id]
        ? prevCartItems[product.id] + 1
        : 1,
    }));
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [product.id]: prevCartItems[product.id]
        ? prevCartItems[product.id] - 1
        : 0,
    }));
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

  const productsInCart = [
    {
      id: 1,
      name: "Manufacturor name",
      description: "This is Manufacturor name description.",
      price: 10.99,
      discountedPrice: null,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 2,
      name: "Manufacturor name",
      description: "This is Manufacturor name description.",
      price: 19.99,
      discountedPrice: 10.99,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={() =>
          navigate("/cart", {
            state: { productsInCart: productsInCart },
          })
        }
      >
        {currUserCartItems.length}
      </Button>
      <Grid container spacing={3} style={{ overflowX: "hidden" }}>
        {products.map((product) => (
          <Grid item key={product.id}>
            <Card
              style={{ width: 274, height: 384, position: "relative" }}
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
                alt={product.name}
                style={{ width: 274, height: 224 }}
              />
              <CardContent style={{ paddingTop: "10px" }}>
                <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
                <div style={{ display: "flex", marginTop: "4px" }}>
                  <div style={{ marginRight: "2px" }}>
                    <Labels
                      labelIcon={
                        <FiPackage style={{ fontSize: "6px" }}></FiPackage>
                      }
                      labelName="Free Shipping"
                    ></Labels>
                  </div>

                  <Labels
                    labelIcon={<GoTag style={{ fontSize: "6px" }}></GoTag>}
                    labelName="1 get 1 free"
                  ></Labels>
                </div>
                <div style={{ fontSize: "12px", marginTop: "4px" }}>
                  <TiStarFullOutline
                    style={{ color: "rgb(245, 195, 69)" }}
                  ></TiStarFullOutline>
                  <TiStarFullOutline
                    style={{ color: "rgb(245, 195, 69)" }}
                  ></TiStarFullOutline>
                  <TiStarOutline></TiStarOutline>
                  <TiStarOutline></TiStarOutline>
                  <TiStarOutline></TiStarOutline>
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
                  <Typography variant="h6" style={{ color: "#00990F" }}>
                    {product.discountedPrice}₺
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <button
                  style={{
                    display: hoveredProductId === product.id ? "flex" : "none",
                    height: "25px",
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    left: "5px",

                    backgroundColor: "#2FB009",
                    borderRadius: "3px",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    color: "white",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default ProductCardHolder;
