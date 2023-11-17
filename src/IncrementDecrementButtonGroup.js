// IncrementDecrementButtonGroup.js
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";

const IncrementDecrementButtonGroup = ({
  initialValue = 0,
  item,
  handleUpdateDesiredAmount,
  height,
  counterWidth = "30px",
}) => {
  const [counter, setCounter] = useState(initialValue);

  useEffect(() => {
    setCounter(initialValue);
  }, [initialValue]);

  const handleDecrease = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      handleUpdateDesiredAmount(item.productId, counter - 1);
    }
  };

  const handleIncrease = () => {
    setCounter(counter + 1);
    handleUpdateDesiredAmount(item.productId, counter + 1);
  };

  return (
    <ButtonGroup
      style={{ height: height ? `${height}px` : "30px", width: "100%" }}
    >
      <Button
        disabled={counter === 0}
        style={{ fontSize: `${height / 2}px` }}
        onClick={handleDecrease}
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

      <Button style={{ fontSize: `${height / 2}px` }} onClick={handleIncrease}>
        +
      </Button>
    </ButtonGroup>
  );
};

export default IncrementDecrementButtonGroup;
