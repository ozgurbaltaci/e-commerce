import React, { useEffect, useState } from "react";
import ProductCardHolder from "./ProductCardHolder";
import { Button, Avatar } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";
import IncrementDecrementButtonGroup from "./IncrementDecrementButtonGroup";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

import { Grid } from "@material-ui/core";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Carousel from "./components/Carousel";
import CategoryBox from "./components/CategoryBox";
import LoaderInBackdrop from "./components/LoaderInBackdrop";

const MainPage = () => {
  const navigate = useNavigate();
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isThereUpdateOperation, setIsThereUpdateOperation] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const [allSubCategories, setAllSubCategories] = useState([]);

  useEffect(() => {
    //TODO: getCartItems first with the GET method.

    // Define the URL of the API you want to request
    const apiUrl = `http://localhost:3002/getProducts?user_id=${localStorage.getItem(
      "user_id"
    )}`;

    // Use Axios to make the GET request
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setIsProductsLoading(false);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        alert("Error fetching data:", error);
      });
  }, []); // The empty array as the second argument makes this useEffect run once on component mount

  useEffect(() => {
    //TODO: getCartItems first with the GET method.

    // Define the URL of the API you want to request
    const apiUrl = "http://localhost:3002/getCategories"; // Replace with your API URL

    // Use Axios to make the GET request
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
        setIsCategoriesLoading(false);
        console.log("categoriess:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        alert("Error fetching data:", error);
      });
  }, []); // The empty array as the second argument makes this useEffect run once on component mount

  useEffect(() => {
    //get Cart Items HTTP request will be here
    const user_id = localStorage.getItem("user_id");
    axios
      .get(`http://localhost:3002/getCart/${user_id}`) // Make a GET request with Axios, including the product_id as a parameter in the URL
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    axios
      .get(`http://localhost:3002/getAllSubCategories`)
      .then((response) => {
        setAllSubCategories(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleUpdateDesiredAmount = async (product_id, newAmount) => {
    setIsThereUpdateOperation(true);
    try {
      const user_id = localStorage.getItem("user_id");

      // Check if the newAmount is 0 and call removeFromCart endpoint
      if (newAmount === 0) {
        const updatedItems = cartItems.filter(
          (item) => item.product_id !== product_id
        );
        setCartItems(updatedItems);
        await axios.delete(
          `http://localhost:3002/removeFromCart/${user_id}/${product_id}`
        );
        setIsThereUpdateOperation(false);
        return; // Exit the function early if removeFromCart is called
      }

      const response = await axios.put(
        `http://localhost:3002/updateDesiredAmount/${user_id}/${product_id}`,
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

  const handleClick = (
    category_id,
    category_name,
    sub_category_id,
    sub_category_name
  ) => {
    // Navigate to the dynamic category route when a category is clicked
    navigate(
      `/category/${category_id}/${category_name}/${sub_category_id}/${sub_category_name}`
    );
  };

  return (
    <>
      <LoaderInBackdrop
        isThereUpdateOperation={isThereUpdateOperation}
      ></LoaderInBackdrop>

      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Carousel></Carousel>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "20px",
                }}
              >
                {isCategoriesLoading
                  ? categories.map((category) => {
                      return (
                        <Skeleton width={"300px"} height={"120px"}></Skeleton>
                      );
                    })
                  : categories.map((category) => {
                      return (
                        <CategoryBox
                          categoryId={category.category_id}
                          category_name={category.category_name}
                          imagePath={category.category_img}
                          label={category.category_name}
                        ></CategoryBox>
                      );
                    })}
              </div>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            display: "flex",
            gap: "15px",
            width: "100%",
            overflowX: "scroll",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "130px",
              height: "130px",
            }}
          ></div>
          {allSubCategories.map((subCategory, index) => (
            <div
              key={index}
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => {
                handleClick(
                  subCategory.category_id,
                  subCategory.category_name, //undefined niye geliyor
                  subCategory.sub_category_id,
                  subCategory.sub_category_name
                );
              }}
            >
              <Avatar
                key={index}
                alt={subCategory.sub_category_name}
                src={subCategory.sub_category_img}
                style={{
                  width: "130px",
                  height: "130px",
                }}
              />
              <div
                style={{
                  width: "130px",
                  height: "26px",
                  overflowX: "scroll",
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginTop: "5px",
                }}
              >
                {subCategory.sub_category_name}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{ fontWeight: "bold", fontSize: "17px", marginBottom: "12px" }}
        >
          Best Sellers of HandyGreen
        </div>
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
            products={products}
            setCartItems={setCartItems}
            cartItems={cartItems}
            handleUpdateDesiredAmount={handleUpdateDesiredAmount}
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
