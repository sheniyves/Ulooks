import React from "react";
import PageTransition from "./PageTransition";
import Button from "../WebComponents/Button";
import { Link } from "react-router-dom";

const ServiceDetailsAboutUs = ({ serviceDetail }) => {
  const detail = serviceDetail.aboutUs;
  return (
    <PageTransition>
      <div className="mt-6 px-0 xs:px-2">
        <p className="text-lg text-darkPurple font-medium mb-5">
          {detail?.description}
        </p>
        <p className="font-medium text-darkPurple mb-2">Opening Hours</p>
        <div className="font-normal text-sm flex items-center justify-between mb-1">
          <span className="text-gray ">{detail.openingHours.days}</span>
          <span className="text-darkPurple ">{detail.openingHours.time}</span>
        </div>
        {serviceDetail.availableForHomeService && (
          <span className="text-gray ">Available for home services</span>
        )}
        <Link to={`/customerWebApp/${`book_now`}/${serviceDetail.id}/startKYC`}>
          <Button
            sx={{
              width: "100%",
              marginTop: "2rem",
              "&:hover": {
                backgroundColor: "#5a0a99",
              },
            }}
          >
            Book Now
          </Button>
        </Link>
        {/* <Link to={`/customerWebApp/${`book_for_later`}/${serviceDetail.id}/startKYC`}>
          <Button
            sx={{
              width: "100%",
              marginTop: "1rem",
              "&:hover": {
                backgroundColor: "#5a0a99",
              },
            }}
          >
            Book For Later
          </Button>
        </Link> */}
        <Button
          backgroundColor={"transparent"}
          color={"#6A0DAD"} 
          sx={{
            width: "100%",
            marginTop: "1rem",
            border: "2px solid #6A0DAD",
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

export default ServiceDetailsAboutUs;
