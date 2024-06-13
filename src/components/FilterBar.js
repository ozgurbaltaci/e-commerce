import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const FilterBar = ({
  sortOrder,
  setSortOrder,
  productsToBeSorted,
  setProductsToBeSorted,
  inStockOnly,
  setInStockOnly,
  selectedCategory,
}) => {
  const [initialProducts, setInitialProducts] = useState([]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleStockChange = (event) => {
    setInStockOnly(event.target.checked);
  };

  useEffect(() => {
    setSortOrder(""); // Reset sort order when category changes
  }, [selectedCategory, setSortOrder]);
  useEffect(() => {
    if (initialProducts.length === 0) {
      setInitialProducts(productsToBeSorted);
    }
  }, [productsToBeSorted, initialProducts]);

  useEffect(() => {
    let filteredProducts = [...productsToBeSorted];
    if (inStockOnly) {
      filteredProducts = filteredProducts.filter(
        (product) => product.stockQuantity > 0
      );
    }
    if (sortOrder === "asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setProductsToBeSorted(filteredProducts);
  }, [sortOrder, inStockOnly, setProductsToBeSorted]);

  return (
    <div
      style={{
        height: "50px",
        backgroundColor: "#F7F6F2",
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginBottom: "10px",
        justifyContent: "space-between", // Align items with space between
      }}
    >
      <div style={{ margin: "15px" }}>
        <FormControlLabel
          control={
            <Checkbox
              style={{
                color: "#00990F",
                fontSize: "8px",
                transform: "scale(0.8)",
              }}
              checked={inStockOnly}
              onChange={handleStockChange}
            />
          }
          sx={{
            ".MuiTypography-body1": {
              fontFamily: "Cabin",
              fontSize: "12px",
              marginLeft: "-3px",
            },
          }}
          label="In Stock Only"
        />
      </div>

      <div style={{ display: "flex", margin: "15px" }}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="asc">Price: Low to High</MenuItem>
            <MenuItem value="desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterBar;
