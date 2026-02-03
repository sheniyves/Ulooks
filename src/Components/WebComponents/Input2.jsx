import { IconButton } from "@mui/material";
import Error from "../WebComponents/Error";
import React from "react";

const Input2 = ({
  label,
  inputType = "text",
  icon = "",
  rightIcon,
  leftIcon = true,
  iconRight = false,
  usePadding = true,
  iconWithBackground = false,
  error,
  textArea = false,
  ...props
}) => {
  const border = error ? "border-error" : "border-color";
  const background = error ? "bg-error" : "bg-transparent";
  const isPasswordType = inputType === "password";
  const [reveal, setReveal] = React.useState(false);
  const revealPassword = () => setReveal((prev) => !prev);

  const style = `border-l ${border} ${background} flex items-center justify-center p-4`;
  const padding = "p-4";

  return (
    <div className="mb-4 relative">
      <label
        className="font-medium text-sm mb-2 block"
        htmlFor={label}
        style={{ color: "#572B04" }}
      >
        {label}
      </label>
      <div
        className={`border ${border} ${background} rounded-lg w-full flex items-center overflow-hidden transition duration-200 hover:border-[#F79009] focus-within:border-[#F79009] focus-within:shadow-[0_0_0_3px_rgba(106,13,173,0.25)] ${
          usePadding ? padding : "pl-4"
        }`}
      >
        {leftIcon && !textArea && icon && (
          <img
            src={icon}
            alt="Input icon"
            className="mr-2"
            style={{
              filter:
                "invert(14%) sepia(82%) saturate(900%) hue-rotate(5deg) brightness(60%) contrast(110%)",
            }}
          />
        )}
        {textArea ? (
          <textarea
            {...props}
            className="border-none outline-none w-full bg-transparent resize-none"
            rows={5}
          />
        ) : (
          <input
            className="border-none outline-none w-full bg-transparent"
            type={isPasswordType ? (reveal ? "text" : "password") : inputType}
            {...props}
          />
        )}
        {iconRight && (
          <IconButton
            onClick={revealPassword}
            sx={{ padding: "0", margin: "0" }}
          >
            <div className={iconWithBackground ? style : undefined}>
              <img
                src={rightIcon}
                alt="Toggle visibility"
                style={{
                  filter:
                    "invert(14%) sepia(82%) saturate(900%) hue-rotate(5deg) brightness(60%) contrast(110%)",
                }}
              />
            </div>
          </IconButton>
        )}
      </div>
      <Error error={error} />
    </div>
  );
};

export default Input2;
