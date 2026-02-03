import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const steps = ["Booked", "Waiting", "In Progress", "Finished"];

const ServiceProgressBar = ({ currentStepIndex = 0 }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Dynamically update container width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize(); // initial
    window.addEventListener("resize", handleResize); // on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate progress fill width
  const stepGap = steps.length - 1;
  const fillWidth = stepGap > 0 ? (containerWidth / stepGap) * currentStepIndex : 0;

  return (
    <div className="w-full px-4 py-8">
      <div className="relative" ref={containerRef}>
        {/* Base gray line */}
        <div className="h-2 bg-gray-300 rounded-full" />

        {/* Progress fill */}
        <div
          className="absolute top-0 left-0 h-2 bg-purple-700 rounded-full transition-all duration-500"
          style={{ width: `${fillWidth}px` }}
        />

        {/* Step markers */}
        <div className="absolute top-1/2 left-0 w-full flex justify-between transform -translate-y-1/2">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={clsx(
                  "w-6 h-6 rounded-full border-2",
                  index <= currentStepIndex
                    ? "bg-purple-700 border-purple-700"
                    : "bg-white border-gray-400"
                )}
              />
              <span
                className={clsx(
                  "text-sm mt-2",
                  index === currentStepIndex ? "text-purple-700 font-semibold" : "text-gray-500"
                )}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceProgressBar;
