import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";

const IncrementDecrementButtonGroup = ({
  initialValue = 0,
  item,
  handleIncreaseAmount,
  handleDecreaseAmount,
  height,
  counterWidth = "30px",
}) => {
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    setCounter(initialValue);
  });

  return (
    <ButtonGroup
      style={{ height: height ? `${height}px` : "30px", width: "100%" }}
    >
      <Button
        disabled={counter === 0 ? true : false}
        style={{
          fontSize: `${height / 2}px`,
        }}
        onClick={() => {
          setCounter(counter - 1);
          handleDecreaseAmount(item.id);
        }}
      >
        -
      </Button>

      <Button
        disabled
        style={{
          color: "black",
          width: counterWidth,
          fontSize: `${height / 2}px`,
        }}
      >
        {counter}
      </Button>
      <Button
        style={{
          fontSize: `${height / 2}px`,
        }}
        onClick={() => {
          setCounter(counter + 1);
          handleIncreaseAmount(item.id);
        }}
      >
        +
      </Button>
    </ButtonGroup>
  );
};

export default IncrementDecrementButtonGroup;
