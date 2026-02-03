import React from "react";

const Container = ({ children, useMargin = true }) => {
  const marginTop = "pt-8  lg:pt-[8rem]";
  return (
    <div
      className={` ml-0 lg:ml-[320px]  px-4 md:px-8 ${
        useMargin ? marginTop : null
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
