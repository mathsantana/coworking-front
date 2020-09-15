import React from "react";
import { Button } from "antd";

const CustomButton = ({ secondary = false, ...rest }) => {
  return (
    <Button
      style={{
        backgroundColor: secondary ? "#f1592a" : "#06a",
        color: "white",
        margin: "0 5px",
      }}
      {...rest}
    />
  );
};

export default CustomButton;
