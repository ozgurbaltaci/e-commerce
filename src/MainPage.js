import React, { useEffect, useState } from "react";
import ProductCardHolder from "./ProductCardHolder";
import { Button } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";
import IncrementDecrementButtonGroup from "./IncrementDecrementButtonGroup";

const MainPage = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      manufacturorName: "Manufacturor name",
      productName: "Product Name",
      price: 10.99,
      discountedPrice: null,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 2,
      manufacturorName: "Manufacturor name",
      productName: "Product Name",
      price: 19.99,
      discountedPrice: 10.99,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 3,
      manufacturorName: "Manufacturor name",
      productName: "Product Name",
      price: 5.99,
      discountedPrice: null,
      starPoint: 3.5,

      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 4,
      manufacturorName: "Manufacturor name",
      productName: "Product Name",
      price: 5.99,
      discountedPrice: null,
      starPoint: 2,

      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 5,
      manufacturorName: "Manufacturor name",
      productName: "Product Name",
      price: 5.99,
      discountedPrice: null,
      starPoint: 3.3,

      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 6,
      manufacturorName: "Manufacturor name",
      productName: "Product Name",
      price: 5.99,
      discountedPrice: null,
      starPoint: 3,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
  ];

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
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    //TODO: getCartItems first with the GET method.
    setCartItems(productsInCart);
  }, []);

  const currUserFavoriteProductsIds = [1, 2];
  return (
    <>
      {console.log("deneme")}
      <Button onClick={() => navigate("/cart")}>{cartItems.length}</Button>
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
