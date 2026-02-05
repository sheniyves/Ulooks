import { IconButton } from "@mui/material";
import Error from "../WebComponents/Error";
import React from "react";

const Input = ({
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
  textColor = "inherit",
  backgroundInput = "bg-transparent",
  ...props
}) => {
  const border = error ? "border-error" : "border-color";
  const background = error ? "bg-error" : backgroundInput;
  const isPasswordType = inputType === "password";
  const [reveal, setReveal] = React.useState(false);
  const revealPassword = () => setReveal((prev) => !prev);

  const style = `border-l ${border} ${background} flex items-center justify-center p-4`;
  const padding = "p-4";

  return (
    <div className="mb-4 relative">
      <label
        className="text-darkPurple font-medium text-sm mb-2 block"
        htmlFor={label}
      >
        {label}
      </label>
      <div
        className={`border ${border} ${background} rounded-lg w-full flex items-center overflow-hidden transition duration-200 hover:border-[#6A0DAD] focus-within:border-[#6A0DAD] focus-within:shadow-[0_0_0_3px_rgba(106,13,173,0.25)] ${
          usePadding ? padding : "pl-4"
        }`}
      >
        {leftIcon && !textArea && <img src={icon} alt="Input icon" className="mr-2" />}
        {textArea ? (
          <textarea
            {...props}
            className="border-none outline-none w-full bg-transparent resize-none"
            rows={5}
          />
        ) : (
          <input
            className={`border-none outline-none w-full bg-transparent ${textColor}`}
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
              <img src={rightIcon} alt="Toggle visibility" />
            </div>
          </IconButton>
        )}
      </div>
      <Error error={error} />
    </div>
  );
};

export default Input;
