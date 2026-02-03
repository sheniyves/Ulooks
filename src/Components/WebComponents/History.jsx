import React, { useRef, useEffect, useState } from "react";
import ServiceActionCards from "./ServiceActionCards";
import { services } from "../../data/barbingService";
import { useMotionValue } from "framer-motion";
import { motion } from "framer-motion";

const History = ({children}) => {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const scrollWidth = container.scrollWidth;

        if (scrollWidth > containerWidth) {
          setConstraints({
            left: -(scrollWidth - containerWidth),
            right: 0,
          });
        } else {
          setConstraints({ left: 0, right: 0 });
        }
      }
    };

    calculateConstraints();

    // Recalculate on window resize
    const handleResize = () => calculateConstraints();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [services.length]);

  return (
    <div className="mt-10 overflow-hidden" ref={containerRef}>
      <div className="flex items-center justify-between ">
        <h1 className="text-[#667085] text-xl font-medium">History</h1>
        <span className="text-blue hover:underline text-sm font-medium cursor-pointer block mr-8">
          See more
        </span>
      </div>
      <motion.ul
        style={{ x }}
        drag="x"
        dragConstraints={constraints}
        className="flex items-center gap-4 mt-4 cursor-grab active:cursor-grabbing list-none"
      >
       {children}
      </motion.ul>
    </div>
  );
};

export default History;

