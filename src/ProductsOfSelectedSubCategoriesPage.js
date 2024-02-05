import React, { useEffect, useState } from "react";
import ProductCardHolder from "./ProductCardHolder";
import { useParams } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const SubCategoriesPage = () => {
  const { subCategoryId, subCategoryName } = useParams();
  const [productsOfCurrentSubCategory, setProductsOfCurrentSubCategory] =
    useState([]);
  useEffect(() => {
    try {
      axios
        .get(
          `http://localhost:3002/getProductsOfCurrentSubCategory/${subCategoryId}`
        )
        .then((response) => {
          setProductsOfCurrentSubCategory(response.data);
        });
    } catch (err) {}
  }, []);
  return (
    <>
      <ProductCardHolder products={productsOfCurrentSubCategory} />
    </>
  );
};

export default SubCategoriesPage;
