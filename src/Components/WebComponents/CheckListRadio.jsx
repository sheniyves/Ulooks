import React from "react";
import CustomizedSwitchRadio from "../SharedComponents/CustomedSwitchRadio";
import Error from "./Error";

const CheckListRadio = ({ options = [], value, onChange, error }) => {
  return (
    <div className="my-4 relative">
      <p className="text-[#98A2B3] text-[12px] font-medium mb-2">
        Only 1 can be selected
      </p>
      <ul className="flex flex-col gap-y-4">
        {options.map((option, idx) => (
          <li
            key={idx}
            className="flex text-xl text-yellow_gold items-center justify-between"
          >
            {option}
            <CustomizedSwitchRadio
              onChange={() => onChange(option)}
              checked={value === option}
            />
          </li>
        ))}
      </ul>
      <Error error={error} />
    </div>
  );
};

export default CheckListRadio;
