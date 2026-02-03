import React from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../Utils/presistStorage";
import { useDispatch } from "react-redux";
import { addScheduledMonths } from "../../redux/bookingsSlice";

const ScheduledService = () => {
  return (
    <div>
      <Months />
    </div>
  );
};

export default ScheduledService;

const months = ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"];

const Months = () => {
  const currentMonthIndex = new Date().getMonth();

  const [selectedMonth, setSelectedMonth] = React.useState(() =>
    getFromLocalStorage("months", [currentMonthIndex])
  );
  //Used for checkout
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(addScheduledMonths(selectedMonth));
  }, [selectedMonth, dispatch]);

  //Presist to local storage
  React.useEffect(() => {
    setToLocalStorage("months", selectedMonth);
  }, [selectedMonth]);

  //Make sure we reveret to current month if all is unclicked
  React.useEffect(() => {
    if (selectedMonth.length === 0) {
      setSelectedMonth([currentMonthIndex]);
    }
  }, [selectedMonth]);

  const handleMonthSelection = (index) => {
    setSelectedMonth((prev) => {
      const isCurrentMonth = index === currentMonthIndex;

      if (prev.includes(index)) {
        if (isCurrentMonth && prev.length === 1) return prev;

        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <ul className="flex items-center gap-2 justify-between mt-6">
      {months.map((month, i) => (
        <li
          onClick={() => handleMonthSelection(i)}
          key={i}
          className={`uppercase flex items-center justify-center cursor-pointer shadow-md w-6 h-6 rounded-full font-medium text-[.75rem] ${
            selectedMonth.includes(i)
              ? "bg-[#6a0dad] text-white"
              : "bg-white text-black"
          }`}
        >
          {month}
        </li>
      ))}
    </ul>
  );
};
