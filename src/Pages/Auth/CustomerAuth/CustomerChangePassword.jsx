import React, { useState } from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../Components/WebComponents/Input";
import { Checkbox } from "@mui/material";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import screen from "../../../assets/Images/screen.svg";
import arrowLeft from "../../../assets/Images/arrow-left.svg";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import guard from "../../../assets/Images/guard.svg";
import eyeSlash from "../../../assets/Images/eye-slash.svg";
import { buttonStatus as getButtonStatus } from "../../../Utils/updateStatus";
import spinner from "../../../assets/Animations/spinner.json";
import { confirmResetPassword } from "../../../api/customerAuth";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../../hooks/useToast";
import Toast from "../../../Components/Toast";

const CustomerChangePassword = () => {
  const navigate = useNavigate();

  const { toastMessage, toastRef, showToast } = useToast();

  const { mutate: confirmPassword, isSuccess } = useMutation({
    mutationKey: ["createUserAccount"],
    mutationFn: (data) => confirmResetPassword(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      console.log("Success data", data);
      showToast(data.message || "Account Created");

      setStatus("success");

      setTimeout(() => {
        navigate("/customerAuth/account_created_successfully");
      }, 4000);
    },
    onError: () => {
      setStatus("error");
      showToast("Error occurred");
    },
  });
  const [status, setStatus] = useState("idle");

  const config = getButtonStatus({
    idleContent: "Change password",
    loadingContent: "Changing password",
    successContent: "Password set",
    errorContent: "Change password",
  });

  const { content, style } = config[status];

  const onSubmit = (data) => {
    confirmPassword(data);
  };

  return (
    <div>
      <Toast status={isSuccess ? "success" : "error"} ref={toastRef}>
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
                Check your email
              </h2>
              {/* <img
              src={screen}
              alt="Image of a screen"
              className=" inline-block lg:hidden w-full"
            /> */}
              <p className="px-6 lg:px-0 text-darkPurple font-medium text-[1rem] mt-4 text-center mb-10">
                We have sent a Password recovery link to your email.
              </p>

              <Input
                rightIcon={eyeSlash}
                iconRight
                icon={guard}
                inputType={"password"}
                label={"Password"}
                placeholder={"Enter your password"}
                // {...register("password")}
                // error={errors?.password?.message}
              />

              <Input
                rightIcon={eyeSlash}
                iconRight
                icon={guard}
                inputType={"password"}
                label={"Confirm password"}
                placeholder={"Confirm password"}
                // {...register("password")}
                // error={errors?.password?.message}
              />

              <ActionButton
                type="submit"
                disabled={status === "loading"}
                sx={{
                  ...style,
                  marginTop: "1.8rem",
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
              </ActionButton>
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

export default CustomerChangePassword;
