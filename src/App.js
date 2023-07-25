import logo from "./logo.svg";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import MainPage from "./MainPage";
import Cart from "./Cart";
import Favorites from "./Favorites";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/" element={<MainPage />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
