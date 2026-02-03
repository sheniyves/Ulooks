import timeArrowUpIcon from "../../assets/Images/time_arrow_up.svg";
import timeArrowDownIcon from "../../assets/Images/time_arrow_down.svg";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { setDate } from "../../redux/newBookingSlice";

function TimeSpinInput({ label, value, onChange, step = 10 }) {
  const increase = () => onChange(value + step);
  const decrease = () => onChange(Math.max(0, value - step));

  const hours = Math.floor(value / 60) % 12 || 12;
  const minutes = value % 60;
  const formatted = `${hours}:${minutes.toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <IconButton
        onClick={increase}
        className="p-1 rounded hover:bg-gray-200 transition"
      >
        <img src={timeArrowUpIcon} alt="increasing time arrow" />
      </IconButton>
      <span className="text-2xl font-bold text-[#667085]">{formatted}</span>
      <IconButton
        onClick={decrease}
        className="p-1 rounded hover:bg-gray-200 transition"
      >
        <img src={timeArrowDownIcon} alt="decreasing time arrow" />
      </IconButton>
    </div>
  );
}

export default function DateRange() {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const Day = new Date().getUTCDate();
  console.log({ hour, minute, Day });
  const [day, setDay] = useState(Day);
  const [time, setTime] = useState(hour * 60 + minute);
  const [ampm, setAmPm] = useState(hour >= 12 ? "PM" : "AM");

  const toggleAmPm = () => setAmPm(ampm === "AM" ? "PM" : "AM");
  const dispatch = useDispatch();
  React.useEffect(() => {
    const hours = Math.floor(time / 60) % 12 || 12;
  const minutes = time % 60;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;

  dispatch(setDate({
    day,
    time: formattedTime, 
    ampm,
  }));
  }, [day, time, ampm]);

  return (
    <div className="flex justify-between gap-6 mt-4 px-2">
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-600">Date</span>
        <IconButton
          onClick={() => setDay(day + 1)}
          className="p-1 rounded hover:bg-gray-200 transition"
        >
          <img src={timeArrowUpIcon} alt="increasing time arrow" />
        </IconButton>
        <span className="text-2xl font-bold text-[#667085]">{day}</span>
        <IconButton
          onClick={() => setDay(Math.max(1, day - 1))}
          className="p-1 rounded hover:bg-gray-200 transition"
        >
          <img src={timeArrowDownIcon} alt="decreasing time arrow" />
        </IconButton>
      </div>

      <TimeSpinInput label="Time" value={time} onChange={setTime} step={10} />

      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-600">AM/PM</span>
        <IconButton
          onClick={toggleAmPm}
          className="p-1 rounded hover:bg-gray-200 transition"
        >
          <img src={timeArrowUpIcon} alt="increasing time arrow" />
        </IconButton>
        <span className="text-2xl font-bold text-[#667085]">{ampm}</span>
        <IconButton
          onClick={toggleAmPm}
          className="p-1 rounded hover:bg-gray-200 transition"
        >
          <img src={timeArrowDownIcon} alt="decreasing time arrow" />
        </IconButton>
      </div>
    </div>
  );
}
