import React, { useEffect, useState } from "react";
import ProductCardHolder from "./ProductCardHolder";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "./components/BreadCrumb";
import SideBarOfAllCategories from "./SideBarOfAllCategories";
import { Avatar } from "@mui/material";
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";

const SellerPage = () => {
  const { manufacturerId, manufacturerName } = useParams();

  const [manufacturerInfo, setManufacturerInfo] = useState({});
  const [productsOfManufacturer, setProductsOfManufacturer] = useState([]);

  const breadCrumbData = [
    { name: "Home Page", navigation: "/mainPage" },
    {
      name: manufacturerName,
      navigation: `/manufacturer/${manufacturerId}/${manufacturerName}`,
    },
  ];
  useEffect(() => {
    try {
      axios
        .get(
          `https://e-commerce-back-end-two.vercel.app/getManufacturerAndProducts/${manufacturerId}`
        )
        .then((response) => {
          const data = response.data;
          setManufacturerInfo(data.manufacturerInfo);
          setProductsOfManufacturer(data.productsOfManufacturer);
        });
    } catch (err) {}
  }, [manufacturerId]);

  const renderStars = (starPoint) => {
    const starElements = [];
    const fullStars = Math.floor(starPoint);
    const hasHalfStar = starPoint - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starElements.push(
          <TiStarFullOutline key={i} style={{ color: "rgb(245, 195, 69)" }} />
        );
      } else if (i === fullStars && hasHalfStar) {
        starElements.push(
          <TiStarHalfOutline key={i} style={{ color: "rgb(245, 195, 69)" }} />
        );
      } else {
        starElements.push(<TiStarOutline key={i} />);
      }
    }

    return starElements;
  };

  return (
    <>
      <Breadcrumb breadCrumbData={breadCrumbData} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <div style={{ width: "80%", display: "flex", alignItems: "center" }}>
          <Avatar
            src={manufacturerInfo.manufacturer_image}
            sx={{
              width: "88px",
              height: "88px",
              backgroundColor: "#EDEDED",
              fontSize: "12px",
              color: "black",
              marginRight: "6px",
            }}
          ></Avatar>
          <div
            style={{ fontWeight: "bold", fontSize: "20px", color: "#00990F" }}
          >
            {manufacturerInfo.manufacturer_name}
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "20%" }}
        >
          {" "}
          {renderStars(manufacturerInfo.manufacturer_rating)}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <ProductCardHolder
          products={productsOfManufacturer}
          setProducts={setProductsOfManufacturer}
          custom_xs={12}
          custom_sm={6}
          custom_md={3}
          custom_lg={3}
        />
      </div>
    </>
  );
};

export default SellerPage;
