import { Avatar, AvatarGroup, Divider } from "@mui/material";
import React from "react";
import badge1 from "../../assets/Images/sp_badge_grade_1.svg";
import badge2 from "../../assets/Images/sp_badge_grade_2.svg";
import badge3 from "../../assets/Images/sp_badge_grade_3.svg";
import badge4 from "../../assets/Images/sp_badge_grade_4.svg";
import image1 from "../../assets/Images/image (6).png";
import image2 from "../../assets/Images/image (3).png";
import galleryIcon from "../../assets/Images/gallery-import-lp.svg";
import sendText from "../../assets/Images/send_text.svg";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";

const ViewBookedSevice = ({ data }) => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleViewBadge = () => {
      navigate("/customerWebApp/badgeExplanation", {
        state: { previousUrl: location.pathname },
      });
    };
  const handleBadge = (grade) => {
    switch (grade) {
      case "starter":
        return badge1;
      case "growing":
        return badge2;
      case "trusted":
        return badge3;
      case "master":
        return badge4;

      default:
        return badge4;
    }
  };
  return (
    <div>
      <p className="font-bold text-[#667085] text-xl text-center mb-5">
        Your Service Has been Booked
      </p>
      <div className="flex items-center justify-between w-full ">
        <p className="text-gray text-sm align-middle basis-1/2">
          Distance from your Location <br /> to Service Provider location
        </p>
        <div className="flex items-center justify-end  w-full basis-1/2">
          <div className="bg-darkPurple rounded-md shadow-md w-20 h-20 flex items-center justify-center text-center">
            <h3 className="text-white font-medium text-lg">
              22 <br /> Min
            </h3>
          </div>
        </div>
      </div>
      <Divider sx={{ color: "#D0D5DD", margin: ".5rem 0" }} />
      <p className="font-bold text-[#667085] text-xl  mt-4 mb-5">
        Perfect Beauty Cutz
      </p>
      <div className="flex items-center justify-between">
        <p className="text-darkPurple text-lg font-medium">
          Rating: {data.rating}
        </p>
        <div onClick={handleViewBadge} className="flex items-center justify-center flex-col cursor-pointer">
          <img
            className="w-12"
            src={handleBadge(data.badge)}
            alt="service provider grade badge"
          />
          <span className="text-sm text-darkPurple capitalize">
            {data.badge} stylist{" "}
          </span>
        </div>
      </div>
      <Divider sx={{ color: "#D0D5DD", margin: ".5rem 0" }} />

      <div className="flex items-center justify-between w-full">
        <AvatarGroup>
          <Avatar src={image1} alt="My profile picture" />
          <Avatar src={image2} alt="Service procider profile picture" />
        </AvatarGroup>
        <div className="flex flex-col items-start gap-2">
          <span className="text-gray text-sm ">Receipt No</span>
          <p className="text-lg text-darkPurple font-medium">UL192AF</p>
        </div>
      </div>
      <Divider sx={{ color: "#D0D5DD", margin: ".5rem 0" }} />
      <div className="w-full bg-[#eaecf0] rounded-md flex item-center  my-4 justify-between pr-4">
        <input
          type="text"
          placeholder="Type a message here..."
          className="border-0 outline-none p-4 bg-transparent w-full"
        />
        <img
          src={sendText}
          width={24}
          height={24}
          alt="Send  text to provider icon"
          className="cursor-pointer"
        />
      </div>

      <Button
        backgroundColor="#F4E2FE"
        color="#6A0DAD"
        sx={{ width: "100%", border: "1px solid #6A0DAD" }}
      >
        <img
          src={galleryIcon}
          width={24}
          height={24}
          alt="upload from gallery icon"
        />
        Folow user on Inspo
          </Button>
          <div className="h-10" />
    </div>
  );
};

export default ViewBookedSevice;
