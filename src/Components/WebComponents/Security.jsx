import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import { useForm } from "react-hook-form";
import Input from "./Input";
import eyeSlash from "../../assets/Images/eye-slash.svg";
import guard from "../../assets/Images/guard.svg";
import SelectDropDown from "./SelectDropDown";
import PhoneNumberInput from "./PhoneInput";
import ActionButton from "../SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import Lottie from "lottie-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { securitySchema } from "../../Schema/securitySchema";
import CheckCircleIcon from "./CheckCircleIcon";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useMutationFn } from "../../../hooks/queryFn";
import { confirmResetPassword, resetPasswordOtp } from "../../api/customerAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks/useToast";
import Toast from "../Toast";

const Security = ({ drawerRef, isSuccess, email }) => {
  const [status, setStatus] = React.useState("idle");
  const { toastMessage, toastRef, showToast } = useToast();
  const {
    mutate: resendOtp,
    isSuccess: isOtpSent,
    isPending,
    isError,
  } = useMutationFn({
    key: ["createResetPassword"],
    fun: (data) => resetPasswordOtp(data),
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });
  const handleResendOtp = () => {
    resendOtp({ email });
  };

  const { mutate: changePassword } = useMutation({
    mutationFn: (data) => confirmResetPassword(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      showToast(data.message || "Password reset!", 2000);
      setStatus("success");
    },
    onError: (error) => {
      setStatus("error");
      console.log("Error", error);
      const errorCode = error.response.data.statusCode;
      if (errorCode === 404) {
        showToast("User not found");
        return;
      }
      showToast("Error occurred");
    },
  });
  const buttonStatus = {
    idle: {
      content: "Save Changes",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "pointer",
      },
    },
    loading: {
      content: "Saving Changes...",
      style: {
        backgroundColor: "#EAEAEC",
        color: "#666",
        cursor: "not-allowed",
      },
    },
    success: {
      content: "Submitted Successfully",
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

  const { content, style } = buttonStatus[status];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "InitialPassword",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    const { confirmPassword, otp } = data;
    const payload = {
      confirm_password: confirmPassword,
      new_password: confirmPassword,
      email:email,
      otp,
    };
    changePassword(payload);
  };
  return (
    <div>
   <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
  {toastMessage}
</Toast>

      <DrawerHeader drawerRef={drawerRef} title={"Security"} />
      {isSuccess && (
        <div className="bg-purple/20 flex items-center gap-2 w-fit p-3 rounded-xl text-darkerPurple border border-darkerPurple">
          <TaskAltIcon size={6} color="inherit" />
          <p className="text-darkerPurple text-sm">
            Your OTP has been sent to yout mail
          </p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mt-6 w-full flex-col max-w-[95%] md:max-w-[85%]"
        >
          <Input
            rightIcon={eyeSlash}
            iconRight
            icon={guard}
            inputType={"currentPassword"}
            label={"Password"}
            placeholder={"Set a secure password"}
            {...register("currentPassword")}
            error={errors?.currentPassword?.message}
          />
          <Input
            rightIcon={eyeSlash}
            iconRight
            icon={guard}
            inputType={"email"}
            label={"Email"}
            value={email || ""}
            {...register("email")}
            error={errors?.email?.message}
          />
          <Input
            rightIcon={eyeSlash}
            iconRight
            icon={guard}
            inputType={"password"}
            label={"Password"}
            placeholder={"Set a secure password"}
            {...register("password")}
            error={errors?.password?.message}
          />
          <Input
            rightIcon={eyeSlash}
            iconRight
            icon={guard}
            inputType={"confirmPassword"}
            label={"Confirm Password"}
            placeholder={"Re-enter your password"}
            {...register("confirmPassword")}
            error={errors?.confirmPassword?.message}
          />
          <Input
            iconRight={false}
            icon={guard}
            inputType={"text"}
            label={"OTP"}
            placeholder={"Enter OTP"}
            {...register("otp")}
            error={errors?.otp?.message}
          />
          {/* <p
            className="text-center text-sm underline text-purple cursor-pointer mt-5"
            onClick={handleResendOtp}
          >
            {isPending
              ? "Sending Otp"
              : isError
                ? "Error occured in sending Otp"
                : isOtpSent
                  ? "OTP sent"
                  : "Resend OTP"}
          </p> */}
          <p className="text-center mt-5">
            <AnimatePresence mode="wait">
              <motion.span
                key={
                  isPending
                    ? "sending"
                    : isError
                      ? "error"
                      : isOtpSent
                        ? "sent"
                        : "resend"
                }
                className="text-sm underline text-purple cursor-pointer"
                onClick={handleResendOtp}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3 }}
              >
                {isPending
                  ? "Sending OTP"
                  : isError
                    ? "Error occurred in sending OTP"
                    : isOtpSent
                      ? "OTP sent"
                      : "Resend OTP"}
              </motion.span>
            </AnimatePresence>
          </p>
          <div className="mt-20" />
          <ActionButton
            type="submit"
            disabled={status === "loading"}
            sx={{
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
    </div>
  );
};

export default Security;
