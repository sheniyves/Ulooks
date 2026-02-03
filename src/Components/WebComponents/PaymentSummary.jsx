import React from "react";
import fundWalletIcon from "../../assets/Images/payNow.svg";
import payNowIcon from "../../assets/Images/card-tick.svg";
import creditCard from "../../assets/Images/card-pos.svg";
import { sub_Services } from "./SubServices";
import {
  getFrequencyCount,
  handleFormatting,
  handlePriceFormatting,
} from "../../Utils/formattingFunction";
import Lottie from "lottie-react";
import spinner from "../../assets/Animations/spinner.json";
import Button from "./Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ActionButton from "../SharedComponents/ActionButton";

const PaymentSummary = ({ subServiceId }) => {
  const { serviceId } = useParams();
  const services = sub_Services.filter((c) => subServiceId.includes(c.id));

  const coupon = useSelector((state) => state.bookings.bookingsForm)?.coupon;
  const subscribed = useSelector((state) => state.bookings.subscribed);
  const numberOfMonths = useSelector(
    (state) => state.bookings.monthsSubscribed
  );
  const frequency = useSelector((state) => state.bookings.frequencyPerMonth);

  const total = services.reduce((acc, service) => acc + service.amount, 0);
  const totalAmount = subscribed
    ? getFrequencyCount(frequency) * total * numberOfMonths.length
    : total;

  const [status, setStatus] = React.useState("idle");

  const buttonStatus = {
    idle: {
      content: "Pay Now",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "pointer",
      },
    },
    loading: {
      content: "Processing...",
      style: {
        backgroundColor: "#EAEAEC",
        color: "#666",
        cursor: "not-allowed",
      },
    },
    success: {
      content: "Payment Successful",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "default",
      },
    },
    error: {
      content: "Something went wrong",
      style: {
        backgroundColor: "#D32F2F",
        color: "#fff",
        cursor: "default",
      },
    },
  };
  const navigate = useNavigate();
  const handlePayment = () => {
    setStatus("loading");
    const timer = setTimeout(() => {
      setStatus("success");
      navigate(`/customerWebApp/bookedSuccessfully/${serviceId}`);
    }, 4000);
    return () => clearTimeout(timer);
  };
  const { content, style } = buttonStatus[status];

  return (
    <div>
      <div className="flex items-center mt-6 gap-2">
        <img src={creditCard} alt="credit card" />
        <h2 className="text-darkPurple font-bold text-sm my-2">
          Payment Summary
        </h2>
      </div>
      <div>
        <ul>
          {services?.map((service, idx) => (
            <li
              key={idx}
              className="flex mt-2 text-[#8f8f90] items-center justify-between"
            >
              <p className="font-medium ">{service.service}</p>
              <p className="text font-medium">
                {handlePriceFormatting(service.amount)}
              </p>
            </li>
          ))}
          <div className="flex mt-2 text-[#8f8f90] items-center justify-between">
            <p className="font-medium ">Coupon</p>
            <p className="text font-medium">
              {coupon ? coupon : "No coupon applied"}
            </p>
          </div>
          <div className="flex mt-2 text-[#8f8f90] items-center justify-between">
            <p className="font-medium ">Subscription</p>
            <p className="text font-medium">
              {subscribed
                ? `${getFrequencyCount(frequency)} (times) x ${
                    numberOfMonths.length
                  } Months`
                : "No Active Subscription"}
            </p>
          </div>
          <div className="flex mt-2 text-darkPurple  items-center justify-between">
            <p className="font-medium ">Total</p>
            <p className="text font-medium">{handleFormatting(totalAmount)}</p>
          </div>
        </ul>
      </div>
        
        <ActionButton
          onClick={handlePayment}
          disabled={status === "loading"}
          padding="1rem"
          sx={{
            marginTop: "1rem",
            ...style,
            width: "100%",
            "&:hover": {
              backgroundColor:
                status === "idle" ? "#5a0a99" : style.backgroundColor,
            },
          }}
        >
          {status === "loading" && (
            <Lottie
              size={20}
              className="w-6"
              animationData={spinner}
              loop={true}
            />
          )}{" "}
          {content}
          {status === "idle" && <img src={payNowIcon} alt="Wallet icon" />}
        </ActionButton>
      <Button
        sx={{
          backgroundColor: "transparent",
          width: "100%",
          marginTop: "1rem",
          border: "2px solid #6A0DAD",
          color: "#6A0DAD",
          "&:hover": {
            backgroundColor: "#e0bbff ",
          },
        }}
      >
        Fund Wallet
        <img src={fundWalletIcon} alt="Wallet icon" />
      </Button>
      <Button
        sx={{
          backgroundColor: "transparent",
          width: "100%",

          marginTop: "1rem",
          color: "#6A0DAD",
          "&:hover": {
            backgroundColor: "#e0bbff ",
          },
        }}
      >
        Go back and add more services
      </Button>
    </div>
  );
};

export default PaymentSummary;
