import React from "react";
import image1 from "../../assets/Images/spAction1.svg";
import image2 from "../../assets/Images/spAction2.svg";
import image3 from "../../assets/Images/spAction3.svg";
import image4 from "../../assets/Images/spAction4.svg";
import { Link } from "react-router-dom";
const QuickAction = () => {
  return (
    <div className="mt-6 ">
      <h2 className="text-yellow_gold font-fashion text-2xl font-bold">
        Quick Action
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {actions.map((action) => (
          <ActionCards key={action.id} action={action} />
        ))}
      </ul>
    </div>
  );
};

export default QuickAction;

const ActionCards = ({ action }) => {
  return (
    <li
      key={action.id}
      className="flex  gap-2 items-center flex-row md:flex-col justify-center text-center"
    >
      <Link to={action.to}>
        <img
          src={action.image}
          alt="Action image"
          className="max-w-[7.5rem] max-h-[7rem] rounded-lg"
        />
      </Link>
      <div className=" text-left md:text-center">
        <h3 className="text-yellow_gold font-fashion text-2xl font-bold mb-2">
          {action.title}
        </h3>
        <p className="text-gray font-medium">{action.text}</p>
      </div>
    </li>
  );
};

const actions = [
  {
    id: 1,
    image: image1,
    title: "See Today's appointments",
    text: "Quickly jump to work, without wasting time or delay and start making money",
    to: "/serviceProviderWebApp/todayAppointment",
  },
  {
    id: 2,
    image: image2,
    title: "Ads and Promotion Manager",
    text: "Take advantage of our Large customer database and Promote your business ",
    to: "/serviceProviderWebApp/adsInfo",
  },
  {
    id: 3,
    image: image3,
    title: "Withdraw my money",
    text: "Withdraw your money at will, whenever you want",
    to: "/serviceProviderWebApp/withdraw",
  },
  {
    id: 4,
    image: image4,
    title: "Manage Availability",
    text: "Quickly set your available time and unavailable time as you see fit.",
    to: "/serviceProviderWebApp/manageAvailability",
  },
];
