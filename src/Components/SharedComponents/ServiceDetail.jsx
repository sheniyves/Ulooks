import React from "react";
import locationIcon from "../../assets/Images/gray-location-icon.svg";
import star from "../../assets/Images/gray-star.svg";
import { IconButton } from "@mui/material";
import ActionButtons from "./ActionButtons";
import PageTransition from "./PageTransition";
import DetailsSwitcher from "./DetailsSwitcher";
import ServiceDetailsAboutUs from "./ServiceDetailsAboutUs";
import ServiceDetailsServices from "./ServiceDetailsServices";
import ServiceDetailsReviews from "./ServiceDetailsReviews";
import Map from "../WebComponents/Map";
import Container from "./Container";
import ShimmerButton from "./ShimmerButton";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../Utils/presistStorage";
import badge1 from "../../assets/Images/sp_badge_grade_1.svg";
import badge2 from "../../assets/Images/sp_badge_grade_2.svg";
import badge3 from "../../assets/Images/sp_badge_grade_3.svg";
import badge4 from "../../assets/Images/sp_badge_grade_4.svg";
import { useLocation, useNavigate } from "react-router-dom";

const ServiceDetail = ({ serviceDetail, dialogRef }) => {
  React.useEffect(() => {
    removeFromLocalStorage("activeDetails");
  }, []);

  return (
    <PageTransition>
      <div className="grid gap-y-8 md:gap-8 grid-cols-1 md:grid-cols-[40%_60%] mt-4">
        <Card1 serviceDetail={serviceDetail} dialogRef={dialogRef} />
        <Card2 serviceDetail={serviceDetail} />
      </div>
    </PageTransition>
  );
};

export default ServiceDetail;

const Card1 = ({ serviceDetail, dialogRef }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewBadge = () => {
    navigate("/customerWebApp/badgeExplanation", {
      state: { previousUrl: location.pathname },
    });
  };
  const handleBadge = (grade) => {
    switch (grade) {
      case "starter":
        return badge1;
      case "growing":
        return badge2;
      case "trusted":
        return badge3;
      case "master":
        return badge4;

      default:
        return badge4;
    }
  };
  return (
    <div className=" max-w-none md:max-w-[22.6rem] w-full">
      <div className=" max-h-[19.6rem] w-full h-full relative rounded-lg overflow-hidden p-0 ">
        <img
          className="rounded-lg w-full  h-full object-cover scale-105"
          src={serviceDetail.image}
          alt="service detail image"
        />
        {serviceDetail.status === "Active" && (
          <div className="bg-[#12B76A] absolute  top-0 right-0  flex items-center justify-white text-white font-medium capitalize px-4 py-3">
            Active
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <h2 className="font-fashion mt-4 mb-2 font-bold  text-[1.75rem] text-darkPurple">
          {serviceDetail.name}
        </h2>
        <div
          onClick={handleViewBadge}
          className="flex items-center justify-center flex-col cursor-pointer"
        >
          <img
            className="w-12"
            src={handleBadge(serviceDetail.badge)}
            alt="service provider grade badge"
          />
          <span className="text-sm text-darkPurple capitalize">
            {serviceDetail.badge} stylist{" "}
          </span>
        </div>
      </div>
      <ul className="flex flex-col text-gray font-medium gap-y-2 mb-4">
        <li className="flex items-center gap-2">
          <img src={locationIcon} alt="location icon" />
          {serviceDetail.location}
        </li>
        <li className="flex items-center gap-2">
          <img src={star} alt="star icon" />
          {`${serviceDetail.rating}.0`}
        </li>
      </ul>
      <Map location={serviceDetail.location} dialogRef={dialogRef} />
      <ActionButtons dialogRef={dialogRef} />
    </div>
  );
};
const Card2 = ({ serviceDetail }) => {
  const [active, setActive] = React.useState(() =>
    getFromLocalStorage("activeDetails", 0)
  );
  React.useEffect(() => {
    setToLocalStorage("activeDetails", active);
  }, [active]);
  return (
    <div className="max-w-none md:max-w-[32.1rem] w-full">
      <DetailsSwitcher setActive={setActive} active={active} />
      {active === 0 && <ServiceDetailsAboutUs serviceDetail={serviceDetail} />}
      {active === 1 && <ServiceDetailsServices serviceDetail={serviceDetail} />}
      {active === 2 && <ServiceDetailsReviews serviceDetail={serviceDetail} />}
    </div>
  );
};
