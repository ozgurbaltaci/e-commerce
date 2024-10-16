import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import ProductCardHolder from "./ProductCardHolder";
import ProductCardSkeleton from "./ProductCardSkeleton";

import LoaderInBackdrop from "./components/LoaderInBackdrop";

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [isThereUpdateOperation, setIsThereUpdateOperation] = useState(false);

  useEffect(() => {
    //get Cart Items HTTP request will be here

    axios
      .get(`https://e-commerce-back-end-two.vercel.app/getCart`) // Make a GET request with Axios, including the product_id as a parameter in the URL
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://e-commerce-back-end-two.vercel.app/getFavoritesOfUser`) // Make a GET request with Axios, including the product_id as a parameter in the URL
      .then((response) => {
        setFavoriteItems(response.data);
        setIsProductsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [isThereUpdateOperation]);

  const handleUpdateDesiredAmount = async (product_id, newAmount) => {
    setIsThereUpdateOperation(true);
    try {
      // Check if the newAmount is 0 and call removeFromCart endpoint
      if (newAmount === 0) {
        const updatedItems = cartItems.filter(
          (item) => item.product_id !== product_id
        );
        setCartItems(updatedItems);
        await axios.delete(
          `https://e-commerce-back-end-two.vercel.app/removeFromCart/${product_id}`
        );
        setIsThereUpdateOperation(false);
        return; // Exit the function early if removeFromCart is called
      }

      const response = await axios.put(
        `https://e-commerce-back-end-two.vercel.app/updateDesiredAmount/${product_id}`,
        {
          desired_amount: newAmount,
        }
      );

      if (response.status === 200) {
        console.log("Cart items: ", cartItems);

        setIsThereUpdateOperation(false);
      } else {
        console.error("Failed to update desired amount.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <LoaderInBackdrop
        isThereUpdateOperation={isThereUpdateOperation}
      ></LoaderInBackdrop>
      <h2>My Favorites</h2>

      {isProductsLoading ? (
        <Grid container spacing={3} style={{ overflowX: "hidden" }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item key={index} xs={12} sm={4} md={3} lg={3}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : !favoriteItems.length > 0 ? (
        <>
          <p>
            Your favorite items will appear here! Currently, you haven't added
            any favorite products. Get started by choosing the items you like
            and adding them to your favorites.
          </p>
        </>
      ) : (
        <ProductCardHolder
          products={favoriteItems}
          setProducts={setFavoriteItems}
          isItCalledFromFavoritesPage={true}
        />
      )}
    </>
  );
};

export default Favorites;
