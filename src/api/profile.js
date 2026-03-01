import axiosInstance from "./axiosInstance";

export const sendSupportMessage = async (payload) => {
  const response = await axiosInstance.post("/support/message", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const editUserProfile = async (payload) => {
  const response = await axiosInstance.put("/user/edit-profile", payload, {});
  return response.data;
};

export const userProfile = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data;
};
export const getReferralHistory = async () => {
  const response = await axiosInstance.get("/user/referrals/history");
  return response.data;
};

export const userProfilePicture = async (payload) => {
  const response = await axiosInstance.post("/user/profile-picture", payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const userDeleteAccount = async () => {
  const response = await axiosInstance.post("/user/delete-account");
  return response.data;
};
