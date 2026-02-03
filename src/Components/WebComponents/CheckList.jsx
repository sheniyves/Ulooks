import React from "react";
import CustomizedSwitch from "../SharedComponents/CustomedSwitch";
import Error from "./Error";

const CheckList = ({ options, label, error, onChange, value }) => {
  return (
    <div className=" my-4 relative">
      <label className="block  font-medium text-sm text-yellow_gold">
        {label}
      </label>
      <p className="text-[#98A2B3] text-[12px] font-medium mb-2">
        Select all that applies
      </p>
      <ul className="flex flex-col gap-y-4 ">
        {options.map((option, idx) => (
          <li
            key={idx}
            className="flex text-xl text-yellow_gold items-center justify-between"
          >
            {option}
            <CustomizedSwitch
              onChange={() => {
                const newValue = value?.includes(option)
                  ? value.filter((item) => item !== option)
                  : [...(value || []), option];
                onChange(newValue);
              }}
              checked={value?.includes(option)}
            />
          </li>
        ))}
      </ul>

      <Error error={error} />
    </div>
  );
};

export default CheckList;
