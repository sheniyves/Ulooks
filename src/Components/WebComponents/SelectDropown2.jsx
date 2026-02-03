import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import arrowDownIcon from "../../assets/Images/arrow-down.svg";
import Error from "./Error";
import { Controller } from "react-hook-form";
import { CircularProgress } from "@mui/material";

// Moved outside
const CustomDropdownIcon = ({ onClick, error }) => {
  const border = error ? "border-error" : "border-color";
  const background = error ? "bg-error" : "transparent";
  return (
    <div
      onClick={onClick}
      className={`border-l bg-gray flex items-center justify-center p-4 cursor-pointer ${border} ${background}`}
    >
      <img
        src={arrowDownIcon}
        alt="Dropdown Icon"
        width={30}
        height={30}
        style={{
          filter:
            "invert(14%) sepia(82%) saturate(900%) hue-rotate(5deg) brightness(60%) contrast(110%)",
        }}
      />
    </div>
  );
};

export default function SelectDropDown2({
  list = [],
  label,
  control,
  name,
  defaultValue,
  error,
  isListPending,
  ...props
}) {
  const dropdownRef = React.useRef(null);
  const handleDropdown = () => {
    dropdownRef.current?.click();
  };

  return (
    <div className="relative">
      <Box sx={{ minWidth: 120, margin: "1rem 0 1rem", borderRadius: ".5rem" }}>
        <FormControl fullWidth>
          <label
            className="text-yellow_gold font-medium text-sm mb-2"
            htmlFor={label.charAt(0).toUpperCase() + label.slice(1)}
          >
            {label}
          </label>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || null}
            render={({ field }) => (
              <Select
                ref={dropdownRef}
                labelId="select-label"
                id="select"
                value={field.value ?? ""}
                aria-placeholder="Select an option"
                onChange={(event) => {
                  field.onChange(event.target.value); 
                  props.onChange?.(event.target.value);
                }}
                IconComponent={() => (
                  <CustomDropdownIcon onClick={handleDropdown} error={error} />
                )}
                sx={{
                  borderRadius: ".5rem",
                  background: error ? "#fee4ee" : "transparent",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: error ? "1px solid #e15771" : "1px solid #d0d5dd",
                  },
                  "& .MuiSelect-icon": {
                    top: "calc(50% - 10px)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#F79009",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#F79009",
                    boxShadow: "0_0_0_3px_rgba(106,13,173,0.25)",
                  },
                }}
                {...props}
              >
                {isListPending ? (
                  name === "state" ? (
                    <div className="flex items-center justify-center p-2">
                      <p className="text-sm text-gray font-medium">
                        Please select a country
                      </p>
                    </div>
                  ) : (
                    <MenuItem
                      disabled
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: ".5rem",
                      }}
                    >
                      <CircularProgress size={25} />
                    </MenuItem>
                  )
                ) : (
                  list.map((i, idx) => (
                    <MenuItem key={idx} value={i.value}>
                      {i.label}
                    </MenuItem>
                  ))
                )}
              </Select>
            )}
          />
        </FormControl>
      </Box>
      <Error error={error} />
    </div>
  );
}
