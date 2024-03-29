import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Button, Select, TextField, MenuItem } from "@material-ui/core";
import axios from "axios";

const ProductUpload = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const { manufacturer_id } = useParams();

  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    discounted_price: null,
    image: "",
    description: "",
    stock_quantity: 0,
    category_id: -1,
    sub_category_id: -1,
    manufacturer_id: manufacturer_id,
  });

  useEffect(() => {
    try {
      axios.get("http://localhost:3002/getCategories").then((response) => {
        setCategories(response.data);
        console.log("categories:", response.data);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_id") {
      setSelectedCategory(value);
      setSelectedSubCategory("");
      axios
        .get(`http://localhost:3002/getSubCategoriesOfCurrentCategory/${value}`)
        .then((response) => {
          setSubCategories(response.data);
          setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
            sub_category_id: -1,
          }));

          console.log("subcategories:", response.data);
        });
    }
    if (name === "sub_category_id") {
      setSelectedSubCategory(value);
    }
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target.result; // The Base64 representation of the image

      setProduct({ ...product, image: base64Image });
    };

    reader.readAsDataURL(file);
  };

  const handleUploadProduct = () => {
    axios
      .post("http://localhost:3002/uploadProduct", product)
      .then((response) => {
        alert("Product uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading product:", error);
        alert("Product upload failed.");
      });
  };

  return (
    <>
      {console.log(product)}
      <h2>Upload Product</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <div style={{ fontSize: "10px", fontWeight: "bold" }}>
            Product Name:
          </div>
          <TextField
            size="small"
            name="product_name"
            onChange={handleInputChange}
            value={product.product_name}
            fullWidth
            variant="outlined"
          />
        </div>

        <div>
          <div style={{ fontSize: "10px", fontWeight: "bold" }}>
            Product Price:
          </div>
          <TextField
            size="small"
            name="price"
            type="number"
            onChange={handleInputChange}
            value={product.price}
            fullWidth
            variant="outlined"
          />
        </div>
        <div>
          <div style={{ fontSize: "10px", fontWeight: "bold" }}>
            Product Discounted Price:
          </div>
          <TextField
            size="small"
            name="discounted_price"
            type="number"
            onChange={handleInputChange}
            value={product.discounted_price}
            fullWidth
            variant="outlined"
          />
        </div>
        <div>
          <div style={{ fontSize: "10px", fontWeight: "bold" }}>
            Product Category:
          </div>
          <Select
            size="small"
            name="category_id"
            onChange={handleInputChange}
            value={selectedCategory}
            fullWidth
            variant="outlined"
          >
            {categories.map((category) => (
              <MenuItem key={category.category_id} value={category.category_id}>
                {category.category_name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <div style={{ fontSize: "10px", fontWeight: "bold" }}>
            Product Sub-Category:
          </div>
          <Select
            size="small"
            name="sub_category_id"
            onChange={handleInputChange}
            value={selectedSubCategory}
            fullWidth
            variant="outlined"
          >
            {subCategories.map((sub_category) => (
              <MenuItem
                key={sub_category.sub_category_id}
                value={sub_category.sub_category_id}
              >
                {sub_category.sub_category_name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div>
          <div style={{ fontSize: "10px", fontWeight: "bold" }}>
            Product Description:
          </div>
          <TextField
            size="small"
            name="description"
            onChange={handleInputChange}
            value={product.description}
            fullWidth
            variant="outlined"
            rows={4}
          />
        </div>
        <div>
          <div style={{ fontSize: "10px", fontWeight: "bold" }}>
            Product Stock Quantity:
          </div>
          <TextField
            size="small"
            name="stock_quantity"
            type="number"
            onChange={handleInputChange}
            value={product.stock_quantity}
            fullWidth
            variant="outlined"
          />
        </div>
        {/* Add input fields for variations, shippingInformation, relatedProducts, and campaigns */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ margin: "10px 0" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUploadProduct}
        >
          Upload Product
        </Button>
      </div>
    </>
  );
};

export default ProductUpload;
