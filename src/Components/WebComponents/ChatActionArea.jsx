import React from "react";
import { IconButton } from "@mui/material";
import Microphone from "../SharedComponents/Microphone";
import Gallery from "../SharedComponents/Gallery";
import SendText from "../SharedComponents/SendText";

const ChatActionArea = ({ color }) => {
  return (
    <div className="bg-white sticky bottom-0 px-4 md:px-10 lg:px-20 pt-5 w-full h-[2rem] md:h-[6rem] shadow-top-md">
      <div className="flex items-center gap-2 ">
        <IconButton>
          <Microphone color={color} />
        </IconButton>
        <IconButton>
          <Gallery color={color} />
        </IconButton>
        <div className="w-full bg-[#eaecf0] rounded-md flex item-center  justify-between pr-4">
          <input
            type="text"
            placeholder="Type a message here..."
            className="border-0 outline-none p-4 bg-transparent w-full"
          />
          <div className=" flex items-center justify-center">
            <SendText color={color} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatActionArea;
