import React from "react";
import classes from "./BreadCrumb.module.css";
import { IconContext } from "react-icons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Breadcrumb = (props) => {
  return (
    <div>
      <div className={classes.breadCrumb}>
        {props.breadCrumbData.map((e, i) => {
          return (
            <div>
              <a href={e.navigation} className={classes.breadcrumb_item}>
                <span>{e.name}</span>
                {i !== props.breadCrumbData.length - 1 && (
                  <MdOutlineKeyboardArrowRight color="#2FB009" />
                )}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
