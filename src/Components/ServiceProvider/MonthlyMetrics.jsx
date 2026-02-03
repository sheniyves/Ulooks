import React from "react";
import { handleFormatting } from "../../Utils/formattingFunction";
import calendarIcon from "../../assets/Images/calendar-gradient.svg";
import moneyIcon from "../../assets/Images/money-gradient.svg";
import starIcon from "../../assets/Images/calendar-gradient.svg";

const MonthlyMetrics = () => {
  return (
    <div className="bg-[#FEF0C7] rounded-xl shadow-sm p-4 py-6">
      <p className="text-yellow_gold text-sm font-bold capitalize">
        Monthly Metrics
      </p>
      <ul className="flex items-center gap-3 justify-between mt-4">
        {metrics.map((metric) => (
          <li
            className="flex items-center text-center justify-center flex-col "
            key={metric.id}
          >
            <img src={metric.icon} alt={`${metric.label} Icon`} />
            <h2 className="text-orange_gold font-bold text-[1.75rem] ">
              {metric.label === "Monthly Earnings"
                ? handleFormatting(metric.value)
                : metric.value}
            </h2>
            <p className="text-yellow_gold text-sm font-bold capitalize">
              {" "}
              {metric.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyMetrics;

const metrics = [
  { id: 1, icon: calendarIcon, value: 24, label: "Total Booking" },
  { id: 2, icon: moneyIcon, value: 24500, label: "Monthly Earnings" },
  { id: 3, icon: starIcon, value: 3.5, label: "Customer Ratings" },
];
