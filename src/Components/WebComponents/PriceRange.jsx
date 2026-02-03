import { useDispatch, useSelector } from "react-redux";
import priceControlIcon from "../../assets/Images/price_control.svg";
import React from "react";
import {
  Box,
  IconButton,
  Slider,
  SliderThumb,
  styled,
  Typography,
} from "@mui/material";
import { setPriceRange } from "../../redux/newBookingSlice";

const PriceRange = () => {
  const marks = [
    {
      value: 10,
      label: "<10k",
    },
    {
      value: 20,
      label: "<20k",
    },
    {
      value: 30,
      label: "<30k",
    },
    {
      value: 40,
      label: "<40k",
    },
    {
      value: 50,
      label: "<50k",
    },
    {
      value: 60,
      label: "<60k",
    },
    {
      value: 70,
      label: "<70k",
    },
    {
      value: 80,
      label: "<80k",
    },
    {
      value: 90,
      label: ">90k",
    },
  ];
  function valuetext(value) {
    return `${value}k`;
  }
  function PriceControlComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <span aria-hidden={true}>
          <img src={priceControlIcon} />
        </span>
      </SliderThumb>
    );
  }

  const RangeSlider = styled(Slider)(({ theme }) => ({
    color: "#F4E2FE",
    height: 16,
    "& .MuiSlider-thumb": {
      height: 40,
      width: 40,
      backgroundColor: "#6A0DAD",
    },
    "& .MuiSlider-track": {
      backgroundColor: "#6A0DAD",
    },
    "& .MuiSlider-rail": {
      opacity: 0.5,
      boxShadow: "inset 0px 0px 4px -2px #000",
      backgroundColor: "#F4E2FE",
    },
    "& .MuiSlider-valueLabel": {
      color: "#6A0DAD",
      background: "#F4E2FE",
    },
    "& .MuiSlider-markLabel": {
      marginTop: "1rem",
    },
    ...theme.applyStyles("dark", {
      color: "#0a84ff",
    }),
  }));

  const dispatch = useDispatch();
    const priceRange = useSelector((state) => state.newBookings.priceRange); 
  

  return (
    <div className="mt-4">
      <span className="text-[#667085] font-sm font-medium">Price Range</span>
      <Box sx={{ width: "95%", marginInline: "auto" }}>
        <RangeSlider
          aria-label="Price range"
          defaultValue={60}
          value={priceRange}
          getAriaValueText={valuetext}
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
          slots={{ thumb: PriceControlComponent }}
          onChange={(_, newValue) => dispatch(setPriceRange(newValue))}
        />
      </Box>
      {/* <div className="flex items-center justify-evenly mt-4">
        <span className="text-[#667085] font-sm font-medium">Affordable </span>
        <span className="text-[#667085] font-sm font-medium">Expensive</span>
      </div> */}
    </div>
  );
};

export default PriceRange;
