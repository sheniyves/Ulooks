import React, { useState, useEffect } from "react";
import { services } from "../../data/barbingService";
import { useParams } from "react-router-dom";
import { handlePriceFormatting } from "../../Utils/formattingFunction";
import { Checkbox } from "@mui/material";
import Button from "./Button";
import { setStep } from "../../redux/newBookingSlice";
import { useDispatch } from "react-redux";

const BookNowStep3 = () => {
  const { serviceId } = useParams();
  const combineData = [...services];
  const dispatch = useDispatch();
  const toBeBooked = combineData.find((d) => String(d.id) === serviceId);
  const handleContinue = () => {
    dispatch(setStep(4));
  };
  return (
    <div>
      <p className="text-medium text-[#667085] text-lg text-left mb-4">
        Select Service and Service essentials
      </p>

      <ServiceEssentials
        data={toBeBooked}
        defaultSelected
        readOnly
        style={"rounded-t-md border-b border-[#98A2B3]"}
        detailsStyle={"text-base sm:text-lg "}
      />
      <h2 className="text-darkPurple text-base leading-tight font-bold my-2">
        Select & Add service Essentials
      </h2>
      <ul>
        {combineData
          .filter((d) => String(d.id) !== serviceId)
          .map((d) => (
            <ServiceEssentials
              key={d.id}
              data={d}
              style={"rounded-none"}
              detailsStyle={"text-sm mb-2"}
            />
          ))}
      </ul>
      <Button sx={{ width: "100%", mt: "1rem" }} onClick={handleContinue}>
        Continue
      </Button>
      <div className="h-12 w-full" />
    </div>
  );
};

export default BookNowStep3;

const ServiceEssentials = ({
  data,
  defaultSelected = false,
  readOnly = false,
  style,
  detailsStyle,
}) => {
  const [selected, setSelected] = useState(defaultSelected);

  const toggleSelection = () => {
    if (!readOnly) setSelected((prev) => !prev);
  };

  return (
    <li className="space-y-2 list-none">
      <div
        onClick={toggleSelection}
        className={`grid grid-cols-2 sm:grid-cols-3 gap-2 px-2 py-3 ${style} transition-colors duration-300 cursor-pointer
    ${selected ? "bg-[#e7cbfb]" : "bg-white"}`}
      >
        <div className="flex items-center gap-2 w-full">
          <div className="rounded-full overflow-hidden w-12 h-12 flex-shrink-0">
            <img
              src={data.image}
              alt="service image"
              className="bg-cover w-full h-full"
            />
          </div>
          <div className="w-full">
            <h2
              className={`text-darkPurple ${detailsStyle} leading-tight font-bold`}
            >
              {data.name}
            </h2>
            <p className="text-light_gray text-sm -mt-1">{data.serviceType}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 sm:hidden w-full">
          <div>
            <p className={`text-darkPurple ${detailsStyle} font-bold`}>
              {handlePriceFormatting(3000)}
            </p>
            <p className="text-light_gray -mt-1 text-xs">(20 min)</p>
          </div>
          <div
            className={`w-6 h-6 shadow-sm rounded-md flex items-center justify-center flex-shrink-0 
    ${selected ? "border-2 border-purple" : "border border-[#D0D5DD]"}`}
            style={{ backgroundColor: "#EAEAEC" }}
          >
            <Checkbox
              checked={selected}
              onChange={toggleSelection}
              aria-label="Checkbox"
              disabled={readOnly}
              sx={{
                color: "#6A0DAD",
                padding: 0,
                "&.Mui-checked": {
                  color: "#6A0DAD",
                },
              }}
            />
          </div>
        </div>

        <div className="hidden sm:flex w-full flex-col items-center">
          <p className="text-darkPurple text-lg font-bold">
            {handlePriceFormatting(3000)}
          </p>
          <p className="text-light_gray -mt-1 text-xs">(20 min)</p>
        </div>

        <div className="hidden sm:flex w-full items-center justify-end">
          <div
            className={`w-6 h-6 shadow-sm rounded-md flex items-center justify-center flex-shrink-0 
    ${selected ? "border-2 border-purple" : "border border-[#D0D5DD]"}`}
            style={{ backgroundColor: "#EAEAEC" }}
          >
            <Checkbox
              checked={selected}
              onChange={toggleSelection}
              aria-label="Checkbox"
              disabled={readOnly}
              sx={{
                color: "#6A0DAD",
                padding: 0,
                "&.Mui-checked": {
                  color: "#6A0DAD",
                },
              }}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
