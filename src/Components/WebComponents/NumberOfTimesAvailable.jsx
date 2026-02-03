import React from "react";
import CustomizedSwitchRadio from "../SharedComponents/CustomedSwitchRadio";
import { useDispatch } from "react-redux";
import { addFrequencyPerMonth } from "../../redux/bookingsSlice";


const NumberOfTimesAvailable = ({
  options = [],
  value,
  onChange,
}) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
      dispatch(addFrequencyPerMonth(value));
  }, [ value, dispatch]);

  return (
    <div className="my-4 mt-6 relative -mr-4">
      <p className="text-[#98A2B3] text-[12px] font-medium mb-2">
        Only 1 can be selected
      </p>
      <ul className="flex flex-col gap-y-4">
        {options.map((option, idx) => (
          <li
            key={idx}
            className="flex text-base font-medium text-darkPurple items-center justify-between"
          >
            {option}
            <CustomizedSwitchRadio
              checkedTrackColor="#ca9bec"
              thumbColor="#6a0dad"
              checkedBorderColor="#6a0dad"
              onChange={() => onChange(option)}
              checked={value === option}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NumberOfTimesAvailable;
