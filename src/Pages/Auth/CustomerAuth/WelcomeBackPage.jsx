import React from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../Components/WebComponents/Input";
import sms from "../../../assets/Images/sms.svg";
import guard from "../../../assets/Images/guard.svg";
import eyeSlash from "../../../assets/Images/eye-slash.svg";
import { Checkbox } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInForm } from "../../../Schema/customerSignIn";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import spinner from "../../../assets/Animations/spinner.json";
import backgroundIcon from "../../../assets/Images/formIcons.svg";
import woman from "../../../assets/Images/woman.svg";
import Error from "../../../Components/WebComponents/Error";
import PageTransition from "../../../Components/SharedComponents/PageTransition";

const CustomerSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInForm),
  });

  const [status, setStatus] = React.useState("idle");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    setStatus("loading");
    const timer = setTimeout(() => {
      navigate("/customerWebApp/home");
    }, 4000);
    return () => clearTimeout(timer);
  };

  const buttonStatus = {
    idle: {
      content: "Sign In",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "pointer",
      },
    },
    loading: {
      content: "Signing In...",
      style: {
        backgroundColor: "#EAEAEC",
        color: "#666",
        cursor: "not-allowed",
      },
    },
    success: {
      content: "Account Created",
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

  return (
    <div>
      <PageTransition>
        <ConatinerWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-6 lg:gap-10 xl:gap-16 min-h-screen">
            <div
              style={{ backgroundImage: `url(${backgroundIcon})` }}
              className=" h-[300px] lg:h-screen w-full bg-form object-contain"
            >
              <img
                src={woman}
                alt="Image of a salon"
                className="h-full w-full object-cover"
              />
            </div>

            <div className=" h-[65vh] md:h-screen overflow-y-auto  overflow-hidden shadow-md lg:shadow-none rounded-[2rem] lg:rounded-none pt-10 lg:pt-[20%] px-4 md:px-6  w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <h2 className="text-darkerPurple font-fashion text-[1.75rem] font-bold">
                Welcome back, Customer👋
              </h2>
              <p className="text-darkPurple font-medium text-[1rem] mt-4">
                Please enter your login information below to access your
                Customer account
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                <Input
                  icon={sms}
                  name={"email"}
                  inputType="email"
                  label={"Email Address"}
                  {...register("email")}
                  error={errors?.email?.message}
                  placeholder={"Enter your email address"}
                />

                <Input
                  rightIcon={eyeSlash}
                  iconRight
                  icon={guard}
                  inputType={"password"}
                  label={"Password"}
                  placeholder={"Enter your password"}
                  {...register("password")}
                  error={errors?.password?.message}
                />
                <p className="cursor-pointer mt-6 text-red font-bold text-sm text-right">
                  <Link
                    to="/customerAuth/customer_reset_password"
                    className="text-red"
                  >
                    Forgot Password
                  </Link>
                </p>

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
                <p className="text-[#2f034e] font-bold text-center mt-8">
                  I don't have an account:{" "}
                  <Link
                    to="/customerAuth/customer_createAccount"
                    className="text-purple"
                  >
                    Create Account
                  </Link>{" "}
                </p>
              </form>
            </div>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default CustomerSignIn;
