import React from "react";
import ServiceActionCards from "./ServiceActionCards";
import { services } from "../../data/barbingService";
import { motion, useMotionValue } from "framer-motion";

const UpcomingAppointments = ({ children }) => {
  const x = useMotionValue(0);
  const upcomingServices = services?.slice(0, 2);

  const getLeftConstraint = () => {
    if (upcomingServices.length <= 3) return 0;

    const cardWidth = 200;
    const gapWidth = 16;
    const containerWidth = window.innerWidth * 0.9;

    const totalCardsWidth = upcomingServices.length * (cardWidth + gapWidth);
    const scrollableWidth = totalCardsWidth - containerWidth;

    return Math.max(0, scrollableWidth);
  };

  return (
    <div>
      <h1 className="text-[#667085] text-xl font-medium mt-4">
        Upcoming Appointments
      </h1>
      <motion.ul
        style={{ x }}
        drag="x"
        dragConstraints={{
          left: -getLeftConstraint(),
          right: 10,
        }}
        className="flex items-center gap-4 mt-4 cursor-grab active:cursor-grabbing list-none"
      >
        {children}
      </motion.ul>
    </div>
  );
};

export default UpcomingAppointments;


