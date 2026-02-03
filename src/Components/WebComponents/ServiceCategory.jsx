import React from "react";
import Radio from "@mui/material/Radio";
import Error from "./Error";
import { serviceOptions } from "../../Utils/serviceOptions";



const ServiceCategory = ({
  value = [],
  onChange,
  error,
  color = "#6a0dad",
  textColor = "text-darkPurple",
  label,
  categories = serviceOptions,
  useSlice = true,
}) => {
  const handleToggle = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="relative">
      <label
        className={`${textColor} font-medium text-sm `}
        htmlFor="serviceCategory"
      >
        {label}
      </label>

      <span className="text-gray text-sm font-normal block mt-2">
        You can select multiple
      </span>
      <ul className="mt-4 relative">
        <div>
          <div className="grid grid-cols-3 ">
            {categories.map((category, index) => (
              <li key={index} className="flex items-center ">
                <Radio
                  sx={{
                    color: { color },
                    "&.Mui-checked": {
                      color: { color },
                    },
                  }}
                  checked={value.includes(category.value)}
                  onClick={() => handleToggle(category.value)}
                  value={category.value}
                  id={category.value}
                />
                <label
                  htmlFor={category.value}
                  className={` ${textColor} font-medium text-sm`}
                >
                  {category.label}
                </label>
              </li>
            ))}
          </div>
          {/* <div className="flex flex-col">
            {useSlice &&
              categories.slice(4).map((category, index) => (
                <li key={index} className="flex items-center ">
                  <Radio
                    sx={{
                      color: { color },
                      "&.Mui-checked": {
                        color: { color },
                      },
                    }}
                    checked={value.includes(category.value)}
                    onChange={() => handleToggle(category.value)}
                    value={category.value}
                    id={category.value}
                  />
                  <label
                    htmlFor={category.value}
                    className={` ${textColor} font-medium text-sm`}
                  >
                    {category.label}
                  </label>
                </li>
              ))}
          </div> */}
          <p className="text-red text-[.8rem] mt-[.5rem] font-semibold float-end  absolute right-0 bottom-4">
            {error?.message}
          </p>
        </div>
      </ul>
    </div>
  );
};

export default ServiceCategory;
