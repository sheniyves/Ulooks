import React from "react";
import { notifications } from "../../data/notification";
import DrawerHeader from "../SharedComponents/DrawerHeader";

const NotificationDrawer = ({
  unreadBackground = "bg-light_Purple",
  unreadTextColor = "text-darkPurple",
  readBackground = "bg-white",
  readTextColor = "text-[#667085]",
    timeTextColor = "text-[#98A2B3]",
  drawerRef
}) => {
  return (
      <div>
          <DrawerHeader  drawerRef={drawerRef} title={"Notifications"} />
      <div>
        <ul className="space-y-6">
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
    </div>
  );
};

export default NotificationDrawer;
