import { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  Remove,
  Add,
} from "@material-ui/icons";

const ProductCardHolder = ({
  products,
  onAddToCart,
  currUserFavoriteProductsIds,
}) => {
  const [favorites, setFavorites] = useState(currUserFavoriteProductsIds);
  const [cartItems, setCartItems] = useState({});

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [product.id]: prevCartItems[product.id]
        ? prevCartItems[product.id] + 1
        : 1,
    }));
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [product.id]: prevCartItems[product.id]
        ? prevCartItems[product.id] - 1
        : 0,
    }));
  };

  const handleAddToFavorites = (product) => {
    const index = favorites.indexOf(product.id);
    if (index !== -1) {
      // If it exists, remove it from the favorites array

      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== product.id)
      );
    } else {
      // If it doesn't exist, add it to the favorites array
      setFavorites((prevFavorites) => [...prevFavorites, product.id]);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some((favId) => favId === productId);
  };

  return (
    <Grid container spacing={3} style={{ overflowX: "hidden" }}>
      {console.log(favorites)}
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
              <Typography variant="h6">{product.price}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="Add to favorites"
                onClick={() => handleAddToFavorites(product)}
              >
                {isFavorite(product.id) ? (
                  <Favorite color="secondary" />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
              <IconButton
                aria-label="Add to cart"
                onClick={() => handleAddToCart(product)}
              >
                <AddShoppingCart />
              </IconButton>
              {cartItems[product.id] ? (
                <>
                  <IconButton
                    aria-label="Remove from cart"
                    onClick={() => handleRemoveFromCart(product)}
                    disabled={cartItems[product.id] === 1}
                  >
                    <Remove />
                  </IconButton>
                  <Typography>{cartItems[product.id]}</Typography>
                  <IconButton
                    aria-label="Add to cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <Add />
                  </IconButton>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCardHolder;
