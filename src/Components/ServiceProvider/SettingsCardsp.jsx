import React, { act } from "react";
import arrowRight from "../../assets/Images/arrowRightsp.svg";
import { ButtonBase } from "@mui/material";
import CustomizedSwitchRadio from "../SharedComponents/CustomedSwitchRadio";
import Drawer from "../SharedComponents/Drawer";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import Security from "../WebComponents/Security";
import Support from "../WebComponents/Support";
import PrivacyPolicy from "../WebComponents/PrivacyPolicy";
import TermsAndCondition from "../WebComponents/TermsAndCondition";
import Account from "../WebComponents/Account";
import Accountsp from "./Accountsp";
import Securitysp from "./Securitysp";
import Supportsp from "./Supportsp";
import ManageService from "./ManageService";

const SettingsCardsp = () => {
  const accountDrawerRef = React.useRef(null);
  const securityDrawerRef = React.useRef(null);
  const supportDrawerRef = React.useRef(null);
  const privacyDrawerRef = React.useRef(null);
  const termsDrawerRef = React.useRef(null);
  const manageServiceDrawerRef = React.useRef(null);

  const handleDrawerOpen = (settingType) => {
    switch (settingType) {
      case "account":
        accountDrawerRef.current?.openDrawer();
        break;
      case "security":
        securityDrawerRef.current?.openDrawer();
        break;
      case "support":
        supportDrawerRef.current?.openDrawer();
        break;
      case "privacy":
        privacyDrawerRef.current?.openDrawer();
        break;
      case "terms":
        termsDrawerRef.current?.openDrawer();
        break;
      case "manageService":
        manageServiceDrawerRef.current?.openDrawer();
        break;
      default:
        break;
    }
  };
  return (
    <div className="bg-[#fffaeb] shadow-md bottom-[3.9rem] fixd md:static rounded-md py-4 w-full mt-6 px-4">
      <p className="text-yellow_gold font-medium text-xl mb-4 ml-8 md:ml-4">
        Settings
      </p>

      <ul className="flex flex-col items-start px-4  md:px-0">
        {actions.map((action, i) => (
          <SettingsRow
            onClick={() => handleDrawerOpen(action.type)}
            key={i}
            action={action}
          />
        ))}
      </ul>
      <Drawer ref={accountDrawerRef}>
        <Accountsp drawerRef={accountDrawerRef} />
      </Drawer>
      <Drawer ref={manageServiceDrawerRef}>
        <ManageService drawerRef={manageServiceDrawerRef} />
      </Drawer>
      <Drawer ref={securityDrawerRef}>
        <Securitysp drawerRef={securityDrawerRef} />
      </Drawer>
      <Drawer ref={supportDrawerRef}>
        <Supportsp drawerRef={supportDrawerRef} />
      </Drawer>
      <Drawer ref={privacyDrawerRef}>
        <PrivacyPolicy forSp={true} drawerRef={privacyDrawerRef} />
      </Drawer>
      <Drawer ref={termsDrawerRef}>
        <TermsAndCondition forSp={true} drawerRef={termsDrawerRef} />
      </Drawer>

      <div className=" ml-8 md:ml-4 w-[8rem] h-[3rem] flex items-center justify-center  mt-4  font-medium rounded-md text-xl text-[#D92D20] hover:bg-[#fcebe9] hover:text-[#B42318] transition-colors duration-200">
        <ButtonBase sx={{ width: "100%", height: "100%", borderRadius: "8px" }}>
          Log out
        </ButtonBase>
      </div>
    </div>
  );
};

export default SettingsCardsp;

const SettingsRow = ({ action, ...props }) => {
  return (
    <li
      {...props}
      className="flex items-center justify-between  border-b border-[#EAECF0] w-full cursor-pointer 
                 hover:bg-[#fedf89] rounded-lg transition-colors duration-200 "
    >
      <ButtonBase
        sx={{
          paddingBottom: ".5rem",
          paddingTop: ".75rem",
          paddingInline: ".5rem",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="text-yellow_gold capitalize font-medium text-lg">
          {action.label}
        </span>
        {action.icon ? (
          <img src={action.icon} alt="" className=" nax-w-[24px]" />
        ) : (
          <div className="-mr-4">
            <CustomizedSwitchRadio
              thumbColor="#f79009"
              checkedBorderColor="#f79009"
            />
          </div>
        )}
      </ButtonBase>
    </li>
  );
};

const actions = [
  { label: "Notifications", icon: "" },
  { label: "Account", icon: arrowRight, type: "account" },
  { label: "Manage Services", icon: arrowRight, type: "manageService" },
  { label: "Security", icon: arrowRight, type: "security" },
  { label: "Support", icon: arrowRight, type: "support" },
  { label: "Privacy Policy", icon: arrowRight, type: "privacy" },
  { label: "Terms and Conditions", icon: arrowRight, type: "terms" },
];
