import React from "react";
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
import ulooksLogo from "../../assets/Images/ulooks_logo_text_under.svg";

const ChatNavbar = () => {
  const { inputRef, setDebounceValue } = useSearchCtx();
  const dialogRef = React.useRef(null);
  const locationRef = React.useRef(null);

  return (
    <ConatinerWidth>
      <nav
        style={{ zIndex: 100 }}
        className="fixed mx-auto  left-0 top-0  right-0 bg-white  pt-5 px-10 xl:px-20 z-[101] hidden lg:grid  grid-cols-[20%_60%_20%] xl:grid-cols-[30%_40%_30%] gap-4 shadow"
      >
        <div>
          <img src={ulooksLogo} alt="ulooks logo with text 'ulooks'" className="w-[2.82rem] h-[3.7rem]" />
        </div>
        <div >
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
              <img src={notificationIcon} alt="notification icon" />
            </IconButton>
          </Tooltip>
          <Profile
            to={"/customerWebApp/profile"}
            name={"John doe"}
            type={"Customer"}
          />
        </div>

        <Notification dialogRef={dialogRef} notifications={notifications} />
        <Location locationRef={locationRef} />
      </nav>
    </ConatinerWidth>
  );
};

export default ChatNavbar;
