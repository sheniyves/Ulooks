import { useState, useEffect } from "react";
import image1 from "../../assets/Images/ads1.png";
import image2 from "../../assets/Images/ads2.png";
import image3 from "../../assets/Images/image (6).png";
import image4 from "../../assets/Images/image (3).png";
import image5 from "../../assets/Images/image (2).png";
import image6 from "../../assets/Images/ads1.png";
import image9 from "../../assets/Images/ads2.png";
import image12 from "../../assets/Images/ads2.png";
import chatIcon from "../../assets/Images/messages-outlined.svg";
import cancelAppointment from "../../assets/Images/cancel_appointment.svg";
import { Avatar, AvatarGroup, IconButton } from "@mui/material";
import { buttonStatus } from "../../Utils/updateStatus";
import ActionButton from "../SharedComponents/ActionButton";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/newBookingSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const avatars = [image1, image2, image3, image4, image5, image6];

const BookNowStep5 = ({serviceId}) => {
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const buttonConfig = buttonStatus({
    idleContent: "Pay with Cash",
    loadingContent: "Processing...",
    successContent: "Payment Complete",
    errorContent: "Error in making payment",
  });

  const content = buttonConfig[status]?.content;
  const style = buttonConfig[status]?.style;

  const handlePayment = () => {
    setStatus("loading");
    const timer = setTimeout(() => {
      setStatus("success");
      const resetTimer = setTimeout(() => {
        setStatus("idle");
        dispatch(setStep(6));
      }, 2000);
      return () => clearTimeout(resetTimer);
    }, 4000);

    return () => clearTimeout(timer);
  };

  const handleChatNavigate = () => {
    navigate(`/customerWebApp/message/${serviceId}`, {
      state: {
        previousUrl: location.pathname,
      },
    });
  };
  return (
    <div>
      <p className="font-medium text-[#667085] text-lg text-center mb-5">
        Connecting you to a service provider
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-3">
          <Avatar src={image12} alt="My profile picture" />
          <span className="text-darkPurple font-medium">Me</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <AvatarGroup>
            {avatars.map((avatar, idx) => (
              <Avatar
                key={idx}
                src={avatar}
                alt="Searching service provider profile picture"
              />
            ))}
          </AvatarGroup>
          <span className="text-darkPurple font-medium">Barbers</span>
        </div>
      </div>

      <p className="font-medium text-[#667085] text-lg text-center my-5">
        A few service providers are available, we are searching for the best
        match
      </p>

      <div className="flex items-center justify-between max-w-[25rem] mx-auto">
        <div className="w-[4.5rem] h-[4.5rem] rounded-full overflow-hidden">
          <img
            src={image9}
            alt="Picked service provider profile picture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <IconButton onClick={handleChatNavigate}>
            <div className="bg-[#F4E2FE] rounded-full p-4">
              <img src={chatIcon} alt="Chat service provider" />
            </div>
          </IconButton>

          <p className="text-darkPurple font-medium capitalize">Chat</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <IconButton>
            <div className="rounded-full">
              <img src={cancelAppointment} alt="Cancel booking" />
            </div>
          </IconButton>
          <p className="text-cencel_red font-medium capitalize">Cancel</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 mt-10">
        <ActionButton
          onClick={handlePayment}
          style={{ width: "100%", ...style }}
        >
          {content}
        </ActionButton>
        <ActionButton
          style={{
            width: "100%",
            border: "1px solid #6A0DAD",
            backgroundColor: "transparent",
            color: "#6A0DAD",
          }}
        >
          Pay by Transfer
        </ActionButton>
      </div>

      <div className="h-10 " />
    </div>
  );
};

export default BookNowStep5;
