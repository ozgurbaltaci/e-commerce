import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";

import axios from "axios";

const SubCategoriesPage = () => {
  const { categoryId, categoryName } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://handygreen-back-end.vercel.app/getSubCategoriesOfCurrentCategory/${categoryId}`
      )
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleClick = (sub_category_id, sub_category_name) => {
    // Navigate to the dynamic category route when a category is clicked
    navigate(
      `/category/${categoryId}/${categoryName}/${sub_category_id}/${sub_category_name}`
    );
  };

  return (
    <div>
      {console.log("subCategories:", subCategories)}

      <div
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "15px" }}
      >
        {categoryName}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Grid container spacing={2}>
          {subCategories.map((subCategory, index) => (
            <Grid item xs={6} sm={4} md={3} lg={3}>
              <>
                <div
                  key={index}
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  <img
                    src={subCategory.sub_category_img}
                    style={{
                      width: "100%",
                      height: "125px",
                      borderRadius: "7px",
                    }}
                    alt={subCategory.sub_category_name}
                    onClick={() => {
                      handleClick(
                        subCategory.sub_category_id,
                        subCategory.sub_category_name
                      );
                    }}
                  />
                  <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                    {subCategory.sub_category_name}
                  </div>
                </div>
              </>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default SubCategoriesPage;
