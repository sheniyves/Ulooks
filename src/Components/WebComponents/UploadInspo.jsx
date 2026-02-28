import React, { useCallback } from "react";
import AlertDialog from "../SharedComponents/AlertDialog";
import folderAddIcon from "../../assets/Images/folder-add.svg";
import { IconButton } from "@mui/material";
import closeCircle from "../../assets/Images/close-circle.svg";
import { useNavigate } from "react-router-dom";

const UploadInspo = ({
  uploadRefDialog,
  uploadRef,
  nav = "/customerWebApp/inspiration/createPost",
}) => {
  const navigate = useNavigate();

  const handleFiles = (files) => {
    const fileArray = Array.from(files);

    if (fileArray.length > 0) {
      navigate(nav, { state: { files: fileArray } });
      uploadRefDialog.current?.closeDialog();
    }
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <AlertDialog
        ref={uploadRefDialog}
        background={"#f4e2fe"}
        iconPresence={false}
        iconPresenceRight={true}
        iconRight={closeCircle}
      >
        <div
          className=" h-[11.28rem] flex items-center justify-center flex-col border-2 border-dashed border-[#BE6BFB] rounded-lg cursor-pointer"
          onClick={() => uploadRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <IconButton>
            <img src={folderAddIcon} alt="add folder icon" />
          </IconButton>

          <input
            type="file"
            className="hidden"
            ref={uploadRef}
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
          />

          <span className="text-xs font-normal text-[#BE6BFB] p-4 text-center">
            Drag & Drop or Click to Upload (Images & Videos)
          </span>
        </div>
      </AlertDialog>
    </div>
  );
};

export default UploadInspo;
