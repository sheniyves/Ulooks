import React from "react";
import logo from "../../assets/Images/Logo.svg";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../Utils/presistStorage";
import {
  cNavs,
  spNavs,
} from "../../data/navs";

const Sidebar = ({
  activeBgColor = "#F4E2FE",
  activeTextColor = "text-purple",
  profileBorderColor = "#6A0DAD",
  sidebarBgColor = "bg-white",
  navType = "customer",
}) => {
  const [isActive, setIsActive] = React.useState(() =>
    getFromLocalStorage("activeSidebarNav", "Home")
  );
  const navs =
    navType === "customer" ? cNavs : spNavs;

  const IconColor =
    navType === "customer"
      ? "brightness(0) saturate(100%) invert(13%) sepia(98%) saturate(4457%) hue-rotate(274deg) brightness(71%) contrast(104%)"
      : "brightness(0) saturate(100%) invert(53%) sepia(98%) saturate(1021%) hue-rotate(353deg) brightness(101%) contrast(91%)";

  const location = useLocation();
  React.useEffect(() => {
    const currentNav = navs.find((nav) => location.pathname.includes(nav.to));
    if (currentNav) {
      setIsActive(currentNav.label);
      setToLocalStorage("activeSidebarNav", currentNav.label);
    }
  }, [location.pathname]);

  const active = `   bg-[${activeBgColor}] font-semibold relative activeNav ${
    navType === "customer" ? "activeNav" : "activeNavsp"
  } overflow-hidden`;
  const navigate = useNavigate();
  const handleClicks = (nav) => {
    setIsActive(nav.label);
    navigate(nav.to);
  };
  return (
    <motion.aside
      style={{ zIndex: 51 }}
      className={`w-full top-0 bottom-0 max-w-[317px] fixed ${sidebarBgColor} z-[151] hidden lg:block`}
    >
      <img src={logo} alt="company's logo" />
      <ul className="flex flex-col w-full  relative sidebarList mt-4">
        {navs.map((nav) => (
          <li
            onClick={() => handleClicks(nav)}
            className={`flex overflow-hidden  cursor-pointer p-7 items-center pl-[30%] gap-4 text-center  ${
              isActive === nav.label ? activeTextColor : "text-gray"
            } ${isActive === nav.label ? active : null}`}
            key={nav.label}
          >
            {nav.label === "Profile" ? (
              <img
                className={`border-2 border-[${profileBorderColor}] rounded-full`}
                src={nav.icon}
                alt={`${nav.label} icon`}
              />
            ) : (
              <img
                src={nav.icon}
                alt={`${nav.label} icon`}
                style={
                  isActive === nav.label
                    ? {
                        filter: IconColor,
                      }
                    : {}
                }
              />
            )}
            {nav.label}
          </li>
        ))}
        <div
          className={
            navType === "customer" ? "activeSidebarLink" : "activeSidebarLinksp"
          }
        />
      </ul>
    </motion.aside>
  );
};

export default Sidebar;
