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
                {i !== props.breadCrumbData.length - 1 ? (
                  <span>{e.name}</span>
                ) : (
                  <span style={{ color: "#2FB009" }}>{e.name}</span>
                )}

                {i !== props.breadCrumbData.length - 1 && (
                  <MdOutlineKeyboardArrowRight color="black" />
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
