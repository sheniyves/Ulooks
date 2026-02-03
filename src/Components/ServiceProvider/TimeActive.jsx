import React from "react";

const TimeActive = () => {
  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-gray text-lg font-medium">
        You have been active for 10 mins
      </p>
      <div className="relative w-5 h-5 mr-4">
        <span className="absolute inset-0 block w-5 h-5 rounded-full bg-[#32D583] shadow-md ripple" />
        <span className="relative block w-5 h-5 rounded-full bg-[#32D583] shadow-sm" />
      </div>
    </div>
  );
};


export default TimeActive;
