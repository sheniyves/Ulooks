import { Checkbox } from "@mui/material";
import React from "react"
const ReasonRowssp = ({ details, onSelect, isSelected }) => {
  const selectRef = React.useRef(null);

  return (
    <li
      onClick={() => selectRef.current?.click()}
      className={`flex items-center gap-2 cursor-pointer ${
        isSelected ? "text-orange_gold" : "text-yellow_gold"
      }`}
    >
      {/* <div
        className={`w-5 h-5 shadow-sm overflow-hidden rounded-[.3rem] flx items-center justify-center  ${
          isSelected ? "border-2 border-purple " : "border-0 border-[#D0D5DD]"
        }`}
        style={{ backgroundColor: "#EAEAEC" }}
      > */}
        <Checkbox
          ref={selectRef}
          checked={isSelected}
          onClick={() => onSelect(details.id)}
          aria-label="Checkbox"
          sx={{
            color: "#F79009",
            padding: 0,
            "&.Mui-checked": {
              color: "#F79009",
            },
          }}
        />
      {/* </div> */}
      <p className="font-bold  capitalize">
        {details.serviceHead}
        <span className="font-medium"> {details.details}</span>
      </p>
    </li>
  );
};

export default ReasonRowssp