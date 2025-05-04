import React from "react";

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "gray",
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        zIndex: 1,
        right: "-10px",
      }}
    >
      <span style={{ color: "white", fontSize: "18px" }}>›</span>
    </div>
  );
};

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "gray",
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        zIndex: 1,
        left: "-10px",
      }}
    >
      <span style={{ color: "white", fontSize: "18px" }}>‹</span>
    </div>
  );
};
