import React, { useEffect, useState } from "react";
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
import { errorToast } from "./Toaster";
import axios from "axios";
const CartItems = ({
  handleUpdateDesiredAmount,
  cartItems,
  setCartItems,
  manufacturerId,
  index,
  itemsInManufacturer,
  onProductSelection,
}) => {
  const [checkedParent, setCheckedParent] = useState(false);
  const [checkedChildren, setCheckedChildren] = useState(
    itemsInManufacturer.map((item) => false)
  );

  const handleParentChange = () => {
    const newCheckedParent = !checkedParent;
    setCheckedParent(newCheckedParent);
    setCheckedChildren(
      newCheckedParent
        ? itemsInManufacturer.map(() => true)
        : itemsInManufacturer.map(() => false)
    );

    itemsInManufacturer.map((item) => {
      const isSelected = newCheckedParent;
      onProductSelection(item, isSelected);
    });
  };

  const handleChildChange = (index) => {
    const newCheckedChildren = [...checkedChildren];
    newCheckedChildren[index] = !newCheckedChildren[index];
    setCheckedChildren(newCheckedChildren);
    setCheckedParent(newCheckedChildren.every((child) => child));

    const product = itemsInManufacturer[index];
    const isSelected = newCheckedChildren[index];
    onProductSelection(product, isSelected);
  };
  return (
    <FormGroup>
      {console.log("cartItems in component: ", cartItems)}
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
                {itemsInManufacturer[0].manufacturer_name}
              </Typography>
            }
          ></FormControlLabel>

          <Divider></Divider>

          {itemsInManufacturer.map((item, childIndex) => {
            return (
              <>
                <FormControlLabel
                  key={item.product_id}
                  control={
                    <Checkbox
                      checked={checkedChildren[childIndex]}
                      onChange={() => handleChildChange(childIndex)}
                    />
                  }
                  label={
                    <div style={{ position: "relative" }} key={item.product_id}>
                      <ListItem>
                        <div>
                          <img
                            src={item.image}
                            style={{ width: "130px" }}
                            alt={item.product_name}
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
                            {item.product_name && item.product_name.length > 35
                              ? item.product_name.substring(0, 35) + "..."
                              : item.product_name}
                            <Labels
                              labelIcon={
                                <FiPackage
                                  style={{ fontSize: "6px" }}
                                ></FiPackage>
                              }
                              labelName="Woman-made"
                            ></Labels>
                            <Typography style={{ fontSize: "8px" }}>
                              Will be delivered until 27th of July
                            </Typography>
                          </div>
                        </div>
                        <IncrementDecrementButtonGroup
                          height={"15"}
                          initialValue={item.desired_amount}
                          item={item}
                          handleUpdateDesiredAmount={handleUpdateDesiredAmount}
                        />
                        <Typography>
                          {item.discounted_price
                            ? (
                                item.discounted_price * item.desired_amount
                              ).toFixed(2)
                            : (item.price * item.desired_amount).toFixed(2)}
                        </Typography>
                        <Button
                          onClick={async () => {
                            const afterDeleteCartItems = cartItems.filter(
                              (product) =>
                                product.product_id !== item.product_id
                            );
                            setCartItems(afterDeleteCartItems);
                            try {
                              await axios.delete(
                                `https://handygreen-back-end.vercel.app//removeFromCart/${item.product_id}`
                              );
                            } catch (err) {
                              errorToast(
                                "Failed to remove the product from the cart!"
                              );
                            }
                          }}
                        >
                          X
                        </Button>
                      </ListItem>
                    </div>
                  }
                />
                {itemsInManufacturer.length &&
                  childIndex !== itemsInManufacturer.length - 1 && (
                    <Divider></Divider>
                  )}
              </>
            );
          })}
        </CardContent>
      </Card>
    </FormGroup>
  );
};

export default CartItems;
