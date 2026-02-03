import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import addIcon from "../../assets/Images/add.svg";
import { IconButton } from "@mui/material";

const ManageService = ({ drawerRef }) => {
  return (
    <div>
      <div className="flex items-center justify-between max-w-[30rem]">
        <DrawerHeader drawerRef={drawerRef} title={"Manage Service"} />
        <IconButton>
          <img className="w-[90%]" src={addIcon} alt="Add icon" />
        </IconButton>
      </div>
      <div className="flex flex-col items-center justify-center h-full"></div>
    </div>
  );
};

export default ManageService;
