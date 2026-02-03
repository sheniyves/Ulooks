import { ButtonBase, IconButton } from "@mui/material";
import React from "react";
import Button from "../WebComponents/Button";
import chatIcon from "../../assets/Images/messages-3.svg";
import { Link } from "react-router-dom";

const ActionCardButtons = ({ onSelect }) => {
  return (
    <div className="flex items-center justify-between  ">
      <div className="flex flex-col items-center justify-center text-sm font-normal text-yellow_gold">
        <IconButton onClick={() => onSelect("chat")}>
          <img src={chatIcon} alt="Chat icon" />
        </IconButton>
        <span>Chat</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="  w-[5rem] h-[2.7rem] flex items-center justify-center   font-normal rounded-lg text-sm text-[#D92D20] hover:bg-[#fef3f2] hover:text-[#B42318] transition-colors duration-200">
          <ButtonBase
           onClick={() => onSelect("cancel")}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: ".5rem",
            }}
          >
            Cancel
          </ButtonBase>
        </div>
        <Button
         onClick={() => onSelect("reschedule")}
          fontWeight={400}
          backgroundColor="transparent"
          color="#DC6803"
          sx={{
            maxWidth: "fit",
            padding: ".45rem .75rem",
            border: "1px solid #DC6803",
            "&:hover": {
              backgroundColor: "#F790091E",
            },
          }}
        >
          Reschedule
        </Button>
        <Button
        onClick={() => onSelect("edit")}
          fontWeight={400}
          backgroundColor="#DC6803"
          sx={{
            maxWidth: "fit",
            padding: ".5rem .75rem",
            "&:hover": {
              backgroundColor: "#DB7F1A",
            },
          }}
        >
          Edit Status
        </Button>
      </div>
    </div>
  );
};

export default ActionCardButtons;
