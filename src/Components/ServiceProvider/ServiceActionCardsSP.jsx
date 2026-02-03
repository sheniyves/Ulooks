import React from "react";
import locationIcon from "../../assets/Images/gray-location-icon.svg";
import calendar from "../../assets/Images/calender-2.svg";
import clock from "../../assets/Images/clock-gray.svg";
import ProgressTrackerSP from "./ProgressTrackerSP";
import ActionCardButtons from "./ActionCardButtons";
import { useLocation, useNavigate } from "react-router-dom";

const ServiceActionCardsSP = ({
  details,
  isDone = false,
  step = 1,
  reschedulRef,
  cancelDialogRef,
  setSelectedCard,
  selectedCardId,
  ...props
}) => {
  const progressWidth = window.innerWidth > 770 ? 364 : "100%";
  const navigate = useNavigate()
  const location = useLocation()
  const handleClickedButton = (type) => {
    if (type === "edit") {
      setSelectedCard(details);
      reschedulRef?.current?.openDialog();
    } else if (type === "cancel") {
      cancelDialogRef.current?.openDialog();
      setSelectedCard(details);
    } else if (type === "chat") {
      setSelectedCard(details);
      navigate(`/serviceProviderWebApp/message/${selectedCardId}`, {
        state: {
          previousUrl: location.pathname
        }
      });
    } else {
      setSelectedCard(details);
    }
  };


  return (
    <li
      {...props}
      className="bg-[#FCFCFD] p-4 rounded-md shadow-md w-full max-w-full lg:max-w-[24rem] min-w-0 sms:min-w-[24rem] h-full list-none"
    >
      <div className=" flex items-center justify-center">
        <ProgressTrackerSP step={details.step} width={progressWidth} />
      </div>
      <div className="flex items-center gap-2  w-full">
        <img
          src={details.image}
          alt="details image"
          className="rounded-full w-[3.63rem] h-[3.63rem]"
        />
        <div className=" w-full">
          <h2 className="font-fashion mt-4 mb-2 font-bold  text-xl text-yellow_gold">
            {details.name}
          </h2>
          <ul className=" text-gray font-medium gap-y-2 mb-4 ">
            <li className="flex items-center gap-2">
              <img src={locationIcon} alt="location icon" />
              {details.serviceType}
            </li>
            <li className="flex items-center justify-between w-full mt-2 ">
              <div className="flex items-center gap-2">
                <img src={calendar} alt="star icon" />
                {`${details.day}`}
              </div>
              <div className="flex items-center gap-2  ">
                <img src={clock} alt="star icon" />
                {`${details.time}`}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {!isDone && <ActionCardButtons onSelect={handleClickedButton} />}
    </li>
  );
};

export default ServiceActionCardsSP;
