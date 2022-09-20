import React from "react";

export const IconBtnSaved = ({ size = "25", color = "black" }) => {
  // Convert the size to a number
  const sizeNumber = Number(size);
  return (
    <svg
      width={sizeNumber}
      height={`${sizeNumber + 5}`}
      viewBox="0 0 22 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 21a1 1 0 0 1-.49-.13A1 1 0 0 1 5 20V5.33A2.28 2.28 0 0 1 7.2 3h9.6A2.28 2.28 0 0 1 19 5.33V20a1 1 0 0 1-.5.86a1 1 0 0 1-1 0l-5.67-3.21l-5.33 3.2A1 1 0 0 1 6 21Z"
        fill={color}
      />
    </svg>
  );
};
