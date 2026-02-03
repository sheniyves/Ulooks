import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import image1 from "../../assets/Images/ads1.png";
import image2 from "../../assets/Images/ads2.png";
import image3 from "../../assets/Images/image (6).png";
import image4 from "../../assets/Images/image (3).png";
import image5 from "../../assets/Images/image (2).png";
import image6 from "../../assets/Images/ads1.png";
import image7 from "../../assets/Images/ads1.png";
import image8 from "../../assets/Images/ads2.png";
import image9 from "../../assets/Images/ads2.png";
import image10 from "../../assets/Images/ads2.png";
import image11 from "../../assets/Images/ads2.png";
import image12 from "../../assets/Images/ads2.png";

const RecentlyUsedService = () => {
  return (
    <div className="mt-6">
      <p className="text-darkPurple text-lg font-bold mb-2">
        Recent Paid Service Provider
      </p>
      <div className="flex justify-start">
        <AvatarGroup max={8} >
          {avatars.map((avatar, idx) => (
            <Avatar alt="service provider profile" src={avatar} key={idx} />
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
};

export default RecentlyUsedService;

const avatars = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
];
