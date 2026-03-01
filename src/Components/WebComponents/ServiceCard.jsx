import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import defaultImage from "../../assets/Images/image background.png";

const ServiceCard = ({ service, isPending, isError }) => {
  if (isPending) {
    return (
      <li className="flex-shrink-0">
        <div className="flex flex-col items-center justify-center gap-2">
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" width={70} height={16} />
          <Skeleton
            variant="text"
            width={50}
            height={14}
            sx={{ marginTop: "-.5rem" }}
          />
        </div>
      </li>
    );
  }

  if (isError) {
    return (
      <li className="flex-shrink-0">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="rounded-full w-20 h-20 bg-gray/20 flex items-center justify-center">
            <span className="text-gray/50 text-xs text-center">!</span>
          </div>
          <p className="font-urbanist text-nowrap text-xs font-bold text-red-400">
            Failed
          </p>
        </div>
      </li>
    );
  }

  return (
    <li className="flex-shrink-0 cursor-grab">
      <div className="flex flex-col items-center justify-center gap-2">
        <Link to={`/customerWebApp/appointments/${service.id}`}>
          <img
            className="cursor-pointer object-cover object-center flex-shrink-0 rounded-full w-20 h-20"
            src={service?.image_url ?? defaultImage}
            alt={`${service.category} brand logo`}
          />
        </Link>
        <p className="font-urbanist text-center text-nowrap text-xs font-bold text-darkerPurple -mb-2">
          {service?.provider_name}
        </p>
        <p className="font-urbanist text-nowrap text-xs font-semibold text-gray/80">
          {service?.orders_count} orders
        </p>
      </div>
    </li>
  );
};

export default ServiceCard;
