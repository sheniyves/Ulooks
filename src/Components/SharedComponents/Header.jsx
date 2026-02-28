import { IconButton } from "@mui/material";
import React from "react";
import Content from "./Content";
import { useNavigate } from "react-router-dom";

const Header = ({ children, icon, action, iconPresence = true, ...props }) => {
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <Content>
      <div className=" flex items-center justify-between -mt-0 md:-mt-8 -mb-3">
        <h1
          {...props}
          onClick={ iconPresence ? handleNavigateBack : null}
          className={`font-bold text-transparent bg-gold-purple inline-block bg-clip-text font-fashion  text-[1.75rem]  ${
             iconPresence ? "cursor-pointer" : "cursor-default"
          }`}
        >
          {children}
        </h1>
        <div className="block lg:hidden">
          {iconPresence && (
            <IconButton onClick={() => action.current?.openDialog()}>
              <img src={icon} alt="Header icon" />
            </IconButton>
          )}
        </div>
      </div>
    </Content>
  );
};

export default Header;
