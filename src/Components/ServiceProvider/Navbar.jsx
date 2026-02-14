import React from "react";
import { motion } from "framer-motion";
import SearchBar from "../../Components/SharedComponents/SearchBar";
import searchIcon from "../../assets/Images/search-normal-gray.svg";
import notificationIcon from "../../assets/Images/notification-status.svg";
import { ButtonBase, IconButton, Tooltip, Zoom } from "@mui/material";
import Profile from "../SharedComponents/Profile";
import ConatinerWidth from "../SharedComponents/ConatinerWidth";
import { useSearchCtx } from "../../Context/SearchCtx";
import Location from "../WebComponents/Location";

const Navbar = () => {
  const { inputRef, setDebounceValue } = useSearchCtx();
  const dialogRef = React.useRef(null);
  const locationRef = React.useRef(null);
  

  return (
    <ConatinerWidth>
      <motion.nav
        style={{ zIndex: 100 }}
        className="fixed mx-auto max-w-[1285px] top-0 left-0 lg:left-[317px] right-0 bg-white  pt-6 px-8 z-[101] pb-4 hidden lg:grid grid-cols-2 gap-4 shadow"
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
          <SearchBar
            setDebounceValue={setDebounceValue}
            icon={searchIcon}
            inputRef={inputRef}
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <Tooltip
            title="Notifications"
            slots={{
              transition: Zoom,
            }}
          >
            <IconButton onClick={() => dialogRef.current?.openDialog()}>
              <img
                src={notificationIcon}
                alt="notification icon"
                style={{
                  filter:
                    "invert(14%) sepia(82%) saturate(900%) hue-rotate(5deg) brightness(60%) contrast(110%)",
                }}
              />
            </IconButton>
          </Tooltip>
          <Profile
            to={"/serviceProviderWebApp/profile"}
            name={"Tom Lockwood"}
            type={"Service Provider"}
          />
        </div>

        <Location locationRef={locationRef} />
      </motion.nav>
    </ConatinerWidth>
  );
};

export default Navbar;
