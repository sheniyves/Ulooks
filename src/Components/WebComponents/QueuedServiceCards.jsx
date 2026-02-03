import React from "react";
import ProgressTrackerSvg from "./ProgressTrackerSvg";
import location from "../../assets/Images/gray-location-icon.svg";
import star from "../../assets/Images/gray-star.svg";
import ActionButtons from "../SharedComponents/ActionButtons";
import Map from "./Map";
import { ButtonBase } from "@mui/material";
import Button from "./Button";
import sandTimerIcon from "../../assets/Images/sand-timer.svg";
import queIcon from "../../assets/Images/queued-gray.svg";
import calendarIcon from "../../assets/Images/calendar-gray.svg";
import clockIcon from "../../assets/Images/clock-gray.svg";
import { Link } from "react-router-dom";

const QueuedServiceCards = ({ details }) => {
  return (
    <li className="bg-[#FCFCFD] text-gray text-sm font-normal p-4 rounded-md shadow-md w-full max-w-full lg:max-w-[24rem]  h-full list-none">
      <div className="flex item-center justify-between">
        <div className="flex items-center gap-2">
          <img src={sandTimerIcon} alt="sand clock timer icon" />
          <p className="">{details.waitTime}</p>
        </div>
        <p className="text-green capitalize">{details.status}</p>
      </div>
      <div className="flex items-center gap-2 my-2">
        <img src={queIcon} alt="que icon" />
        <p className="">{details.positionInQueue}</p>
      </div>
      <div className="flex item-center justify-between">
        <div className="flex items-center gap-2">
          <img src={calendarIcon} alt="sand clock timer icon" />
          <p className="">{details.date}</p>
        </div>
        <div className="flex items-center gap-2">
          <img src={clockIcon} alt="sand clock timer icon" />
          <p className="">{details.time}</p>
        </div>
      </div>
      <div className="flex items-start gap-4 ">
        <div>
          <img
            className="rounded-lg w-full max-w-[5.88rem]  h-full object-cover mt-4"
            src={details.image}
            alt="service detail image"
          />
        </div>
        <div>
          <h2 className=" mt-4 mb-2 font-bold  text-xl text-darkPurple">
            {details.title}
          </h2>
          <ul className="flex flex-col text-gray font-medium gap-y-2 mb-4">
            <li className="flex items-center gap-2">
              <img src={location} alt="location icon" />
              {details.venue}
            </li>
            <li className="flex items-center gap-2">
              <img src={star} alt="star icon" />
              {`${details.rating}.0`}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="  w-[6rem] h-[3rem] flex items-center justify-center   font-normal rounded-lg text-sm text-[#D92D20] hover:bg-[#fef3f2] hover:text-[#B42318] transition-colors duration-200">
          <Link to={`/customerWebApp/cancelAppointments/${details.id}`}>
            <ButtonBase
              sx={{ width: "100%", height: "100%", borderRadius: ".5rem" }}
            >
              Cancel
            </ButtonBase>
          </Link>
        </div>
        <Button
          fontWeight={500}
          backgroundColor="transparent"
          color="#6A0DAD"
          sx={{
            maxWidth: "fit",
            border: "1px solid #6A0DAD",
            padding: ".6rem .85rem",
            "&:hover": {
              backgroundColor: "#e0bbff",
            },
          }}
        >
          Reschedule
        </Button>
      </div>
    </li>
  );
};

export default QueuedServiceCards;
