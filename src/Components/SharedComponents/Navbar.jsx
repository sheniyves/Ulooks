import React from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import locationIcon from "../../assets/Images/locationIcon.svg";
import searchIcon from "../../assets/Images/search-normal-gray.svg";
import notificationIcon from "../../assets/Images/notification-status.svg";
import { ButtonBase, IconButton, Tooltip, Zoom } from "@mui/material";
import Profile from "./Profile";
import ConatinerWidth from "./ConatinerWidth";
import { useSearchCtx } from "../../Context/SearchCtx";
import Notification from "../WebComponents/Notification";
import Location from "../WebComponents/Location";
import { notifications } from "../../data/notification";

const Navbar = () => {
  const { inputRef, setDebounceValue } = useSearchCtx();
  const dialogRef = React.useRef(null);
  const locationRef = React.useRef(null);

  return (
    <ConatinerWidth>
      <motion.nav
        style={{ zIndex: 100 }}
        // initial={{ y: -60, opacity: 0 }}
        // animate={{
        //   y: 0,
        //   opacity: 1,
        //   transition: { duration: 0.3, ease: "easeInOut" },
        // }}
        className="fixed mx-auto max-w-[1285px] top-0 left-0 lg:left-[317px] right-0 bg-white  pt-6 px-8 z-[101] hidden lg:grid grid-cols-2 gap-4 shadow"
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
          <SearchBar
            setDebounceValue={setDebounceValue}
            icon={searchIcon}
            inputRef={inputRef}
          />
          <Tooltip
            title="Location"
            slots={{
              transition: Zoom,
            }}
          >
            <ButtonBase onClick={() => locationRef.current?.openDialog()}>
              <img src={locationIcon} alt="Location icon" />
            </ButtonBase>
          </Tooltip>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Tooltip
            title="Notifications"
            slots={{
              transition: Zoom,
            }}
          >
            <IconButton onClick={() => dialogRef.current?.openDialog()}>
              <img src={notificationIcon} alt="notification icon" />
            </IconButton>
          </Tooltip>
          <Profile to={"/customerWebApp/profile"} name={"John doe"} type={"Customer"} />
        </div>

        <Notification dialogRef={dialogRef} notifications={notifications} />
        <Location locationRef={locationRef} />
      </motion.nav>
    </ConatinerWidth>
  );
};

export default Navbar;
