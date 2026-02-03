import React from "react";
import ProgressTrackerSvg from "./ProgressTrackerSvg";
import location from "../../assets/Images/gray-location-icon.svg";
import star from "../../assets/Images/gray-star.svg";
import ActionButtons from "../SharedComponents/ActionButtons";
import Map from "./Map";
import { ButtonBase } from "@mui/material";
import Button from "./Button";
import { Link } from "react-router-dom";

const ServiceActionCards = ({ details, done = false, success = false }) => {
  const dialogRef = React.useRef(null);
  return (
    <li className="bg-[#FCFCFD] p-4 rounded-md shadow-md w-full max-w-full lg:max-w-[24rem] min-w-0 sms:min-w-[24rem] h-full list-none">
      <ProgressTrackerSvg step={details.step} />
      <div className="flex items-start gap-2">
        <div>
          <img
            className="rounded-lg w-full max-w-[5.88rem]  h-full object-cover mt-4"
            src={details.image}
            alt="service detail image"
          />
        </div>
        <div>
          <h2 className="font-fashion mt-4 mb-2 font-bold  text-xl text-darkPurple">
            {details.name}
          </h2>
          <ul className="flex flex-col text-gray font-medium gap-y-2 mb-4">
            <li className="flex items-center gap-2">
              <img
                src={location}
                alt="locfont-fashion font-bold  text-[1.75rem]ation icon"
              />
              {details.location}
            </li>
            <li className="flex items-center gap-2">
              <img src={star} alt="star icon" />
              {`${details.rating}.0`}
            </li>
          </ul>
        </div>
      </div>
      {!success && (
        <div className="flex items-center justify-between">
          <ActionButtons dialogRef={dialogRef} icons={[0, 2]} />
          <Map location={details.location} dialogRef={dialogRef} />
          {!done && (
            <div className="flex items-center gap-2">
              <div className=" ml-8 md:ml-4 w-[6rem] h-[3rem] flex items-center justify-center   font-normal rounded-lg text-sm text-[#D92D20] hover:bg-[#fef3f2] hover:text-[#B42318] transition-colors duration-200">
                <Link to={`/customerWebApp/cancelAppointments/${details.id}`}>
                  <ButtonBase
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: ".5rem",
                    }}
                  >
                    Cancel
                  </ButtonBase>
                </Link>
              </div>
              <Button
                fontWeight={400}
                sx={{
                  maxWidth: "fit",
                  padding: ".6rem .85rem",
                  "&:hover": {
                    backgroundColor: "#5a0a99",
                  },
                }}
              >
                Reschedule
              </Button>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default ServiceActionCards;
