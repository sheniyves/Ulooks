import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../../assets/Images/image (2).png";
import ChatNavbar from "../../Components/SharedComponents/ChatNavbar";
import { Avatar, Badge, styled } from "@mui/material";
import callIcon from "../../assets/Images/call.svg";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import chatBackground from "../../assets/Images/chat_background_customer.svg";
import ChatActionArea from "../../Components/WebComponents/ChatActionArea";

const CustomerMessage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(location.state.previousUrl);
  };
  
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <div>
      <ChatNavbar />
      <ConatinerWidth>
        <div className="grid gap-0 lg:gap-8 grid-cols-1 lg:grid-cols-[30%_68%]">
          <div className=" py-7 lg:mt-[6rem] shadow-md md:shadow-none">
            <div className="flex items-center justify-between w-full px-4 md:pl-10 xl:pl-20">
              <div className="flex items-center gap-2">
                <img
                  onClick={handleGoBack}
                  src={arrowLeft}
                  alt="arrow left icon"
                  className="cursor-pointer"
                />
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" src={image} />
                </StyledBadge>
                <p className="text-base font-bold text-darkPurple">
                  Perfect Beauty Cutz
                </p>
              </div>
              <img src={callIcon} alt="call icon" className="cursor-pointer" />
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${chatBackground})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "100%",
              "--chatAreaHeight": "calc(100svh - 6rem)", 
              height: "var(--chatAreaHeight)",
            }}
            className="pt-10 lg:pt-0 lg:mt-[6rem] w-full bg-[#d39bf4] -mr-6 relative flex flex-col"
          >
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-2">hello</div>
              <div className="mb-2">this is a long chat...</div>
              <div className="mb-2">keep scrolling...</div>
              <div className="mb-2">bottom test</div>
              <div className="mb-2">another message</div>
              <div className="mb-2">final message</div>
            </div>

            <div className="w-full">
              <ChatActionArea />
            </div>
          </div>
        </div>
      </ConatinerWidth>
    </div>
  );
};

export default CustomerMessage;
