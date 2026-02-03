import React from "react";
import profileImage from "../../assets/Images/bigProfile.svg";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../Utils/formattingFunction";
import editIcon from "../../assets/Images/edit.svg";

const ProfileUpload = () => {
  const profileRef = React.useRef(null);
  const [uploadedPicture, setUploadedPicture] = React.useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPicture(file);
      console.log("Selected file:", file);
    }
  };
  return (
    <div className="w-[8.75rem] h-[8.75rem] rounded-full  ">
      {uploadedPicture ? (
        <img
          src={URL.createObjectURL(uploadedPicture)}
          alt="Uploaded preview"
          className="object-cover w-full h-full rounded-full "
        />
      ) : (
        <div className="relative">
          <img
            src={profileImage}
            alt="Default profile"
            className="object-cover w-full h-full rounded-full"
          />
          <img
            onClick={() => profileRef.current?.click()}
            src={editIcon}
            className="absolute right-0 bottom-7 bg-white rounded-lg cursor-pointer"
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
    </div>
  );
};

export default ProfileUpload;

/*   <Avatar
          sx={{ width: "10.75rem", height: "10.75rem" }}
          sizes="large"
          {...stringAvatar("John Doe")}
        /> */
