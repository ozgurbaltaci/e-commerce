import React from "react";
import classes from "./Labels.module.css";
import { useEffect, useState } from "react";

const Labels = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("aqua");
  const [border, setBorder] = useState("aqua");

  useEffect(() => {
    if (props.labelName) {
      switch (props.labelName) {
        case "Free Shipping":
          setBackgroundColor("rgba(0, 245, 25, 0.65)");
          setBorder("1px solid rgba(0, 245, 25, 0.65)");
          break;
        case "1 get 1 free":
          setBackgroundColor("rgba(255, 92, 0, 0.65)");
          setBorder("1px solid rgba(255, 92, 0, 0.65)");
          break;
        default:
          break;
      }
    }
  }, [props.labelName]);

  return (
    <div
      className={classes.container}
      style={{ backgroundColor: backgroundColor, border: border }}
    >
      <div style={{ marginRight: "1px" }}>{props.labelIcon}</div>
      {props.labelName}
    </div>
  );
};

export default Labels;
