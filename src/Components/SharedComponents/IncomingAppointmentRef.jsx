import React from "react";
import Dialog from "./AlertDialog";
import Button from "../WebComponents/Button";
import location from "../../assets/Images/gray-location-icon.svg";
import profile from "../../assets/Images/serviceImage1.svg";
import calendar from "../../assets/Images/calender-2.svg";
import clock from "../../assets/Images/clock-gray.svg";
import { handlePriceFormatting } from "../../Utils/formattingFunction";
import { Link } from "react-router-dom";

const IncomingAppointmentRef = ({
  incomingAppointRef,
  selectedCard,
  onUpdate,
}) => {
  const serviceId = 2;
  return (
    <div className=" max-w-full md:max-w-[31.25rem] bg-[#fef0c7] ">
      <Dialog
        ref={incomingAppointRef}
        dialogTitle={""}
        action={""}
        iconPresence={false}
        useFullWidth={false}
      >
        <h1 className="text-yellow_gold font-medium text-lg text-center -mt-6 mb-2 ">
          Incoming Appointment
        </h1>

        <div className="flex items-top w-full   gap-2 px-6">
          <div className="rounded-full overflow-hidden w-[4.5rem] h-[4.5rem] flex items-center justify-center flex-shrink-0">
            <img
              className="w-full h-full object-cover object-top"
              src={profile}
              alt="Profile image"
            />
          </div>

          <div className="w-full">
            <p className="text-yellow_gold font-bold capitalize mb-2">
              Sarah Moses
            </p>
            <div className="flex items-center gap-2">
              <img src={location} alt="location icon" />
              <p>Shop Service</p>
            </div>
            <div className="flex items-center justify-between  w-full">
              <div className="flex items-center gap-2 mt-2 ">
                <img src={calendar} alt="calendar icon" />
                <p>Fri, 24-06-25 Service</p>
              </div>
              <div className="flex items-center gap-2 mt-2 ">
                <img src={clock} alt="calendar icon" />
                <p>4:30</p>
              </div>
            </div>
            <div className="flex items-center justify-between  w-full my-2">
              <p>Dreads</p>
              <p>One time service</p>
            </div>
            <div className="flex items-center justify-between  w-full">
              <p>Total Payment</p>
              <p>{handlePriceFormatting(2500)}</p>
            </div>
          </div>
        </div>
        <div className=" p-6 flex flex-col gap-2 sm:flex-row items-center justify-between min-w-0 md:min-w-[31.25rem] ">
          <Link
            to={`/serviceProviderWebApp/home/${serviceId}/startKyc`}
            className="w-full"
          >
            <Button
              backgroundColor="#F79009"
              sx={{
                width: "100%",
                "&:hover": {
                  backgroundColor: "#dc7c06",
                },
              }}
            >
              Accept
            </Button>
          </Link>
          <Button
            onClick={() => incomingAppointRef.current?.closeDialog()}
            backgroundColor="#D92D20"
            sx={{
              width: "100%",
              "&:hover": {
                backgroundColor: "#B71F16",
              },
            }}
          >
            Reject
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default IncomingAppointmentRef;
