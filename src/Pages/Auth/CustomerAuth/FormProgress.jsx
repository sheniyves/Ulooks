import React from "react";

const FormProgress = ({currentStep, filled, maxSteps = 3}) => {
  const progressPercent = (currentStep / maxSteps) * 100;

  return (
    <div
      style={{
        backgroundColor: "#F4E2FE",
        borderRadius: "4px",
        width: "100%",
        height: "3px",
        overflow: "hidden",
        display: "block",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: filled,
          width: `${progressPercent}%`,
          height: "100%",
          transition: "width 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default FormProgress;
