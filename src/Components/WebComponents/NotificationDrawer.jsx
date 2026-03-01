import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import { useMutationFn, useQueryFn } from "../../../hooks/queryFn";
import {
  getNotifications,
  markAllAsRead,
  readNotification,
} from "../../api/notifications";
import { ButtonBase, Skeleton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

const NotificationDrawer = ({
  unreadBackground = "bg-light_Purple",
  unreadTextColor = "text-darkPurple",
  readBackground = "bg-gray",
  readTextColor = "text-[#667085]",
  timeTextColor = "text-[#98A2B3]",
  drawerRef,
}) => {
  const {
    data: notifications,
    isPending: isNotificationPending,
    isError: isNotificationError,
  } = useQueryFn({
    key: ["notifications"],
    fun: getNotifications,
  });

  const { mutate: read, isSuccess: isToReadSuccess } = useMutationFn({
    fun: (notificationId) => readNotification(notificationId),
  });
  const queryClient = useQueryClient();
  const handleReadNotification = (notificationId) => {
    read(notificationId);
    if (isToReadSuccess) {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["unread_notifications"]);
    }
  };

  const { mutate: readAll } = useMutationFn({
    fun: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["unread_notifications"]);
    },
  });

  const notificationList = notifications?.data || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <DrawerHeader drawerRef={drawerRef} title={"Notifications"} />
        <ButtonBase onClick={readAll}>
          <span className="text-purple cursor-pointer text-xs font-medium p-2">
            Mark all as read
          </span>
        </ButtonBase>
      </div>
      <div className="px-2">
        <ul className="space-y-4">
          {/* Loading skeletons */}
          {isNotificationPending &&
            Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="p-4 rounded-[15px] bg-white">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton variant="text" width={140} height={22} />
                  <Skeleton variant="text" width={70} height={16} />
                </div>
                <Skeleton variant="text" width="90%" height={16} />
                <Skeleton variant="text" width="65%" height={16} />
              </li>
            ))}

          {/* Error state */}
          {isNotificationError && (
            <li className="text-center py-12 text-red-400 font-urbanist text-sm">
              Could not load notifications. Please try again.
            </li>
          )}

          {/* Empty state */}
          {!isNotificationPending &&
            !isNotificationError &&
            notificationList.length === 0 && (
              <li className="text-center py-12 text-[#98A2B3] font-urbanist text-sm">
                You have no notifications yet
              </li>
            )}

          {/* Data */}
          {!isNotificationPending &&
            !isNotificationError &&
            notificationList.map((notification) => (
              <li
                className={`p-4 rounded-[15px] ${
                  !notification.is_read
                    ? `${unreadBackground} ${unreadTextColor}`
                    : `${readBackground} ${readTextColor}`
                }`}
                key={notification.id}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="leading-0 text-lg font-medium">
                    {notification.title}
                  </h3>
                  <span className={`text-xs font-medium ${timeTextColor}`}>
                    {formatDate(notification.created_at)}
                  </span>
                </div>
                <p className="text-base leading-6">
                  {notification.description}
                </p>

                <p
                  onClick={() => handleReadNotification(notification?.id)}
                  className="text-gray cursor-pointer text-sm text-right"
                >
                  Read
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationDrawer;
