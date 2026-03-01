import React from "react";
import { handleFormatting } from "../../Utils/formattingFunction";
import stars from "../../assets/Images/starGold.svg";
import defaultImage from "../../assets/Images/image_background.png";

const RisingStarsRows = ({ data }) => {
  return (
    <li className="flex   items-center justify-between max-w-[500px]">
      <div className="flex items-center gap-4">
        <img
          src={data?.image_url ?? defaultImage}
          alt={`${data?.provider_name} image`}
          className="w-[6.5rem] h-[6.5rem]  flex-shrink-0 object-cover object-center rounded-md"
        />
        <div className="text-left">
          <h2 className="font-fashion truncate line-clamp-2 max-w-[30ch] font-semibold text-darkPurple">
            {data?.service_name
              ? data.service_name.charAt(0).toUpperCase() +
                data.service_name.slice(1)
              : ""}
          </h2>
          <p className="text-gray text-xs">{data?.category}</p>
          <span className="font-semibold text-darkPurple text-sm">
            {handleFormatting(data?.price, data?.currency)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img src={stars} alt="" />
        <span className="font-urbanist text-gray">0.0</span>
      </div>
    </li>
  );
};

export default RisingStarsRows;
