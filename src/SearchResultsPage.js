import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCardHolder from "./ProductCardHolder";
import axios from "axios";

const SearchResultPage = () => {
  const { searchInput } = useParams();
  const [matchedProducts, setMatchedProducts] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      // Define the URL of the API you want to request
      let apiUrl = "http://localhost:3002/searchProducts";
      const userId = localStorage.getItem("user_id");
      if (userId) {
        apiUrl += `?user_id=${userId}`;
      }

      try {
        const response = await axios.get(apiUrl, {
          params: {
            searchInput,
          },
        });
        setMatchedProducts(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchInput]);

  return (
    <div>
      <h2>Search Results for "{searchInput}"</h2>
      <ProductCardHolder
        products={matchedProducts}
        setProducts={setMatchedProducts}
        custom_xs={12}
        custom_sm={6}
        custom_md={3}
        custom_lg={3}
      />
    </div>
  );
};

export default SearchResultPage;
