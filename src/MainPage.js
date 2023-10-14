import React, { useEffect, useState } from "react";
import ProductCardHolder from "./ProductCardHolder";
import { Button } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";
import IncrementDecrementButtonGroup from "./IncrementDecrementButtonGroup";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();

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
  const favoritesOfUser = [
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
    {
      id: 3,
      manufacturorName: "Manufacturor name",
      productName: "Product Name",
      price: 19.99,
      discountedPrice: 10.99,
      desiredAmount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
  ];
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //TODO: getCartItems first with the GET method.

    // Define the URL of the API you want to request
    const apiUrl = "http://localhost:3002/getProducts"; // Replace with your API URL

    // Use Axios to make the GET request
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        alert("Error fetching data:", error);
      });

    setCartItems(productsInCart);
    setFavoriteItems(favoritesOfUser);
  }, []); // The empty array as the second argument makes this useEffect run once on component mount

  const currUserFavoriteProductsIds = [1, 2];
  return (
    <>
      {console.log("deneme")}
      <Button onClick={() => navigate("/cart")}>
        cart: {cartItems.length}
      </Button>
      <Button onClick={() => navigate("/favorites")}>
        Favorites: {favoriteItems.length}
      </Button>

      <ProductCardHolder
        products={products}
        currUserFavoriteProductsIds={currUserFavoriteProductsIds}
        setCartItems={setCartItems}
        cartItems={cartItems}
      />
    </>
  );
};

export default MainPage;
