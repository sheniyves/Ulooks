import React from "react";
import scissors from "../../assets/Images/scissorPurple.svg";
import { sub_Services } from "./SubServices";
import { handlePriceFormatting } from "../../Utils/formattingFunction";

const SubServicesRow = ({ subServiceId }) => {
  const services = sub_Services.filter((c) => subServiceId.includes(c.id));

  return (
    <div>
      <div className="flex items-center gap-2">
        <img src={scissors} alt="scissors icon" />
        <h2 className="text-darkPurple font-bold text-sm ">
          Service (s) wanted
        </h2>
      </div>
      <ul className="flex flex-col gap-y-2 mt-2">
        {services.map((service, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={service.image}
                alt="service icon"
                className="w-12 h-12 rounded-full mr-2"
              />
              <div>
                <span className="text-darkPurple font-bold  text-lg">
                  {service.service}
                </span>
                <p className="text-[12px] text-gray font-medium">
                  {service.audience}
                </p>
              </div>
            </div>
            <div>
              <span className="text-darkPurple font-bold text-lg">
                {handlePriceFormatting(service.amount)}
              </span>
              <p className="text-[12px] text-gray font-medium">
                ({service.duration}) min
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubServicesRow;
