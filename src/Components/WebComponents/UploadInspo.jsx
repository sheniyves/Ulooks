import React from "react";
import AlertDialog from "../SharedComponents/AlertDialog";
import folderAddIcon from "../../assets/Images/folder-add.svg";
import DragModal from "../WebComponents/DragModal";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UploadInspo = ({ uploadRefDialog, uploadRef, nav="/customerWebApp/createPost" }) => {
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      navigate(nav, { state: { file } });
    }
  };
  return (
    <div>
      <AlertDialog
        ref={uploadRefDialog}
        iconPresence={false}
        background={"#f4e2fe"}
      >
        <div className="-mt-12 w-[22rem] h-[11.28rem] flex items-center justify-center flex-col ">
          <IconButton onClick={() => uploadRef.current?.click()}>
            <img src={folderAddIcon} alt="add folder icon" />
          </IconButton>
          <input
            type="file"
            className="hidden"
            ref={uploadRef}
            accept="image/*"
            onChange={handleFileChange}
          />
          <span className="text-xs font-normal text-[#BE6BFB]">
            Upload file
          </span>
        </div>
      </AlertDialog>
    </div>
  );
};

export default UploadInspo;
