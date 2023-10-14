import React from "react";
import classes from "./Labels.module.css";
import { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { GoTag } from "react-icons/go";

const Labels = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("aqua");
  const [border, setBorder] = useState("aqua");

  useEffect(() => {
    console.log("labelName: ", props.labelName);
    if (props.labelName) {
      switch (props.labelName) {
        case "Free Shipping":
          setBackgroundColor("rgba(0, 245, 25, 0.65)");
          setBorder("1px solid rgba(0, 245, 25, 0.65)");
          setLabelIcon(<FiPackage style={{ fontSize: "6px" }}></FiPackage>);
          break;
        case "Buy 1, Get 1 Free":
          setBackgroundColor("rgba(255, 92, 0, 0.65)");
          setBorder("1px solid rgba(255, 92, 0, 0.65)");
          setLabelIcon(<GoTag style={{ fontSize: "6px" }}></GoTag>);
          break;
        default:
          break;
      }
    }
  }, [props.labelName]);

  const [labelIcon, setLabelIcon] = useState();

  return (
    <div
      className={classes.container}
      style={{ backgroundColor: backgroundColor, border: border }}
    >
      <div style={{ marginRight: "1px" }}>{labelIcon && labelIcon}</div>
      {props.labelName}
    </div>
  );
};

export default Labels;
