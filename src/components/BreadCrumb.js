import React from "react";
import classes from "./Breadcrumb.module.css";
import { IconContext } from "react-icons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Breadcrumb = (props) => {
  const n = 4;
  return (
    <div>
      <div className={classes.breadCrumb}>
        {props.breadCrumbData.map((e, i) => {
          return (
            <div>
              <a href={e.navigation} className={classes.breadcrumb_item}>
                <span>{e.name}</span>
                {i !== n - 1 && <MdOutlineKeyboardArrowRight color="#2FB009" />}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
