import React from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../../Components/WebComponents/Input";
import sms from "../../../assets/Images/sms.svg";
import { Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "../../../Schema/customerResetPassword";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import spinner from "../../../assets/Animations/spinner.json";
import hand from "../../../assets/Images/hand.svg";
import arrowLeft from "../../../assets/Images/arrow-left.svg";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import { buttonStatus as getButtonStatus } from "../../../Utils/updateStatus";
import { resetPasswordOtp } from "../../../api/customerAuth";
import { useToast } from "../../../../hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import Toast from "../../../Components/Toast";

const CustomerResetPassword = () => {
  const location = useLocation();
  const email = location.state.email;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPassword),
    defaultValues: {
      email,
    },
  });

  const [status, setStatus] = React.useState("idle");
  const navigate = useNavigate();

  const { toastMessage, toastRef, showToast } = useToast();

  const { mutate: resendOtp, isSuccess } = useMutation({
    mutationKey: ["createResetPassword"],
    mutationFn: (data) => resetPasswordOtp(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      console.log("Success data", data);
      showToast(data.message || "Account Created", 2500);

      setStatus("success");

      setTimeout(() => {
        navigate("/customerAuth/confirm_password", {
          state: {
            email,
          },
        });
      }, 3000);
    },
    onError: (error) => {
      setStatus("error");
      const errorCode = error.response.data.statusCode;
      if (errorCode === 404) {
        showToast("Email not found");
      }
      showToast("Error occurred");
    },
  });

  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    const payload = { email: data.email };
    console.log({payload})
    resendOtp(payload);
  };

  const config = getButtonStatus({
    idleContent: "Send OTP",
    loadingContent: "Sending...",
    successContent: "OTP sent",
    errorContent: "Send OTP",
  });

  const { content, style } = config[status];

  return (
    <div>
      <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
        {toastMessage}
      </Toast>
      <PageTransition>
        <ConatinerWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-6 lg:gap-10 xl:gap-16 min-h-screen">
            <div className="h-screen overflow-y-auto  overflow-hidden shadow-md lg:shadow-none rounded-[2rem] lg:rounded-none mx-auto pt-10 px-4 :px-6  w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <h2 className="text-transparent bg-gold-strong bg-clip-text font-fashion text-[1.75rem] font-bold flex items-center gap-4">
                <img
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                  src={arrowLeft}
                  alt="Arrow directing to left"
                />{" "}
                Reset Password
              </h2>
              <p className="text-darkPurple font-medium text-[1rem] mt-4">
                Enter the email associated with your account and we’ll send an
                email with a link to reset your password.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                <Input
                  icon={sms}
                  name={"email"}
                  inputType="email"
                  label={"Email Address"}
                  {...register("email")}
                  error={errors?.email?.message}
                  placeholder={"Enter your email address here"}
                />

                <ActionButton
                  type="submit"
                  disabled={status === "loading"}
                  sx={{
                    ...style,
                    width: "100%",
                    marginTop: "1.8rem",
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
            <div className=" hidden lg:inline-block w-full bg-form h-screen">
              <img
                src={hand}
                alt="Image of a hand"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default CustomerResetPassword;
