import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import arrowDownIcon from "../../assets/Images/arrow-down.svg";
import Error from "./Error";
import { Controller } from "react-hook-form";
import { CircularProgress } from "@mui/material";

// Custom dropdown icon
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

export default function ServiceSelectField({
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

  // state for toggling between dropdown and input
  const [isEditable, setIsEditable] = React.useState(false);

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
            defaultValue={defaultValue || ""}
            render={({ field }) =>
              isEditable ? (
                // 👇 Editable mode: styled TextField
                <TextField
                  {...field}
                  placeholder={`Enter ${label}`}
                  onBlur={() => {
                    // Switch back to select if field is empty
                    if (!field.value) {
                      setIsEditable(false);
                    }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: ".5rem",
                      background: error ? "#fee4ee" : "transparent",
                      padding: "0, 1rem",
                      transition: "border-color 0.2s, box-shadow 0.2s",

                      "& fieldset": {
                        border: error
                          ? "1px solid #e15771"
                          : "1px solid #d0d5dd",
                      },
                      "&:hover fieldset": {
                        borderColor: "#F79009",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#F79009",
                        boxShadow: "0 0 0 3px rgba(106, 13, 173, 0.25)",
                      },
                    },
                    "& input": {
                      fontSize: "0.875rem",
                      fontFamily: '"Inter", sans-serif',
                      color: "#572B04",
                    },
                  }}
                />
              ) : (
                // 👇 Default Select mode
                <Select
                  ref={dropdownRef}
                  value={field.value ?? ""}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    props.onChange?.(event.target.value);
                  }}
                  IconComponent={() => (
                    <CustomDropdownIcon
                      onClick={handleDropdown}
                      error={error}
                    />
                  )}
                  sx={{
                    borderRadius: ".5rem",
                    background: error ? "#fee4ee" : "transparent",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: error
                        ? "1px solid #e15771"
                        : "1px solid #d0d5dd",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#F79009",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#F79009",
                      boxShadow: "0 0 0 3px rgba(106, 13, 173, 0.25)",
                    },
                  }}
                  {...props}
                >
                  {/* First item lets you switch to input mode */}
                  <MenuItem
                    onClick={() => setIsEditable(true)}
                    value=""
                    sx={{ fontStyle: "italic", color: "#666" }}
                  >
                    + Enter custom value
                  </MenuItem>

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
              )
            }
          />
        </FormControl>
      </Box>
      <Error error={error} />
    </div>
  );
}
