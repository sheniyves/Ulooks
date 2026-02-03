import React from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import sms from "../../../assets/Images/sms.svg";
import guard from "../../../assets/Images/guard.svg";
import eyeSlash from "../../../assets/Images/eye-slash.svg";
import { Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInForm } from "../../../Schema/customerSignIn";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import spinner from "../../../assets/Animations/spinner.json";
import backgroundIcon from "../../../assets/Images/formIcons.svg";
import womanWithBrush from "../../../assets/Images/womanWithBrush.svg";
import Input2 from "../../../Components/WebComponents/Input2";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import image1 from "../../../assets/Images/onboarding_image1.svg";
import image2 from "../../../assets/Images/onboarding_image2.svg";
import image3 from "../../../assets/Images/onboarding_image3.svg";
import image4 from "../../../assets/Images/onboarding_image4.svg";
import OnboardingCarousel from "../../../Components/SharedComponents/OnboardingCarousel";
import { buttonStatus as getButtonStatus } from "../../../Utils/updateStatus";
import { useToast } from "../../../../hooks/useToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUserAccount } from "../../../api/customerAuth";
import Toast from "../../../Components/Toast";
import { getServiceCategories } from "../../../api/services";

let images = [womanWithBrush, image2, image3, image4];
const SPSignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInForm),
  });

  const [status, setStatus] = React.useState("idle");
  const navigate = useNavigate();
  const { toastMessage, toastRef, showToast } = useToast();

  const {
    mutate: login,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: (data) => loginUserAccount(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      showToast(data.message || "Signed In", 2000);
      console.log(data);
      console.log(data.data);
      console.log(data.data.token);

      localStorage.setItem("serviceProviderToken", data.data.token);
      setStatus("success");
      setTimeout(() => {
        navigate(
          !data.data.is_personalization_done
            ? "/serviceProviderAuth/login_successful"
            : data.data.isService_created
            ? "/serviceProviderWebApp/home"
            : "/serviceProviderWebApp/noAppointments"
        );
      }, 2500);
    },
    onError: (error) => {
      setStatus("error");
      const errorCode = error.response.data.statusCode;
      console.log({ error, errorCode });

      if (errorCode === 401) {
        showToast("Invalid email or password");
        return;
      } else if (errorCode === 403) {
        showToast("Email not verified");

        setTimeout(() => {
          navigate("/serviceProviderAuth/otp_verification");
        }, 4000);

        return;
      }
      showToast("Error occured");
    },
  });

  const token = data?.data?.token;

  const {
    data: serviceCategory,
    isSuccess: isServiceCategorySuccess,
    error,
  } = useQuery({
    queryFn: () => getServiceCategories(token),
    queryKey: ["service_category", token],
    enabled: !!token,
  });

  if (isServiceCategorySuccess) {
    localStorage.setItem("serviceCategory", JSON.stringify(serviceCategory));
    console.log("Fetched categories:", serviceCategory);
  } else {
    console.log({ error });
  }

  const email = watch("email");

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
      role: "service_provider",
    };
    login(payload);
  };

  const config = getButtonStatus({
    idleContent: "Sign In",
    loadingContent: "Signing In...",
    successContent: "Signed In",
    errorContent: "Sign In",

    idleStyle: { backgroundColor: "#F79009", color: "#fff" },
    errorStyle: { backgroundColor: "#F79009", color: "#fff" },
    successStyle: { backgroundColor: "#F79009", color: "#fff" },
  });

  const { content, style } = config[status];

  return (
    <div>
      <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
        {toastMessage}
      </Toast>
      <PageTransition>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-6 lg:gap-10 xl:gap-16 min-h-screen ">
          <div
            style={{ backgroundImage: `url(${backgroundIcon})` }}
            className=" h-[300px] lg:h-screen w-full bg-orange_gold"
          >
            <OnboardingCarousel images={images} />
          </div>

          <div className=" -mt-6 md:mt-0 h-full md:h-screen overflow-y-auto  overflow-clip  lg:shadow-none rounded-[2rem]  lg:rounded-none pt-0 md:pt-10 lg:pt-[20%] px-4 md:px-6  w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
            <h2 className="text-orange_gold font-fashion text-[1.75rem] font-bold">
              Welcome back to work!
            </h2>
            <p className="text-yellow_gold font-medium text-[1rem] mt-4">
              Please enter your login information below to access your Service
              provider account
            </p>

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
                  to="/serviceProviderAuth/serviceProvider_reset_password"
                  state={{ email }}
                  className="text-red"
                >
                  Forgot Password
                </Link>
              </p>

              <ActionButton
                type="submit"
                disabled={status === "loading"}
                // padding="1rem"
                sx={{
                  ...style,
                  width: "100%",
                  marginTop: "1rem",
                  "&:hover": {
                    backgroundColor:
                      status === "idle" ? "#DB7F1A" : style.backgroundColor,
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
                  to="/serviceProviderAuth/serviceProvider_createAccount"
                  className="text-gold"
                >
                  Create Account
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default SPSignIn;
