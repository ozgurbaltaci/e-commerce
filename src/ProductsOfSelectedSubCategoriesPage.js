import React, { useEffect, useState } from "react";
import ProductCardHolder from "./ProductCardHolder";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "./components/BreadCrumb";

const SubCategoriesPage = () => {
  const { categoryId, categoryName, subCategoryId, subCategoryName } =
    useParams();
  const [productsOfCurrentSubCategory, setProductsOfCurrentSubCategory] =
    useState([]);

  const breadCrumbData = [
    { name: "Home Page", navigation: "/mainPage" },
    {
      name: categoryName,
      navigation: `/category/${categoryId}/${categoryName}`,
    },
    {
      name: subCategoryName,
      navigation: `/category/${categoryId}/${categoryName}/${subCategoryId}/${subCategoryName}`,
    },
  ];
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
      <Breadcrumb breadCrumbData={breadCrumbData} />
      <ProductCardHolder products={productsOfCurrentSubCategory} />
    </>
  );
};

export default SubCategoriesPage;
