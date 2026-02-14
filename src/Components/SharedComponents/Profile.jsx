import React from "react";
import defaultProfile from "../../assets/Images/profileNav.svg";
import { Zoom, Tooltip, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const Profile = ({ to, name, type, profile }) => {
  return (
    <Tooltip
      title="Profile"
      slots={{
        transition: Zoom,
      }}
    >
      <Link to={to}>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar src={profile || defaultProfile} alt="profile icon" />
          <div>
            <p className="text-sm text-darkerPurple capitalize font-bold whitespace-nowrap ">
              {name}
            </p>
            <span className="text-gray text-xs font-semibold block">
              {type}
            </span>
          </div>
        </div>
      </Link>
    </Tooltip>
  );
};

export default Profile;
