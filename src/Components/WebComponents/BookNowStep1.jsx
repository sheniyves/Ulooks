import React, { useState } from "react";

import { IconButton, Typography } from "@mui/material";
import Input from "../WebComponents/Input";
import Button from "../WebComponents/Button";
import Box from "@mui/material/Box";
import Slider, { SliderThumb } from "@mui/material/Slider";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ChangeLocation from "./ChangeLocation";
import PriceRange from "./PriceRange";
import DateRange from "./DateRange";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../redux/newBookingSlice";

const BookNowStep1 = ({ data }) => {
  const dispatch = useDispatch();
  const handleContinue = () => {
    dispatch(setStep(2));
  };

  const location = useSelector(state => state.newBookings.location)
  const priceRange = useSelector(state => state.newBookings.priceRange)
  const date = useSelector(state => state.newBookings.date)

  console.log({location, priceRange, date})

  return (
    <div>
      <div>
        <span className="text-[#667085] font-sm font-medium">
          Service Selected
        </span>
        <p className="text-darkPurple font-medium text-lg md:text-xl capitalize">
          Barbing
        </p>
      </div>

      <ChangeLocation data={data} />
      <PriceRange />
      <DateRange />
      <Button sx={{ width: "100%", mt: "1rem", mb: "1rem" }} onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
};

export default BookNowStep1;
