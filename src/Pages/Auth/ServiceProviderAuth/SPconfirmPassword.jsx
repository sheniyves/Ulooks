import React, { useState } from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../../Components/WebComponents/Input";
import { Checkbox } from "@mui/material";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import OtpInput from "../../../Components/WebComponents/OtpInput";
import Lottie from "lottie-react";
import screen from "../../../assets/Images/screen.svg";
import arrowLeft from "../../../assets/Images/arrow-left.svg";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import { useMutation } from "@tanstack/react-query";
import { confirmResetPassword } from "../../../api/customerAuth";
import { useToast } from "../../../../hooks/useToast";
import Toast from "../../../Components/Toast";
import { useForm } from "react-hook-form";
import sms from "../../../assets/Images/sms.svg";
import guard from "../../../assets/Images/guard.svg";
import eyeSlash from "../../../assets/Images/eye-slash.svg";
import { buttonStatus as getButtonStatus } from "../../../Utils/updateStatus";
import spinner from "../../../assets/Animations/spinner.json";
import { zodResolver } from "@hookform/resolvers/zod";
import confirmPasswordSchema from "../../../Schema/confirmPassword";
import Input2 from "../../../Components/WebComponents/Input2";

const SPconfirmPassword = () => {
  const [status, setStatus] = useState("idle");
  const { toastMessage, toastRef, showToast } = useToast();
  const location = useLocation();
  const email = location.state.email;

  const navigate = useNavigate();
  //Verify Account
  const { mutate: changePassword } = useMutation({
    mutationFn: (data) => confirmResetPassword(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      showToast(data.message || "Password reset", 2000);
      setStatus("success");
      setTimeout(() => {
        navigate("/serviceProviderAuth/serviceProvider_signIn");
      }, 2500);
    },
    onError: (error) => {
      setStatus("error");
      const errorCode = error.response.data.statusCode;
      if (errorCode === 404) {
        showToast("User not found");
        return;
      }
      showToast("Error occurred");
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      email,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      confirm_password: data.password,
      new_password: data.confirmPassword,
      otp: data.otp,
    };

    changePassword(payload);
  };

  const config = getButtonStatus({
    idleContent: "Confirm password",
    loadingContent: "Confirming password...",
    successContent: "Reset successful",
    errorContent: "Confirm password",

    idleStyle: { backgroundColor: "#F79009", color: "#fff" },
    errorStyle: { backgroundColor: "#F79009", color: "#fff" },
    successStyle: { backgroundColor: "#F79009", color: "#fff" },
  });

  const { content, style } = config[status];

  return (
    <div className="">
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
            <div className="h-screen overflow-y-auto  overflow-hidden shadow-md lg:shadow-none rounded-[2rem] lg:rounded-none mx-auto pt-10  px-4 lg:px-6  w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <h2 className=" px-6 lg:px-0 text-transparent bg-gold-strong bg-clip-text font-fashion text-[1.75rem] font-bold flex items-center gap-4">
                <img
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                  src={arrowLeft}
                  alt="Arrow directing to left"
                />{" "}
                Change Password
              </h2>
              {/* <img
              src={screen}
              alt="Image of a screen"
              className=" inline-block lg:hidden w-full"
            /> */}
              <div className="flex items-center justify-center flex-col"></div>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                <Input2
                  icon={sms}
                  name={"email"}
                  inputType="email"
                  label={"Email Address"}
                  {...register("email")}
                  error={errors?.email?.message}
                  placeholder={"Enter your email address"}
                />
                <Input2
                  iconRight={false}
                  icon={guard}
                  inputType={"text"}
                  label={"OTP"}
                  placeholder={"Enter OTP"}
                  {...register("otp")}
                  error={errors?.otp?.message}
                />

                <Input2
                  rightIcon={eyeSlash}
                  iconRight
                  icon={guard}
                  inputType={"password"}
                  label={"New password"}
                  placeholder={"Enter new password"}
                  {...register("password")}
                  error={errors?.password?.message}
                />
                <Input2
                  rightIcon={eyeSlash}
                  iconRight
                  icon={guard}
                  inputType={"password"}
                  label={"Confirm new password"}
                  placeholder={"Confirm password"}
                  {...register("confirmPassword")}
                  error={errors?.confirmPassword?.message}
                />

                <ActionButton
                  type="submit"
                  disabled={status === "loading"}
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
                </ActionButton>
              </form>
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

export default SPconfirmPassword;
