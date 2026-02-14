import React from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../../Components/WebComponents/Input";
import sms from "../../../assets/Images/sms.svg";
import guard from "../../../assets/Images/guard.svg";
import eyeSlash from "../../../assets/Images/eye-slash.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInForm } from "../../../Schema/customerSignIn";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import spinner from "../../../assets/Animations/spinner.json";
import backgroundIcon from "../../../assets/Images/formIcons.svg";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import OnboardingCarousel from "../../../Components/SharedComponents/OnboardingCarousel";
import image1 from "../../../assets/Images/onboarding_image1.svg";
import image2 from "../../../assets/Images/onboarding_image2.svg";
import image3 from "../../../assets/Images/onboarding_image3.svg";
import image4 from "../../../assets/Images/onboarding_image4.svg";
import arrowLeft from "../../../assets/Images/arrow-left.svg";
import { buttonStatus as getButtonStatus } from "../../../Utils/updateStatus";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../../hooks/useToast";
import Toast from "../../../Components/Toast";
import { loginUserAccount } from "../../../api/customerAuth";

let images = [image1, image2, image3, image4];

const CustomerSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signInForm),
  });

  const email = watch("email");

  const [status, setStatus] = React.useState("idle");
  const navigate = useNavigate();
  const { toastMessage, toastRef, showToast } = useToast();
  const { mutate: login, isSuccess } = useMutation({
    mutationFn: (data) => loginUserAccount(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      showToast(data.message || "Signed In", 2000);
      // console.log(data);
      // console.log("Hello there!");
      // console.log(data.data);
      // console.log(data.data.token);

      localStorage.setItem("customerToken", data.data.token);
      localStorage.setItem("customerData", JSON.stringify(data?.data));

      setStatus("success");
      setTimeout(() => {
        navigate(
          !data.data.is_personalization_done
            ? "/customerAuth/login_successful"
            : "/customerWebApp/home",
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
          navigate("/customerAuth/otp_verification");
        }, 4000);

        return;
      }
      showToast("Error occured");
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
      role: "user",
    };
    login(payload);
  };

  const config = getButtonStatus({
    idleContent: "Sign In",
    loadingContent: "Signing In...",
    successContent: "Signed In",
    errorContent: "Sign In",
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
            <div
              style={{
                backgroundImage: `url(${backgroundIcon})`,
                backgroundRepeat: "no-repeat",
              }}
              className=" h-[300px] lg:h-screen w-full bg-form object-contain"
            >
              <OnboardingCarousel images={images} />
            </div>

            <div className="-mt-6 md:mt-0 h-full md:h-screen overflow-y-auto  overflow-hidden  lg:shadow-none rounded-[2rem] lg:rounded-none pt-0 md:pt-10 lg:pt-[20%] px-4 md:px-6  w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <div className="flex items-center gap-4">
                <Link to="/" >
                  <img
                    className="cursor-pointer"
                    src={arrowLeft}
                    alt="Arrow directing to left"
                  />{" "}
                </Link>
                <h2 className="text-darkerPurple font-fashion text-[1.75rem] font-bold">
                  Welcome back, Customer👋
                </h2>
              </div>
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
                    state={{ email }}
                  >
                    Forgot Password
                  </Link>
                </p>

                {/* <div className="relative mb-8">
                <div className="my-6 flex items-center gap-4">
                  <div className="border-2 w-6 h-6 rounded-[.3rem] flex items-center justify-center border-purple">
                    <Controller
                      name="agreedToTerms"
                      control={control}
                      defaultValue={true}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          aria-label="Checkbox"
                          sx={{
                            color: "#6A0DAD",
                            "&.Mui-checked": {
                              color: "#6A0DAD",
                            },
                          }}
                        />
                      )}
                    />
                  </div>

                  <p className="text-darkPurple text-sm font-bold ">
                    By creating an account with us, you agree to our{" "}
                    <Link className="text-purple hover:underline">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link className="text-purple hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                <Error error={errors?.agreedToTerms?.message} />
              </div> */}

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
