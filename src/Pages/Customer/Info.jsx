import React from "react";
import user from "../../assets/Images/user.svg";
import { handlePriceFormatting } from "../../Utils/formattingFunction";
const Info = ({ icon, title, info, extraInfo, expendedInfo }) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-end gap-2  ">
          <img src={icon} alt="Title icon" />
          <h2 className="text-darkPurple font-bold text-sm ">{title}</h2>
        </div>
        {extraInfo && (
          <p className="text-[#667085] text-base font-medium">{extraInfo}</p>
        )}
      </div>
      {Array.isArray(expendedInfo) && expendedInfo.length > 0 ? (
        <ul className="flex flex-col gap-y-2 mt-2">
          {expendedInfo.map((item, index) => (
            <li
              className="text-[#667085] text-base font-medium flex items-center justify-between"
              key={index}
            >
              <p>{item.service}</p>
              <p>{handlePriceFormatting(item.amount)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-y-2 mt-2">
          {info?.map((item, index) => (
            <li className="text-[#667085] text-base font-medium" key={index}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Info;
