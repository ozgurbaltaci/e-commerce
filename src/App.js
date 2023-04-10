import logo from "./logo.svg";
import "./App.css";
import ProductCardHolder from "./ProductCardHolder";
function App() {
  const products = [
    {
      id: 1,
      name: "Manufacturor name",
      description: "This is Manufacturor name description.",
      price: 10.99,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 2,
      name: "Manufacturor name",
      description: "This is Manufacturor name description.",
      price: 19.99,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 3,
      name: "Manufacturor name",
      description: "This is Manufacturor name description.",
      price: 5.99,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 4,
      name: "Manufacturor name",
      description: "This is Manufacturor name description.",
      price: 5.99,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 5,
      name: "Manufacturor name",
      description: "This is Manufacturor name description.",
      price: 5.99,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
    },
    {
      id: 6,
      name: "Manufacturor name",
      description: "This is Manufacturor name description.",
      price: 5.99,
      amount: 1,
      image:
        "https://www.southernliving.com/thmb/Jvr-IldH7yuDqqcv7PU8tPDdOBQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1206682746-2000-ff74cd1cde3546a5be6fec30fee23cc7.jpg",
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
