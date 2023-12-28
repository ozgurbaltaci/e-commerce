import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import ProductCardHolder from "./ProductCardHolder";
import ProductCardSkeleton from "./ProductCardSkeleton";

import {
  Card,
  CardContent,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@material-ui/core";

import AddProduct from "./AddProduct";

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [currUserFavoriteProductsIds, setCurrUserFavoriteProductsIds] =
    useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  const productsInCart = [
    {
      id: 1,
      manufacturorName: "Manufacturor name",
      productName: "Product Name",
      price: 10.99,
      discountedPrice: null,
      desiredAmount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 2,
      manufacturorName: "Manufacturor name",
      productName: "Product Name",
      price: 19.99,
      discountedPrice: 10.99,
      desiredAmount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
  ];

  const [cartItems, setCartItems] = useState(productsInCart);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    axios
      .get(`http://localhost:3002/getFavoritesOfUser/${user_id}`) // Make a GET request with Axios, including the product_id as a parameter in the URL
      .then((response) => {
        setFavoriteItems(response.data);
        setIsProductsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [favoriteItems]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    axios
      .get(`http://localhost:3002/getFavoritesIdsOfUser/${user_id}`) // Make a GET request with Axios, including the product_id as a parameter in the URL
      .then((response) => {
        setCurrUserFavoriteProductsIds(response.data);
        console.log("idssss: ", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <h2>My Favorites</h2>
      {!favoriteItems.length > 0 && (
        <>
          <p>
            Your favorite items will appear here! Currently, you haven't added
            any favorite products. Get started by choosing the items you like
            and adding them to your favorites.
          </p>
        </>
      )}
      {isProductsLoading ? (
        <Grid container spacing={3} style={{ overflowX: "hidden" }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item key={index} xs={12} sm={4} md={3} lg={3}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : (
        <ProductCardHolder
          products={favoriteItems}
          currUserFavoriteProductsIds={currUserFavoriteProductsIds}
          setCartItems={setCartItems}
          cartItems={cartItems}
        />
      )}
    </>
  );
};

export default Favorites;
