import React from "react";

const MonthsRow = ({selectedMonth}) => {
  const months = ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"];
  return (
    <div>
      <ul className="flex items-center gap-2 justify-between mt-6">
        {months.map((month, i) => (
          <li
            key={i}
            className={`uppercase flex items-center justify-center  shadow-md w-6 h-6 rounded-full font-medium text-[.75rem] ${
              selectedMonth.includes(i)
                ? "bg-[#6a0dad] text-white"
                : "bg-[#d0d5dd] text-black"
            }`}
          >
            {month}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthsRow;
