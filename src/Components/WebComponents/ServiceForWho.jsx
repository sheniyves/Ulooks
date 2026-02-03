import { Radio } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addPerson } from "../../redux/bookingsSlice";
import { setIndividual } from "../../redux/newBookingSlice";

const ServiceForWho = ({ selectedOption, handleChange }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(addPerson(selectedOption));
    dispatch(setIndividual(selectedOption));
  }, [selectedOption]);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Radio
            value="self"
            checked={selectedOption === "self"}
            onChange={handleChange}
            sx={{
              color: "#6A0DAD",
              "&.Mui-checked": {
                color: "#6A0DAD",
              },
            }}
          />
          <p className="text-darkPurple text-sm">For Self</p>
        </div>
        <div className="flex items-center">
          <Radio
            value="someone"
            checked={selectedOption === "someone"}
            onChange={handleChange}
            sx={{
              color: "#6A0DAD",
              "&.Mui-checked": {
                color: "#6A0DAD",
              },
            }}
          />
          <p className="text-darkPurple text-sm">For Someone else</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceForWho;
