import React from "react";

const Content = ({
  children,
  shift = "ml-0 lg:ml-[320px]",
  useMargin = true,
  useInlinepadding = true,
  useMarginRight= true
}) => {
  const marginTop = "  md:mt-0 lg:mt-8  lg:mt-[7rem]";
  return (
    <div
      className={` ${shift}  ${useInlinepadding ? "px-4" : "px-0"}  ${useMarginRight ? "md:pr-8" : "md:mr-0"} ${
        useMargin ? marginTop : null
      }`}
    >
      {children}
    </div>
  );
};

export default Content;
