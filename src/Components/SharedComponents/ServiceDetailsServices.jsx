import React from "react";
import PageTransition from "./PageTransition";
import {
  handleDurationFormatting,
  handlePriceFormatting,
} from "../../Utils/formattingFunction";
import Button from "../WebComponents/Button";
import { Link } from "react-router-dom";

const ServiceDetailsServices = ({ serviceDetail }) => {
  const details = serviceDetail.services;
  return (
    <PageTransition>
      <div className="mt-6 px-0 xs:px-2">
        <p className="font-medium text-darkPurple mb-2">Opening Hours</p>
        <ul className="flex flex-col gap-y-2">
          {details.map((detail, idx) => (
            <ServicesRows key={idx} detail={detail} />
          ))}
        </ul>
       <Link to={`/customerWebApp/home/${serviceDetail.id}/startKYC`}>
        <Button
          sx={{
            backgroundColor: "#6A0DAD",
            width: "100%",
            color: "#fff",
            marginTop: "2rem",
            "&:hover": {
              backgroundColor: "#5a0a99",
            },
          }}
        >
          Book Now
          </Button>
          </Link>
        <Button
          sx={{
            backgroundColor: "transparent",
            width: "100%",
            marginTop: "1rem",
            border: "2px solid #6A0DAD",
            color: "#6A0DAD",
            "&:hover": {
              backgroundColor: "#e0bbff ",
            },
          }}
        >
          Book Home service
        </Button>
      </div>
    </PageTransition>
  );
};

export default ServiceDetailsServices;

const ServicesRows = ({ detail }) => {
  return (
    <li className="flex items-center justify-between">
      <div className="flex gap-2">
        <img className="max-w-[3.4rem] w-full rounded-full+" src={detail.image} alt="user profile" />
        <div className="flex flex-col ">
          <h3 className="text-darkPurple font-medium text-lg">
            {detail.styles}
          </h3>
          <span className="text-gray font-medium text-xs">{detail.spec}</span>
        </div>
      </div>
      <div className="flex flex-col text-right">
        <h3 className="text-darkPurple font-medium text-lg">
          {handlePriceFormatting(detail.price)}
        </h3>
        <span className="text-gray font-medium text-xs">
          {handleDurationFormatting(detail.duration)}
        </span>
      </div>
    </li>
  );
};
