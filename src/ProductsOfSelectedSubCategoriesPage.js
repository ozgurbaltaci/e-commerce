import React, { useEffect, useState } from "react";
import ProductCardHolder from "./ProductCardHolder";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "./components/BreadCrumb";
import SideBarOfAllCategories from "./SideBarOfAllCategories";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
} from "@mui/material";
import FilterBar from "./components/FilterBar";

const SubCategoriesPage = () => {
  const { categoryId, categoryName, subCategoryId, subCategoryName } =
    useParams();
  const [productsOfCurrentSubCategory, setProductsOfCurrentSubCategory] =
    useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

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
          `https://e-commerce-back-end-two.vercel.app/getProductsOfCurrentSubCategory/${subCategoryId}`
        )
        .then((response) => {
          setProductsOfCurrentSubCategory(response.data);
          setIsProductsLoading(false);
        });
    } catch (err) {}
  }, [categoryId, subCategoryId]);
  return (
    <>
      <Breadcrumb breadCrumbData={breadCrumbData} />
      <div style={{ display: "flex" }}>
        <SideBarOfAllCategories
          setIsProductsLoading={setIsProductsLoading}
          currentSelectedSubCategoryId={subCategoryId}
        ></SideBarOfAllCategories>

        <div style={{ width: "100%" }}>
          <FilterBar
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            productsToBeSorted={productsOfCurrentSubCategory}
            setProductsToBeSorted={setProductsOfCurrentSubCategory}
            selectedCategory={subCategoryId}
          ></FilterBar>
          {isProductsLoading ? (
            <div>Products are loading...</div>
          ) : (
            <ProductCardHolder
              products={productsOfCurrentSubCategory}
              setProducts={setProductsOfCurrentSubCategory}
              custom_xs={12}
              custom_sm={6}
              custom_md={3}
              custom_lg={3}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SubCategoriesPage;
