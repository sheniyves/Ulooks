import * as React from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const ToggleSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 55,
  height: 30,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(25px)",
      color: "#fff",
      "& .MuiSwitch-thumb": {
        backgroundColor: "#ffa500",
      },
      "& + .MuiSwitch-track": {
        backgroundColor: "#fedf89",
        border: "2px solid #ffa500",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#EAECF0",
    width: 24,
    height: 24,
    boxShadow: "0 0 0 3px #fff inset",
  },
  "& .MuiSwitch-track": {
    borderRadius: 30 / 2,
    backgroundColor: "#D0D5DD",
    opacity: 1,
    border: "2px solid #D0D5DD",
    boxSizing: "border-box",
  },
}));

export default function CustomizedSwitch({ onChange, checked }) {
  return (
    <FormControlLabel
      control={
        <ToggleSwitch
          // defaultChecked={false}
          checked={checked}
          onChange={onChange}
        />
      }
      label=""
    />
  );
}
