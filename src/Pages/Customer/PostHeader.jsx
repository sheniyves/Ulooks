import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import addPlus from "../../assets/Images/addPlus.svg";

const PostHeader = ({ onAddMore , uploadRefDialog}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <Link to="/customerWebApp/inspiration">
        <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={arrowLeft} alt="Go back" className="w-6 h-6" />
          <h2 className="font-bold text-transparent bg-gold-purple inline-block bg-clip-text font-fashion text-[1.76rem]">
            Add Post
          </h2>
        </div>
      </Link>

      <IconButton
        onClick={() => uploadRefDialog.current?.openDialog()}
        aria-label="Add more media"
      >
        <img src={addPlus} alt="Add icon" className="w-6 h-6" />
      </IconButton>
    </div>
  );
};

export default PostHeader;
