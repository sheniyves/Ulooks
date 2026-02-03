import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import {
  CustomNextMonthButton,
  CustomPreviousMonthButton,
} from "./CalendarControls";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { addDate } from "../../redux/bookingsSlice";

const Calendar = () => {
  const today = new Date();
  const [selected, setSelected] = useState(today);
  const [month, setMonth] = useState(today);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addDate(today.toISOString().slice(0, 10)));
  }, []);

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  const handleSelect = (date) => {
    setSelected(date);
    if (date) {
      dispatch(addDate(date.toISOString().slice(0, 10)));
    }
  };

  return (
    <div className="bg-white rounded-lg w-full">
      <p className="text-sm text-darkPurple font-bold mb-2">Choose Date</p>

      <div className="bg-[#eaecf0] p-2 rounded-xl flex items-center justify-between mb-2">
        <CustomPreviousMonthButton
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() - 1))
          }
        />
        <p className="text-darkPurple font-bold text-sm">
          {format(month, "MMMM yyyy")}
        </p>
        <CustomNextMonthButton
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() + 1))
          }
        />
      </div>

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        month={month}
        animate
        onMonthChange={handleMonthChange}
        disabled={{ before: new Date() }}
        fromMonth={new Date(2020, 0)}
        toYear={2025}
        classNames={{
          months: "flex flex-col shadow-none justify-center",
          month: "w-full",
          head_row: "flex text-sm text-gray-500",
          row: "flex justify-center",
          cell: "w-10 h-10 flex items-center justify-center text-sm rounded-full",
          day_selected: "bg-[#6A0DAD] text-white",
          day_today: "bg-darkPurple text-white",
        }}
      />
    </div>
  );
};

export default Calendar;
