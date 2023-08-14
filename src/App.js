import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import MainPage from "./MainPage";
import Cart from "./Cart";
import Favorites from "./Favorites";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/" element={<MainPage />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
