import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const LoaderInBackdrop = ({
  isThereUpdateOperation,
  setIsThereUpdateOperation,
}) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isThereUpdateOperation}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoaderInBackdrop;
