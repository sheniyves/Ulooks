import { Outlet, useLocation } from "react-router-dom";
import React from "react";
import ContainerHeight from "../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../Components/SharedComponents/ConatinerWidth";
import backgroundIcon from "../assets/Images/background-icon-gray.svg";
import backgroundIcon2 from "../assets/Images/background-icon-orange.svg";
import MobileNavbar from "../Components/WebComponents/MobileNavbar";

export const CustomerAuthLayout = () => {
  const { pathname } = useLocation();

  const backgroundImage = React.useMemo(() => {
    if (pathname === "/customerAuth/getStarted_SignUp") {
      return `url(${backgroundIcon2})`;
    } else if (pathname === "/customerAuth/getStarted_SignIn") {
      return `url(${backgroundIcon})`;
    } else {
      return "none";
    }
  }, [pathname]);
  const isSuccessful = "customerAuth/account_created_successfully";
  const className = isSuccessful ? "" : "min-h-screen grid place-items-center";
  return (
    <div
      style={{
        backgroundImage,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <ContainerHeight>
        <ConatinerWidth>
          <div className={className}>
            <Outlet />
          </div>
        </ConatinerWidth>
      </ContainerHeight>
    </div>
  );
};

export const ServiceProviderAuthLayout = () => {
  const { pathname } = useLocation();

  const backgroundImage = React.useMemo(() => {
    if (pathname === "/serviceProviderAuth/getStarted_SignUp") {
      return `url(${backgroundIcon2})`;
    } else if (pathname === "/serviceProviderAuth/getStarted_SignIn") {
      return `url(${backgroundIcon})`;
    } else {
      return "none";
    }
  }, [pathname]);
  const isSuccessful = "serviceProviderAuth/account_created_successfully";
  const className = isSuccessful ? "" : "min-h-screen grid place-items-center";
  return (
    <div
      style={{
        backgroundImage,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <ContainerHeight>
        <ConatinerWidth>
          <div className={className}>
            <Outlet />
          </div>
        </ConatinerWidth>
      </ContainerHeight>
    </div>
  );
};

export const CustomerWebApp = () => {
  const location = useLocation();

  const showNavbar =
    !location.pathname.toLowerCase().includes("successful") &&
    !location.pathname.toLowerCase().includes("startkyc") &&
    !location.pathname.toLowerCase().includes("adsinfo") &&
    !location.pathname.toLowerCase().includes("message") &&
    !location.pathname.toLowerCase().includes("withdraw") &&
    !location.pathname.toLowerCase().includes("badge") &&
    !location.pathname.toLowerCase().includes("cancel") &&
    !location.pathname.toLowerCase().includes("addfunds") &&
    !location.pathname.toLowerCase().includes("manageavailability");
  

  const spMobileNav = location.pathname.includes("serviceProviderWebApp")

  return (
    <div>
      {/* <ContainerHeight> */}
      <ConatinerWidth>
        <Outlet />
        {showNavbar && <MobileNavbar navType={spMobileNav ? "serviceProvider" : "customer"} />}
      </ConatinerWidth>
      {/* </ContainerHeight> */}
    </div>
  );
};
