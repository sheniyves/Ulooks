import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cNavs, spNavs } from "../../data/navs";
import { useQueryFn } from "../../../hooks/queryFn";
import { userProfile } from "../../api/profile";
import { Avatar } from "@mui/material";

const MobileNavbar = ({ navType = "customer" }) => {
  const { data } = useQueryFn({
    key: ["userProfile"],
    fun: userProfile,
  });
  let stored = localStorage.getItem("isActive");
  try {
    stored = stored ? JSON.parse(stored) : "Home";
  } catch {
    stored = "Home";
  }
  const [isActive, setIsActive] = useState(stored);

  const navs = navType === "customer" ? cNavs : spNavs;

  const IconColor =
    navType === "customer"
      ? "brightness(0) saturate(100%) invert(13%) sepia(98%) saturate(4457%) hue-rotate(274deg) brightness(71%) contrast(104%)"
      : "brightness(0) saturate(100%) invert(53%) sepia(98%) saturate(1021%) hue-rotate(353deg) brightness(101%) contrast(91%)";

  const [activeStyle, setActiveStyle] = useState({ left: 0, width: 0 });
  const itemRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const idx = navs.findIndex((nav) => nav.label === isActive);
    const el = itemRefs.current[idx];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setActiveStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [isActive]);

  const handleClick = (nav, index) => {
    setIsActive(nav.label);
    navigate(nav.to);
  };

  React.useEffect(() => {
    localStorage.setItem("isActive", JSON.stringify(isActive));
  }, [isActive]);

  return (
    <div className="w-full fixed bottom-0 shadow-md bg-[#f9f4fc] backdrop-blur-md z-50 block lg:hidden border-t border-[#b3b3b3]">
      <ul className="flex relative px-4 pt-4 pb-3 justify-between">
        <span
          className={`absolute h-1 ${
            navType === "customer" ? "bg-[#6A0DAD]" : "bg-[#F79009]"
          } rounded-b-full transition-all duration-300`}
          style={{
            top: 0,
            left: `${activeStyle.left}px`,
            width: `${activeStyle.width}px`,
          }}
        />
        {navs.map((nav, index) => {
          return (
            <li
              key={nav.label}
              onClick={() => handleClick(nav, index)}
              ref={(el) => (itemRefs.current[index] = el)}
              className="flex flex-col items-center gap-1 cursor-pointer text-sm text-gray-700 px-2"
            >
              {nav.label === "Profile" ? (
                <Avatar sizes="small" sx={{width: "1.5rem", height: "1.5rem"}} src={data?.profile_picture_url} />
              ) : (
                <img
                  src={nav.icon}
                  alt={`${nav.label} icon`}
                  style={
                    isActive.includes(nav.label)
                      ? {
                          filter: IconColor,
                        }
                      : {}
                  }
                />
              )}

              <p
                className={`text-xs font-medium ${
                  isActive.includes(nav.label)
                    ? navType === "customer"
                      ? "text-darkPurple"
                      : "text-[#F79009]"
                    : "text-[#98A2B3]"
                }`}
              >
                {nav.label}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileNavbar;

// const mobileNavs = [
//   { icon: homeIcon, label: "Home", to: "/customerWebApp/home" },
//   {
//     icon: calenderIcon,
//     label: "Appointments",
//     to: "/customerWebApp/appointments",
//   },
//   { icon: walletIcon, label: "Wallet", to: "/customerWebApp/wallet" },
//   { icon: messageIcon, label: "Message", to: "/customerWebApp/message" },
//   { icon: profileIcon, label: "Profile", to: "/customerWebApp/profile" },
// ];
