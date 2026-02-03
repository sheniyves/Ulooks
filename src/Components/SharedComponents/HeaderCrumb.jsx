import { IconButton } from "@mui/material";
import React from "react";
import Content from "./Content";
import { useNavigate } from "react-router-dom";

const HeaderCrumb = ({ children, ...props }) => {
  const navigate = useNavigate();
  return (
    <div
      {...props}
      className=" mt-[5%] lg:mt-0 flex items-center  gap-2 
     "
    >
      <h1
        onClick={() => navigate(-1)}
        className="font-bold cursor-pointer  text-transparent bg-gold-purple flex gap-3 bg-clip-text font-fashion  text-[1.75rem]"
      >
        {children}
      </h1>
    </div>
  );
};

export default HeaderCrumb;
