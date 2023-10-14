import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

const ProductUpload = () => {
  const [product, setProduct] = useState({
    manufacturerName: "",
    productName: "",
    price: 0,
    discountedPrice: null,
    image: "",
    category: "",
    description: "",
    stockQuantity: 0,
    //variations: [],
    /*shippingInformation: {
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
    },*/
    //relatedProducts: [],
    //campaigns: [],
    toBeDeliveredDate: "",
    productStatus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
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
      .post("http://localhost:3002/uploadProduct", product) // Replace with your API endpoint
      .then((response) => {
        alert("Product uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading product:", error);
        alert("Product upload failed.");
      });
  };

  return (
    <div>
      <h2>Upload Product</h2>

      <TextField
        name="manufacturerName"
        label="Manufacturer Name"
        onChange={handleInputChange}
        value={product.manufacturerName}
        fullWidth
      />
      <TextField
        name="productName"
        label="Product Name"
        onChange={handleInputChange}
        value={product.productName}
        fullWidth
      />
      <TextField
        name="price"
        label="Price"
        type="number"
        onChange={handleInputChange}
        value={product.price}
        fullWidth
      />
      <TextField
        name="discountedPrice"
        label="Discounted Price"
        type="number"
        onChange={handleInputChange}
        value={product.discountedPrice}
        fullWidth
      />
      <TextField
        name="category"
        label="Category"
        onChange={handleInputChange}
        value={product.category}
        fullWidth
      />
      <TextField
        name="description"
        label="Description"
        onChange={handleInputChange}
        value={product.description}
        fullWidth
        multiline
        rows={4}
      />
      <TextField
        name="stockQuantity"
        label="Stock Quantity"
        type="number"
        onChange={handleInputChange}
        value={product.stockQuantity}
        fullWidth
      />
      <TextField
        name="toBeDeliveredDate"
        label="To Be Delivered Date"
        type="date"
        onChange={handleInputChange}
        value={product.toBeDeliveredDate}
        fullWidth
      />
      <TextField
        name="productStatus"
        label="Product Status"
        onChange={handleInputChange}
        value={product.productStatus}
        fullWidth
      />
      {/* Add input fields for variations, shippingInformation, relatedProducts, and campaigns */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ margin: "10px 0" }}
      />
      <Button variant="contained" color="primary" onClick={handleUploadProduct}>
        Upload Product
      </Button>
    </div>
  );
};

export default ProductUpload;
