import logo from "./logo.svg";
import "./App.css";
import ProductCardHolder from "./ProductCardHolder";
function App() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is product 1 description.",
      price: 10.99,
      amount: 1,
      image: "https://via.placeholder.com/300x200.png?text=Product+1",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is product 2 description.",
      price: 19.99,
      amount: 1,
      image: "https://via.placeholder.com/300x200.png?text=Product+2",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is product 3 description.",
      price: 5.99,
      amount: 1,
      image: "https://via.placeholder.com/300x200.png?text=Product+3",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is product 3 description.",
      price: 5.99,
      amount: 1,
      image: "https://via.placeholder.com/300x200.png?text=Product+3",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is product 3 description.",
      price: 5.99,
      amount: 1,
      image: "https://via.placeholder.com/300x200.png?text=Product+3",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is product 3 description.",
      price: 5.99,
      amount: 1,
      image: "https://via.placeholder.com/300x200.png?text=Product+3",
    },
  ];

  const currUserFavoriteProductsIds = [1, 2];

  return (
    <ProductCardHolder
      products={products}
      currUserFavoriteProductsIds={currUserFavoriteProductsIds}
    />
  );
}

export default App;
