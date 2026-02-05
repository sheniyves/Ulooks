import React, { act, useEffect, useRef, useState } from "react";
import arrowRight from "../../assets/Images/arrowRight.svg";
import { ButtonBase, CircularProgress } from "@mui/material";
import CustomizedSwitchRadio from "../SharedComponents/CustomedSwitchRadio";
import Drawer from "../SharedComponents/Drawer";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import Account from "./Account";
import Security from "./Security";
import Support from "./Support";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndCondition from "./TermsAndCondition";
import AlertDialog from "../SharedComponents/AlertDialog";
import Button from "./Button";
import DownloadApp from "./DownloadApp";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordOtp } from "../../api/customerAuth";
import { getFromLocalStorage } from "../../Utils/presistStorage";
import { userProfile } from "../../api/profile";
import { useQueryFn } from "../../../hooks/queryFn";

const SettingsCard = () => {
  const { email } = getFromLocalStorage("customerData", "User");
  const accountDrawerRef = React.useRef(null);
  const securityDrawerRef = React.useRef(null);
  const supportDrawerRef = React.useRef(null);
  const privacyDrawerRef = React.useRef(null);
  const termsDrawerRef = React.useRef(null);

  const {
    mutate: resendOtp,
    isSuccess,
    isPending,
  } = useMutation({
    mutationKey: ["createResetPassword"],
    mutationFn: (data) => resetPasswordOtp(data),
    onSuccess: () => {
      securityDrawerRef.current?.openDrawer();
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const handleDrawerOpen = (settingType) => {
    switch (settingType) {
      case "account":
        accountDrawerRef.current?.openDrawer();
        break;
      case "security":
        resendOtp({ email });

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
      default:
        break;
    }
  };

  const { data, isPending: isProfilePending } = useQueryFn({
    key: ["userProfile"],
    fun: userProfile,
  });

  return (
    <div className="bg-white shadow-md bottom-[3.9rem] fixd md:static rounded-md py-4 w-full mt-6 ">
      <p className="text-darkPurple font-medium text-xl mb-4 ml-8 md:ml-4">
        Settings
      </p>

      <ul className="flex flex-col items-start px-4  md:px-0">
        {actions.map((action, i) => (
          <SettingsRow
            isPending={isPending}
            onClick={() => handleDrawerOpen(action.type)}
            key={i}
            action={action}
          />
        ))}
      </ul>
      <Drawer ref={accountDrawerRef}>
        <Account
          drawerRef={accountDrawerRef}
          data={data}
          isProfilePending={isProfilePending}
        />
      </Drawer>
      <Drawer ref={securityDrawerRef}>
        <Security
          drawerRef={securityDrawerRef}
          isSuccess={isSuccess}
          email={email}
        />
      </Drawer>
      <Drawer ref={supportDrawerRef}>
        <Support drawerRef={supportDrawerRef} />
      </Drawer>
      <Drawer ref={privacyDrawerRef}>
        <PrivacyPolicy drawerRef={privacyDrawerRef} />
      </Drawer>
      <Drawer ref={termsDrawerRef}>
        <TermsAndCondition drawerRef={termsDrawerRef} />
      </Drawer>

      <div className=" ml-8 md:ml-4 w-[8rem] h-[3rem] flex items-center justify-center  mt-4  font-medium rounded-md text-xl text-[#D92D20] hover:bg-[#fef3f2] hover:text-[#B42318] transition-colors duration-200">
        <ButtonBase sx={{ width: "100%", height: "100%", borderRadius: "8px" }}>
          Log out
        </ButtonBase>
      </div>
    </div>
  );
};

export default SettingsCard;

const SettingsRow = ({ action, isPending, isProfilePending, ...props }) => {
  const downloadOnAppRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const handleToggle = (option, event) => {
    if (option === "Lite mode" && event.target.checked) {
      setChecked(event.target.checked);
      downloadOnAppRef.current?.openDialog();
    }
  };
  const handleClose = () => {
    setChecked(false);
  };
  return (
    <>
      <DownloadApp
        downloadOnAppRef={downloadOnAppRef}
        handleClose={handleClose}
      />
      <li
        {...props}
        className="flex items-center justify-between  border-b border-[#EAECF0] w-full cursor-pointer 
      hover:bg-[#f4f0f8] transition-colors duration-200 "
      >
        <ButtonBase
          sx={{
            paddingBottom: ".5rem",
            paddingTop: ".75rem",
            paddingInline: "1rem",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="text-darkPurple capitalize font-medium text-lg">
            {action.label}
          </span>
          {action.icon ? (
            (isPending && action.label === "Security") ||
            (isProfilePending && action.label === "Account") ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <img src={action.icon} alt="" className="mr-2 w-[24px]" />
            )
          ) : (
            <div className="-mr-2">
              <CustomizedSwitchRadio
                checked={checked}
                checkedTrackColor="#CA9BEC"
                checkedBorderColor="#6A0DAD"
                thumbColor="#6A0DAD"
                onChange={(e) => handleToggle(action.label, e)}
              />
            </div>
          )}
        </ButtonBase>
      </li>
    </>
  );
};

const actions = [
  { label: "Notifications", icon: "" },
  { label: "Lite mode", icon: "" },
  { label: "Account", icon: arrowRight, type: "account" },
  { label: "Security", icon: arrowRight, type: "security" },
  { label: "Support", icon: arrowRight, type: "support" },
  { label: "Privacy Policy", icon: arrowRight, type: "privacy" },
  { label: "Terms and Conditions", icon: arrowRight, type: "terms" },
];
