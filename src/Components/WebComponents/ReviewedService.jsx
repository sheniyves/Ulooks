import React from "react";
import location from "../../assets/Images/gray-location-icon.svg";
import star from "../../assets/Images/gray-star.svg";
import clock from "../../assets/Images/clock-gray.svg";

const ReviewedService = ({ service, forSp = true }) => {
  const color = !forSp ? " text-yellow_gold" : " text-darkPurple";
  return (
    <div className="bg-[#FCFCFD] rounded-lg p-4 shadow-sm ">
      <div className="flex items-start gap-2 ">
        <div>
          <img
            className="rounded-lg w-full max-w-[5.88rem]  h-full object-cover mt-4"
            src={service.image}
            alt="service detail image"
          />
        </div>
        <div>
          <h2 className={`font-fashion mt-4 mb-2 font-bold  text-xl ${color}`}>
            {service.name}
          </h2>
          <ul className="flex flex-col text-gray font-medium gap-y-2 mb-4">
            <li className="flex items-center gap-2">
              <img src={location} alt="location icon" />
              {service.location}
            </li>
            {forSp && (
              <li className="flex items-center gap-2">
                <img src={star} alt="star icon" />
                {`${service.rating}.0`}
              </li>
            )}
            {!forSp && (
              <div>
                <li className="flex items-center gap-2">
                  <img src={clock} alt="clock icon" />
                  <div>
                    <p>{service.day}</p>
                  <p>{service.time}</p>
                  </div>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewedService;
