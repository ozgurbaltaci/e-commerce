import { useState } from "react";
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

import Labels from "./Labels";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Regular 400",
    fontSize: 14,
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
}) => {
  const [favorites, setFavorites] = useState(currUserFavoriteProductsIds);
  const [cartItems, setCartItems] = useState({});

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

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3} style={{ overflowX: "hidden" }}>
        {products.map((product) => (
          <Grid item key={product.id}>
            <Card style={{ width: 274, height: 384, position: "relative" }}>
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
              <CardContent>
                <Typography
                  variant="h1"
                  style={{ fontSize: "12px" }}
                  gutterBottom
                >
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
                <div style={{ display: "flex" }}>
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

                <Typography variant="h6">{product.price}</Typography>
              </CardContent>
              <CardActions>
                <button
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "25px",
                    position: "relative",
                    bottom: "5px",
                    backgroundColor: "rgb(47, 176, 9)",
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
