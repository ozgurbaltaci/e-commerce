import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import MainPage from "./MainPage";
import Cart from "./Cart";
import Favorites from "./Favorites";
import Register from "./Register";
import Login from "./Login";
import AddProduct from "./AddProduct";
import Profile from "./Profile";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import SubCategoriesPage from "./SubCategoriesPage";
import ProductsOfSelectedSubCategoriesPage from "./ProductsOfSelectedSubCategoriesPage";
import ProductDeteailsPage from "./ProductDeteailsPage";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Cabin, sans-serif",
    fontSize: 12,
    fontWeightRegular: 400,
    fontWeightMedium: 500,

    h1: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 28,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 22,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.2,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "0px 90px 0px 90px" }}>
        <NavBar></NavBar>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/category/:categoryId/:categoryName"
            element={<SubCategoriesPage />}
          />

          <Route
            path="/category/:categoryId/:categoryName/:subCategoryId/:subCategoryName"
            element={<ProductsOfSelectedSubCategoriesPage />}
          />

          <Route
            path="category/:categoryId/:subCategoryId/:productId"
            element={<ProductDeteailsPage />}
          />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/addProduct" element={<AddProduct />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
