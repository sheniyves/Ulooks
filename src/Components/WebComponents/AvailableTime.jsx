import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addAvailableTime } from "../../redux/bookingsSlice";
import { ButtonBase } from "@mui/material";
import {
  getClosestAvailableTimeId,
  isTimeInPast,
} from "../../Utils/getClosetTime";

const AvailableTime = ({ submitRef }) => {
  const selectedDate = useSelector((state) => state.bookings.date);
  const dispatch = useDispatch();

  const [selected, setSelected] = React.useState(() =>
    getClosestAvailableTimeId(availableTime, selectedDate)
  );

  React.useEffect(() => {
    const newClosest = getClosestAvailableTimeId(availableTime, selectedDate);
    setSelected(newClosest);
  }, [selectedDate]);

  React.useEffect(() => {
    const selectedTime = availableTime.find((t) => t.id === selected)?.time;
    if (selectedTime) {
      dispatch(addAvailableTime(selectedTime));
    }
  }, [selected, dispatch]);

  const getDisabledStatus = (timeObj) =>
    !timeObj.isAvailable || isTimeInPast(timeObj.time, selectedDate);

  const userData = useSelector((state) => {
    const { person, availableTime, date, bookingsForm, subService } =
      state.bookings;
    return { person, availableTime, date, bookingsForm, subService };
  });

  const form = userData.bookingsForm;

  const requiredFields = ["fullName", "email", "phoneNumber"];
  const hasFilledForm = requiredFields.every((field) => {
    const value = form?.[field];
    return typeof value === "string" && value.trim() !== "";
  });

  const hasSelectedSubService =
    Array.isArray(userData.subService) && userData.subService.length > 0;

  const isButtonReady = hasFilledForm && hasSelectedSubService;

  return (
    <div className="mt-2 px-4 md:px-0">
      <p className="text-sm text-darkPurple font-bold mb-2 my-4">
        Choose Available time
      </p>
      <ul className="grid grid-cols-4 gap-2 mx-auto w-full max-w-[95%]">
        {availableTime.map((time) => {
          const isDisabled = getDisabledStatus(time);

          return (
            <li className="flex items-center justify-center" key={time.id}>
              <div
                className={`w-[75px] h-[40px] text-sm shadow-sm rounded-md border border-[#F2F4F7] font-normal transition-all duration-500 ease-in-out ${
                  isDisabled
                    ? "bg-[#EAECF0] text-[#98A2B3]"
                    : selected === time.id
                    ? "bg-gold-purple text-white font-bold"
                    : "bg-[#F2F4F7] text-darkPurple"
                }`}
              >
                <ButtonBase
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    color: isDisabled
                      ? "#98A2B3"
                      : selected === time.id
                      ? "white"
                      : "#6A0DAD",
                  }}
                  onClick={() => setSelected(time.id)}
                  disabled={isDisabled}
                >
                  {time.time}
                </ButtonBase>
              </div>
            </li>
          );
        })}
      </ul>
      <Button
        disabled={!isButtonReady}
        onClick={() => submitRef.current?.click()}
        backgroundColor={"#6A0DAD"}
        sx={{
          width: "100%",
          color: "#fff",
          marginTop: "3rem",
          "&:hover": {
            backgroundColor: "#5a0a99",
          },
        }}
      >
        Continue
      </Button>
    </div>
  );
};

export default AvailableTime;

const availableTime = [
  { id: 1, time: "09:00AM", isAvailable: true },
  { id: 2, time: "09:30AM", isAvailable: true },
  { id: 3, time: "10:00AM", isAvailable: true },
  { id: 4, time: "10:30AM", isAvailable: true },
  { id: 5, time: "11:00AM", isAvailable: false },
  { id: 6, time: "11:30AM", isAvailable: true },
  { id: 7, time: "12:00AM", isAvailable: false },
  { id: 8, time: "12:30AM", isAvailable: true },
  { id: 9, time: "1:00PM", isAvailable: true },
  { id: 10, time: "1:30PM", isAvailable: false },
  { id: 11, time: "2:00PM", isAvailable: true },
  { id: 12, time: "2:30PM", isAvailable: true },
  { id: 13, time: "3:00PM", isAvailable: true },
  { id: 14, time: "3:30PM", isAvailable: true },
  { id: 15, time: "4:00PM", isAvailable: false },
  { id: 16, time: "4:30PM", isAvailable: true },
  { id: 17, time: "5:00PM", isAvailable: true },
  { id: 18, time: "5:30PM", isAvailable: true },
  { id: 19, time: "6:00PM", isAvailable: true },
  { id: 20, time: "6:30PM", isAvailable: true },
];
