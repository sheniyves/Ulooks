import React from "react";
import PageTransition from "./PageTransition";
import { handleRatingFormaatting } from "../../Utils/formattingFunction";
import goldStar from "../../assets/Images/gold-star.svg";
import grayStar from "../../assets/Images/gray-star.svg";
import Button from "../WebComponents/Button";
import { Link } from "react-router-dom";
const ServiceDetailsReviews = ({ serviceDetail }) => {
  const details = serviceDetail.reviews || [];
  // console.log({ details });
  return (
    <PageTransition>
      <div className="mt-6 px-0 xs:px-2">
        <ul className="flex flex-col gap-y-2">
          {details.map((detail, idx) => (
            <ServiceReviews detail={detail} key={idx} />
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

export default ServiceDetailsReviews;

const ServiceReviews = ({ detail }) => {
  // console.log({ detail });
  return (
    <li className="flex gap-2">
      <div>
        <img
          className="min-w-[3.4rem] rounded-full w-[3.4rem]"
          src={detail.image}
          alt="user profile"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-darkPurple font-medium text-lg">{detail.name}</h3>
        <div className="flex items-center gap-4">
          {handleRatingFormaatting(detail.rating)?.map((rating, idx) => {
            return rating > 0 ? (
              <img
                className="max-w-[.73rem] w-full"
                key={idx}
                src={goldStar}
                alt="golden star icon"
              />
            ) : (
              <img
                className="max-w-[.73rem] w-full"
                key={`star ${idx}`}
                src={grayStar}
                alt="gray star icon"
              />
            );
          })}
        </div>
        <p className="text-gray text-lg font-medium">{detail.review}</p>
      </div>
    </li>
  );
};
