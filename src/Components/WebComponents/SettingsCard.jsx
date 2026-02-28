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
import { userDeleteAccount, userProfile } from "../../api/profile";
import { useMutationFn, useQueryFn } from "../../../hooks/queryFn";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "../SharedComponents/AlertDialog";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useToast } from "../../../hooks/useToast";
import Toast from "../Toast";
import HowUlooksWorks from "./HowUlooksWorks";
import InviteAndEarn from "./InviteAndEarn";
import { getReferralCode } from "../../api/personalization";
import NotificationDrawer from "./NotificationDrawer";

const SettingsCard = () => {
  const { email } = getFromLocalStorage("customerData", "User");
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const accountDrawerRef = React.useRef(null);
  const securityDrawerRef = React.useRef(null);
  const supportDrawerRef = React.useRef(null);
  const privacyDrawerRef = React.useRef(null);
  const termsDrawerRef = React.useRef(null);
  const logOutRef = React.useRef(null);
  const deleteAccountRef = React.useRef(null);
  const howUlooksWorksRef = React.useRef(null);
  const inviteNdEarnRef = React.useRef(null);
  const notificationRef = React.useRef(null);
  const { showToast, toastMessage, toastRef } = useToast();

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
      case "howUlooksWorks":
        howUlooksWorksRef.current?.openDrawer();
        break;
      case "inviteNdEarn":
        inviteNdEarnRef.current?.openDrawer();
        break;
      case "privacy":
        privacyDrawerRef.current?.openDrawer();
        break;
      case "terms":
        termsDrawerRef.current?.openDrawer();
        break;
      case "notification":
        notificationRef.current?.openDrawer();
        break;
      default:
        break;
    }
  };

  const { data, isPending: isProfilePending } = useQueryFn({
    key: ["userProfile"],
    fun: userProfile,
  });
  const { data: referralData, isPending: isReferralPending } = useQueryFn({
    key: ["referralStats"],
    fun: getReferralCode,
    // enabled: !!inviteNdEarnRef.current
  });

  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    setLogout(true);
    setTimeout(() => {
      navigate("/");
      setLogout(false);
    }, 3000);
  };

  const {
    mutate: deleteAccount,
    isPending: isDeleting,
    isSuccess: isDeleted,
  } = useMutationFn({
    key: ["deleteAccount"],
    fun: userDeleteAccount,
    onSuccess: (data) => {
      console.log("Success data", data);
      showToast("Account deleted", 2000);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
  });
  const handleDeleteAccount = () => {
    deleteAccount();
  };

  return (
    <div className="bg-white shadow-md bottom-[3.9rem] fixd md:static rounded-md py-4 w-full mt-6 ">
      <Toast ref={toastRef} status={isDeleted ? "success" : "error"}>
        {toastMessage}
      </Toast>
      <p className="text-darkPurple font-medium text-xl mb-4 ml-8 md:ml-4">
        Settings
      </p>

      <ul className="flex flex-col items-start px-4  md:px-0">
        {actions.map((action, i) => (
          <SettingsRow
            isPending={isPending}
            isReferralPending={isReferralPending}
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
      <Drawer ref={howUlooksWorksRef}>
        <HowUlooksWorks drawerRef={howUlooksWorksRef} />
      </Drawer>
      <Drawer ref={inviteNdEarnRef}>
        <InviteAndEarn drawerRef={inviteNdEarnRef} data={referralData} />
      </Drawer>
      <Drawer ref={privacyDrawerRef}>
        <PrivacyPolicy drawerRef={privacyDrawerRef} />
      </Drawer>
      <Drawer ref={termsDrawerRef}>
        <TermsAndCondition drawerRef={termsDrawerRef} />
      </Drawer>
       <Drawer ref={notificationRef}>
        <NotificationDrawer  drawerRef={notificationRef} />
      </Drawer>
      <Dialog iconPresence={false} ref={logOutRef} dialogTitle="Logout?">
        <p className="text-center mb-4">
          Are you sure you want to logout? We're expecting you back!
        </p>
        <div className=" flex gap-4 flex-col sm:flex-row items-center justify-between">
          <Button
            backgroundColor="#E6D6F5"
            color="#6A0DAD"
            sx={{
              width: "100%",
            }}
            onClick={() => logOutRef.current?.closeDialog()}
          >
            Cancel
          </Button>
          <dispatchEvent className="w-full">
            <Button
              onClick={handleLogout}
              backgroundColor={"#FFE5E5"}
              color="#D92D20"
              sx={{
                width: "100%",
              }}
            >
              Logout{" "}
              {logout ? (
                <CircularProgress color="inherit" size={12} />
              ) : (
                <LogoutIcon color="inherit" sx={{ fontSize: "1rem" }} />
              )}
            </Button>
          </dispatchEvent>
        </div>
      </Dialog>
      <div className="   h-[3rem] text-left px-8 md:px-4       mt-4  font-medium rounded-md text-xl text-[#D92D20] hover:bg-[#fef3f2] hover:text-[#B42318] transition-colors duration-200 ">
        <ButtonBase
          onClick={() => logOutRef.current?.openDialog()}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          Log out
        </ButtonBase>
      </div>
      <Dialog
        iconPresence={false}
        ref={deleteAccountRef}
        dialogTitle="Delete Account?"
      >
        <div className="max-w-[20rem]">
          <p className="text-center mb-4  ">
            Are you sure you want to delete your account? This action is
            irreversible.
          </p>
          <div className=" flex gap-4 flex-col sm:flex-row items-center justify-between">
            <Button
              backgroundColor="#E6D6F5"
              color="#6A0DAD"
              sx={{
                width: "100%",
              }}
              onClick={() => deleteAccountRef.current?.closeDialog()}
            >
              Cancel
            </Button>
            <dispatchEvent className="w-full">
              <Button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                backgroundColor={"#FFE5E5"}
                color="#D92D20"
                sx={{
                  width: "100%",
                }}
              >
                Delete{" "}
                {isDeleting ? (
                  <CircularProgress color="inherit" size={12} />
                ) : (
                  <DeleteOutlineIcon color="inherit" />
                )}
              </Button>
            </dispatchEvent>
          </div>
        </div>
      </Dialog>
      <div className="  h-[3rem] text-left px-8 md:px-4     mt-4  font-medium rounded-md text-xl text-[#D92D20] hover:bg-[#fef3f2] hover:text-[#B42318] transition-colors duration-200 ">
        <ButtonBase
          onClick={() => deleteAccountRef.current?.openDialog()}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          Delete Account
        </ButtonBase>
      </div>
    </div>
  );
};

export default SettingsCard;

const SettingsRow = ({
  action,
  isPending,
  isReferralPending,
  isProfilePending,
  ...props
}) => {
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
            (isProfilePending && action.label === "Account") ||
            (isReferralPending && action.label === "Invite & Earn") ? (
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
  { label: "Lite mode", icon: "" },
  { label: "Notifications", icon: arrowRight, type: "notification" },
  { label: "Account", icon: arrowRight, type: "account" },
  { label: "Security", icon: arrowRight, type: "security" },
  { label: "Invite & Earn", icon: arrowRight, type: "inviteNdEarn" },
  { label: "Support", icon: arrowRight, type: "support" },
  { label: "How Ulooks Works", icon: arrowRight, type: "howUlooksWorks" },
  { label: "Privacy Policy", icon: arrowRight, type: "privacy" },
  { label: "Terms and Conditions", icon: arrowRight, type: "terms" },
];
