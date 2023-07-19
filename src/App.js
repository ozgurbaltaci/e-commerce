import logo from "./logo.svg";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import MainPage from "./MainPage";
import Cart from "./Cart";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/" element={<MainPage />} />

      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
