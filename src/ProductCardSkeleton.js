import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = () => {
  return (
    <div style={{ width: 260, height: 384 }}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            right: 5,
            top: 5,
            backgroundColor: "white",
            padding: "5px",
          }}
        >
          <Skeleton width={16} height={16} />
        </div>
        <Skeleton width={274} height={224} />
        <div style={{ padding: "10px" }}>
          <Skeleton width={100} height={12} />
          <Skeleton width={200} height={16} />
          <div style={{ display: "flex", marginTop: "4px" }}>
            <Skeleton width={60} height={20} style={{ marginRight: "2px" }} />
            <Skeleton width={60} height={20} style={{ marginRight: "2px" }} />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "12px",
              marginTop: "4px",
              alignItems: "center",
            }}
          >
            <Skeleton width={60} height={12} style={{ marginRight: "2px" }} />
            <Skeleton width={40} height={10} />
          </div>
          <Skeleton width={60} height={12} style={{ marginTop: "4px" }} />
          <Skeleton width={60} height={12} style={{ marginTop: "4px" }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
