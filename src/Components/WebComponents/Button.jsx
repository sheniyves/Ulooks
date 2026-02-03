import { ButtonBase } from "@mui/material";
import React from "react";

const Button = ({
  children,
  sx = {},
  color = "#fff",
  fontWeight = 500,
  backgroundColor = "#6A0DAD",
  ...props
}) => {
  return (
    <ButtonBase
      component="button"
      disabled={props.disabled}
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        textAlign: "center",
        borderRadius: "0.5rem",
        py: ".75rem",
        px: "1.5rem",
        backgroundColor: props.disabled ? "#EAEAEC" : backgroundColor,
        color: color,
        transition: "all 0.5s ease-in-out",
        cursor: props.disabled ? "not-allowed" : "pointer", 
        pointerEvents: props.disabled ? "none" : "auto",
        fontWeight,

        ...sx,
      }}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
