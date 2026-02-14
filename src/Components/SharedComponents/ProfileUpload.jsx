import React from "react";
import profileImage from "../../assets/Images/bigProfile.svg";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../Utils/formattingFunction";
import editIcon from "../../assets/Images/edit.svg";
import { useMutationFn } from "../../../hooks/queryFn";
import { userProfilePicture } from "../../api/profile";
import { useToast } from "../../../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "../Toast";
import { CircularProgress, Skeleton } from "@mui/material";

const ProfileUpload = ({ drawerRef, profilePicture, isProfilePending }) => {
  const profileRef = React.useRef(null);
  const queryClient = useQueryClient();
  const [uploadedPicture, setUploadedPicture] = React.useState(null);
  const { toastMessage, toastRef, showToast } = useToast();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPicture(file);
      console.log("Selected file:", file);
    }
  };
  const {
    mutate: sendProfilePicture,
    isPending,
    isError,
    isSuccess,
  } = useMutationFn({
    key: ["profilePicture"],
    fun: (data) => userProfilePicture(data),
    onSuccess: () => {
      showToast("Profile Updated", 2000);
      queryClient.invalidateQueries(["userProfile"]);
      setTimeout(() => {
        drawerRef.current?.closeDrawer();
      }, 2000);
    },
    onError: (error) => {
      console.error({ error });
      showToast(error.message || "Error occured in updating profile.", 2000);
    },
  });
  const handleUpdateProfile = () => {
    if (!uploadedPicture) return;
    console.log({ uploadedPicture });
    const formData = new FormData();
    formData.append("file", uploadedPicture);
    sendProfilePicture(formData);
  };
  return (
    <div
      className={`w-[8.75rem] h-[8.75rem] ${uploadedPicture ? "mb-6" : ""} rounded-full relative flex items-center flex-col`}
    >
      <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
        {toastMessage}
      </Toast>
      {profilePicture ? (
        <>
          {isProfilePending ? (
            <CircularProgress color="#6A0DAD" />
          ) : (
            <>
              <img
                src={
                  uploadedPicture
                    ? URL.createObjectURL(uploadedPicture)
                    : profilePicture
                }
                alt="Profile"
                className="object-cover w-full h-full rounded-full"
              />
              <img
                onClick={() => profileRef.current?.click()}
                src={editIcon}
                className="absolute right-0 bottom-7 bg-white rounded-lg cursor-pointer z-10"
                alt="Edit icon"
              />
            </>
          )}
        </>
      ) : (
        <div>
          <img
            src={profileImage}
            alt="Default profile"
            className="object-cover w-full h-full rounded-full"
          />
          <img
            onClick={() => profileRef.current?.click()}
            src={editIcon}
            className="absolute right-0 bottom-7 bg-white rounded-lg cursor-pointer z-10"
            alt="Edit icon"
          />
        </div>
      )}
      <input
        onChange={handleFileChange}
        ref={profileRef}
        className="hidden"
        type="file"
        accept="image/*"
      />
      {uploadedPicture && (
        <div
          onClick={handleUpdateProfile}
          className={`${uploadedPicture ? "mt-2" : ""} text-center p-2 w-fit rounded-full bg-purple/10 border  cursor-pointer  border-purple text-purple text-xs`}
        >
          {isPending
            ? "Uploading"
            : isSuccess
              ? "Uploaded successfully"
              : isError
                ? "Error occured"
                : "upload profile"}
        </div>
      )}
    </div>
  );
};

export default ProfileUpload;
