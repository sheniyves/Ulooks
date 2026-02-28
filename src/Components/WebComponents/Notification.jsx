import { DialogContent, DialogContentText } from "@mui/material";
import React from "react";
import arrowLeft from "../../assets/Images/notArrowLeft.svg";
import Dialog from "../SharedComponents/AlertDialog";
import { useDynamicScreen } from "../../Utils/screenWidth";

const Notification = ({
  dialogRef,
  notifications,
  unreadBackground = "bg-light_Purple",
  unreadTextColor = "text-darkPurple",
  readBackground = "bg-white",
  readTextColor = "text-[#667085]",
  timeTextColor = "text-[#98A2B3]",
}) => {
  const dynamicScreen = useDynamicScreen();
  return (
    <div>
      <Dialog
        ref={dialogRef}
        dialogTitle={"Notification"}
        action={"Mark all as read"}
        icon={arrowLeft}
        useFullWidth={dynamicScreen < 770}
      >
        <DialogContent>
          <div>
            <ul className="space-y-2">
              {notifications?.map((notification) => (
                <li
                  className={`p-4 rounded-[15px] ${
                    notification.status === "unRead"
                      ? `${unreadBackground} ${unreadTextColor}`
                      : `${readBackground} ${readTextColor}`
                  }`}
                  key={notification.id}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="leading-0 text-lg font-medium">
                      {notification.title}
                    </h3>
                    <span className={`text-xs font-medium ${timeTextColor}`}>
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-base Purple leading-6">
                    {notification.message}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notification;
