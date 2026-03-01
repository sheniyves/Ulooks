import { DialogContent, Skeleton } from "@mui/material";
import arrowLeft from "../../assets/Images/notArrowLeft.svg";
import Dialog from "../SharedComponents/AlertDialog";
import { useDynamicScreen } from "../../Utils/screenWidth";
import { useMutationFn } from "../../../hooks/queryFn";
import { markAllAsRead, readNotification } from "../../api/notifications";
import { useQueryClient } from "@tanstack/react-query";

const Notification = ({
  dialogRef,
  notifications,
  isPending,
  unreadBackground = "bg-light_Purple",
  unreadTextColor = "text-darkPurple",
  readBackground = "bg-gray",
  readTextColor = "text-[#667085]",
  timeTextColor = "text-[#98A2B3]",
}) => {
  const dynamicScreen = useDynamicScreen();
  const queryClient = useQueryClient();

  const { mutate: read,     } = useMutationFn({
    fun: (notificationId) => readNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["unread_notifications"]);
    },
  });

  const { mutate: readAll } = useMutationFn({
    fun: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["unread_notifications"]);
    },
  });

  const handleReadNotification = (notificationId) => {
    read(notificationId);
  };

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
      <Dialog
        ref={dialogRef}
        dialogTitle={"Notification"}
        action={"Mark all as read"}
        actionFun={readAll}
        icon={arrowLeft}
        useFullWidth={dynamicScreen < 770}
        maxHeight="100vh"
      >
        <div>
          <ul className="space-y-4 py-2">
            {/* Loading skeletons */}
            {isPending &&
              Array.from({ length: 4 }).map((_, i) => (
                <li
                  key={i}
                  className=" min-w-full lg:min-w-[400px] rounded-[15px] bg-white"
                >
                  <div className="flex items-center justify-between mb-2 gap-4">
                    <Skeleton variant="text" width={140} height={22} />
                    <Skeleton variant="text" width={70} height={16} />
                  </div>
                  <Skeleton variant="text" width="90%" height={16} />
                  <Skeleton variant="text" width="65%" height={16} />
                </li>
              ))}

            {/* Empty state */}
            {!isPending && (!notifications || notifications.length === 0) && (
              <li className="text-center py-12 text-[#98A2B3] font-urbanist text-sm">
                You have no notifications yet
              </li>
            )}

            {/* Data */}
            {!isPending &&
              notifications?.map((notification) => (
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
      </Dialog>
    </div>
  );
};

export default Notification;
