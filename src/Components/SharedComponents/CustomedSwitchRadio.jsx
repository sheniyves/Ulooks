import * as React from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const ToggleSwitch = styled(
  (props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />,
  {
    shouldForwardProp: (prop) =>
      !["background", "thumbColor", "checkedTrackColor", "checkedBorderColor"].includes(prop),
  }
)(({ background, thumbColor, checkedTrackColor, checkedBorderColor }) => ({
  width: 55,
  height: 30,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 2.8,
    "&.Mui-checked": {
      transform: "translateX(25px)",
      color: "#fff",
      "& .MuiSwitch-thumb": {
        backgroundColor: thumbColor || "#ffa500",
      },
      "& + .MuiSwitch-track": {
        backgroundColor: checkedTrackColor || "#fedf89",
        border: `2px solid ${checkedBorderColor || "#ffa500"}`,
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
    borderRadius: 15,
    backgroundColor: background || "#D0D5DD",
    opacity: 1,
    border: `2px solid ${background || "#D0D5DD"}`,
    boxSizing: "border-box",
  },
}));

export default function CustomizedSwitchRadio({
  checked,
  onChange,
  background = "#D0D5DD",
  thumbColor = "#ffa500",
  checkedTrackColor = "#fedf89",
  checkedBorderColor = "#ffa500",
}) {
  return (
    <FormControlLabel
      control={
        <ToggleSwitch
          checked={checked}
          onChange={onChange}
          background={background}
          thumbColor={thumbColor}
          checkedTrackColor={checkedTrackColor}
          checkedBorderColor={checkedBorderColor}
        />
      }
      label=""
    />
  );
}
