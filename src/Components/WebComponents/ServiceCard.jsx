import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import rating from "../../assets/Images/starGold.svg";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const scrollRef = React.useRef(null);
  const { scrollX } = useScroll({ target: scrollRef });
  const scroll = useTransform(scrollX, [0, 1], [0, 1]);

  return (
    <div style={{ transformBox: scroll }} ref={scrollRef}>
      <li className="flex items-start gap-2 max-w-[500px]">
        <Link to={`/customerWebApp/appointments/${service.id}`}>
          <img
            className="cursor-pointer"
            src={service.image}
            alt={`${service.image} brand logo`}
          />
        </Link>
        <div className="w-full">
          <h2 className=" text-2xl font-fashion font-bold text-darkerPurple">
            {service.name}
          </h2>
          <p className="text-purple">{service.location}</p>
          <div className="flex items-center justify-between mt-5">
            <p className="text-gray">{service.distance}</p>
            <span className="flex items-center gap-2">
              <img src={rating} alt="rating icon" /> {service.rating}
            </span>
          </div>
        </div>
      </li>
    </div>
  );
};

export default ServiceCard;
