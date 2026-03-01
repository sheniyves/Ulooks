import axiosInstance from "./axiosInstance";

export const getNotifications = async () => {
  const response = await axiosInstance.get("notifications");
  return response.data;
};

export const getUnreadNotificationsCount = async () => {
  const response = await axiosInstance.get("notifications/unread-count");
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await axiosInstance.post("notifications/read-all");
  return response.data;
};

export const readNotification = async (notificationId) => {
  const response = await axiosInstance.patch(
    `notifications/${notificationId}/read `,
  );
  return response.data;
};
