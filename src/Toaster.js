import toast, { Toaster } from "react-hot-toast";
import React from "react";

const Toast = () => {
  return (
    <Toaster
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          fontSize: "14px",
          background: "#363636",
          color: "#fff",
        },
        // Default options for specific types
        success: {
          duration: 4000,
          theme: {
            primary: "green",
            secondary: "black",
          },
          style: {
            marginBottom: "10px",
            background: "#D8FFD5 ",
            //rgba(0,255,7,0.15)
            color: "#363636",
          },
        },
        error: {
          duration: 4000,
          theme: {
            primary: "pink",
            secondary: "black",
          },
          style: {
            marginBottom: "10px",
            background: "#FFD5D5",
            color: "#363636",
          },
        },
      }}
    />
  );
};

export const successToast = (data) => {
  toast.success(data);
};
export const errorToast = (data) => {
  toast.error(data);
};

export default Toast;
