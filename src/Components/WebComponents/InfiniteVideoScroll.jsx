import React from "react";
import { inspoData } from "../../data/inspoData";
import { Avatar, IconButton } from "@mui/material";
import commentsIcon from "../../assets/Images/messages.svg";
import eyeIcon from "../../assets/Images/eye.svg";
import inspoMenu from "../../assets/Images/menuInspo.svg";
import LikeButton from "../SharedComponents/LikeButton";

const InfiniteVideoScroll = () => {
  const icons = [commentsIcon, eyeIcon, inspoMenu];
  return (
    <div className="pb-20">
      {inspoData.map((item) => (
        <div key={item.id}>
          <div
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
              width: "100%",
              aspectRatio: "3/4",
              objectFit: "cover",
              maxHeight: "400px",
           
            }}
          >
            <div className=" h-full flex flex-col justify-end  items-end pr-4 pb-4">
              <div className="flex flex-col items-center ">
                <IconButton>
                  <LikeButton />
                </IconButton>
                  <span className="text-white">3.6k</span>
                <div>
                  <div className="flex flex-col items-center text-white text-sm">
                    <IconButton>
                      <img src={icons[0]} alt="chat icon" />
                    </IconButton>
                    <span>19</span>
                  </div>
                  <div className="flex flex-col items-center text-white text-sm">
                    <IconButton>
                      <img src={icons[1]} alt="chat icon" />
                    </IconButton>
                    <span>89</span>
                  </div>
                  <div className="flex flex-col items-center text-white text-sm">
                    <IconButton>
                      <img src={icons[2]} alt="chat icon" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 mt-4">

          <p className="text-[#475467] font-xs mb-6 text-normal">
            {item.description}
          </p>
          <div className="flex items-center gap-2 mb-5 pl-4">
            <Avatar src={item.profile} sx={{ width: 52, height: 52 }} />
            <div>
              <p className="text-darkPurple font-fashion font-bold text-2xl">
                {item.name}
              </p>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfiniteVideoScroll;
