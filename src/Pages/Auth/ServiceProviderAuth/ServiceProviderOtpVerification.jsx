import React, { useEffect, useState } from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../Components/WebComponents/Input";
import { Checkbox } from "@mui/material";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import OtpInput from "../../../Components/WebComponents/OtpInput";
import Lottie from "lottie-react";
import screen from "../../../assets/Images/screen.svg";
import arrowLeft from "../../../assets/Images/arrow-left.svg";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import { useMutation } from "@tanstack/react-query";
import { resendVerification, verifyAccount } from "../../../api/customerAuth";
import { useToast } from "../../../../hooks/useToast";
import Toast from "../../../Components/Toast";
import { getFromLocalStorage } from "../../../Utils/presistStorage";
import { motion } from "framer-motion";

const ServiceProviderOtpVerification = () => {
  const [status, setStatus] = useState("idle");
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const { toastMessage, toastRef, showToast } = useToast();

  const navigate = useNavigate();
  //Verify Account
  const { mutate: verify } = useMutation({
    mutationFn: (data) => verifyAccount(data),
    onMutate: () => {
      setStatus("pending");
      showToast("Verifying Account");
    },
    onSuccess: (data) => {
      showToast(data.message || "Account Created");

      setStatus("success");
      setTimeout(() => {
        navigate("/serviceProviderAuth/serviceProvider_signIn");
      }, 2500);
    },
    onError: () => {
      setStatus("error");
      showToast("Error occurred");
    },
  });

  //Resend OTP
  const { mutate: resendCode } = useMutation({
    mutationFn: (data) => resendVerification(data),
    onMutate: () => {
      setStatus("pending");
      showToast("Sending code");
    },
    onSuccess: (data) => {
      console.log("After verification", data)
      showToast(data.message || "Code sent");
      setStatus("success");
    },
    onError: () => {
      setStatus("error");
      showToast("Error occurred");
    },
  });

  const userData = getFromLocalStorage("userSPData");
  const { email, userId } = userData;
  const RESEND_DELAY = 30;

  const resendOTP = () => {
    setIsDisabled(true);
    setTimer(RESEND_DELAY);
    const payload = { email, user_id: userId };
    resendCode(payload);
  };

  useEffect(() => {
    let interval;
    if (isDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isDisabled, timer]);

  const verifyEmail = (otpCode) => {
    const payload = { code: otpCode, user_id: userId };
    verify(payload);
  };

  return (
    <div>
      <Toast
        ref={toastRef}
        status={
          status === "success"
            ? "success"
            : status === "pending"
            ? "pending"
            : "error"
        }
      >
        {toastMessage}
      </Toast>
      <PageTransition>
        <ConatinerWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-6 lg:gap-10 xl:gap-16 min-h-screen">
            <div className="h-screen overflow-y-auto  overflow-hidden shadow-md lg:shadow-none rounded-[2rem] lg:rounded-none mx-auto pt-10  px-0 lg:px-6  w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <h2 className=" px-6 lg:px-0 text-transparent bg-gold-strong bg-clip-text font-fashion text-[1.75rem] font-bold flex items-center gap-4">
                <img
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                  src={arrowLeft}
                  alt="Arrow directing to left"
                />{" "}
                Verify Account
              </h2>
              {/* <img
              src={screen}
              alt="Image of a screen"
              className=" inline-block lg:hidden w-full"
            /> */}
              <div className="flex items-center justify-center flex-col">
                <h2 className=" px-6 lg:px-0 text-transparent bg-gold mt-10 bg-clip-text font-fashion text-[1.75rem] font-bold flex items-center gap-4">
                  Check your mail
                </h2>
                <p className="px-6 lg:px-0 text-yellow_gold font-medium text-[1rem] mt-4 text-center">
                  We have sent a 6 digit OTP to your email, to confirm
                  email, Please write it here.
                </p>
              </div>
              <div className=" flex items-ceneter  justify-center my-10">
                <OtpInput
                  //Submit on complete code
                  onComplete={(val) => verifyEmail(val)}
                />
              </div>
              <div className="text-center flex items-center gap-2 justify-center">
                <button
                  disabled={isDisabled}
                  className={` font-semibold cursor-pointer ${
                    isDisabled ? "text-gray cursor-not-allowed" : "text-yellow_gold"
                  }`}
                  onClick={resendOTP}
                >
                  Resend Code
                </button>
                <motion.span
                  className="text-slate-600 font-medium"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{
                    x: isDisabled ? 0 : 20,
                    opacity: isDisabled ? 1 : 0,
                  }}
                >
                  {timer}s
                </motion.span>
              </div>
            </div>
            <div className=" hidden lg:inline-block w-full h-screen">
              <img
                src={screen}
                alt="Image of a screen"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default ServiceProviderOtpVerification;
