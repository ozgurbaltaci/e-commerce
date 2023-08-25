import React, { useState } from "react";
import {
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  ListItem,
  Button,
  FormGroup,
} from "@material-ui/core";
import Labels from "./Labels";
import { FiPackage } from "react-icons/fi";
import IncrementDecrementButtonGroup from "./IncrementDecrementButtonGroup";
const CartItems = ({
  handleDecreaseAmount,
  handleIncreaseAmount,
  cartItems,
  setCartItems,
  manufacturerId,
  index,
  items,
  selectedProducts,
  onProductSelection,
}) => {
  const [checkedParent, setCheckedParent] = useState(false);
  const [checkedChildren, setCheckedChildren] = useState(
    items.map((item) => false)
  );

  const handleParentChange = () => {
    const newCheckedParent = !checkedParent;
    setCheckedParent(newCheckedParent);
    setCheckedChildren(
      newCheckedParent ? items.map(() => true) : items.map(() => false)
    );

    items.map((item) => {
      const productId = item.id;
      const isSelected = newCheckedParent;
      onProductSelection(productId, isSelected);
    });
  };

  const handleChildChange = (index) => {
    const newCheckedChildren = [...checkedChildren];
    newCheckedChildren[index] = !newCheckedChildren[index];
    setCheckedChildren(newCheckedChildren);
    setCheckedParent(newCheckedChildren.every((child) => child));

    const productId = items[index].id;
    const isSelected = newCheckedChildren[index];
    onProductSelection(productId, isSelected);
  };
  return (
    <FormGroup>
      <Card key={manufacturerId} style={{ marginTop: index !== 0 && "20px" }}>
        <CardContent style={{ padding: 0 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedParent}
                indeterminate={
                  checkedChildren.some((child) => child) &&
                  !checkedChildren.every((child) => child)
                }
                onChange={handleParentChange}
              />
            }
            label={
              <Typography style={{ padding: "10px" }}>
                {items[index].manufacturorName}
              </Typography>
            }
          ></FormControlLabel>

          <Divider></Divider>

          {items.map((item, childIndex) => {
            return (
              <>
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      checked={checkedChildren[childIndex]}
                      onChange={() => handleChildChange(childIndex)}
                    />
                  }
                  label={
                    <div style={{ position: "relative" }} key={item.id}>
                      <ListItem>
                        <div>
                          <img
                            src={item.image}
                            style={{ width: "130px" }}
                            alt={item.productName}
                          ></img>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gap: "5px",
                            marginLeft: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "10vw",
                              wordWrap: "break-word", // Break words that exceed the width
                            }}
                          >
                            {item.productName.length > 35
                              ? item.productName.substring(0, 35) + "..."
                              : item.productName}
                            <Labels
                              labelIcon={
                                <FiPackage
                                  style={{ fontSize: "6px" }}
                                ></FiPackage>
                              }
                              labelName="Free Shipping"
                            ></Labels>
                            <Typography style={{ fontSize: "8px" }}>
                              Will be delivered until 27th of July
                            </Typography>
                          </div>
                        </div>
                        <IncrementDecrementButtonGroup
                          height={"15"}
                          initialValue={item.desiredAmount}
                          item={item}
                          handleDecreaseAmount={() =>
                            handleDecreaseAmount(item.id)
                          }
                          handleIncreaseAmount={() =>
                            handleIncreaseAmount(item.id)
                          }
                        />
                        <Typography>
                          {item.discountedPrice
                            ? item.discountedPrice * item.desiredAmount
                            : item.price * item.desiredAmount}
                        </Typography>
                        <Button
                          onClick={() => {
                            const afterDeleteCartItems = cartItems.filter(
                              (product) => product.id !== item.id
                            );
                            setCartItems(afterDeleteCartItems);
                            //TODO: set desired amount of that product as 0 by UPDATE request.
                          }}
                        >
                          X
                        </Button>
                      </ListItem>
                    </div>
                  }
                />
                {childIndex !== items.length - 1 && <Divider></Divider>}
              </>
            );
          })}
        </CardContent>
      </Card>
    </FormGroup>
  );
};

export default CartItems;
