import React, { useRef, useState } from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import salon from "../../../assets/Images/salon.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../Components/WebComponents/Input";
import user from "../../../assets/Images/user.svg";
import sms from "../../../assets/Images/sms.svg";
import guard from "../../../assets/Images/guard.svg";
import eyeSlash from "../../../assets/Images/eye-slash.svg";
import { Checkbox, Select } from "@mui/material";
import SelectDropDown from "../../../Components/WebComponents/SelectDropDown";
import PhoneNumberInput from "../../../Components/WebComponents/PhoneInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountForm } from "../../../Schema/customerCreateAccountForm";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import spinner from "../../../assets/Animations/spinner.json";
import Error from "../../../Components/WebComponents/Error";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import { useMutation } from "@tanstack/react-query";
import { createUserAccount } from "../../../api/customerAuth";
import { buttonStatus as getButtonStatus } from "../../../Utils/updateStatus";
import { useToast } from "../../../../hooks/useToast";
import Toast from "../../../Components/Toast";
import { setToLocalStorage } from "../../../Utils/presistStorage";
import coupon from "../../../assets/Images/coupon.svg";
import arrowLeft from "../../../assets/Images/arrow-left.svg";

const CustomerCreateAccount = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createAccountForm),
    defaultValues: {
      fullName: "",
      email: "",
      gender: "",
      phoneNumber: "",
      password: "",
      agreedToTerms: true,
    },
  });

  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const { toastMessage, toastRef, showToast } = useToast();

  const { mutate: createAccount, isSuccess } = useMutation({
    mutationKey: ["createUserAccount"],
    mutationFn: (data) => createUserAccount(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      console.log("create account Success data", data);
      if (data.data.statusCode !== 400) {
        showToast(data.message || "Account Created");
      }

      setToLocalStorage("userData", {
        userId: data.data.data.id,
        email: data.data.data.email,
      });

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

  const config = getButtonStatus({
    idleContent: "Sign Up",
    loadingContent: "Creating Account...",
    successContent: "Account Created",
    errorContent: "Something went wrong",
  });

  const { content, style } = config[status];

  const onSubmit = (data) => {
    const payload = {
      email: data.email,
      full_name: data.fullName,
      password: data.password,
      phone_number: `+${data.phoneNumber}`,
      role: "user",
      gender: data.gender,
      referral_code: data?.referralCode,
    };
    createAccount(payload);
  };

  return (
    <div>
      <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
        {toastMessage}
      </Toast>
      <PageTransition>
        <ConatinerWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-16 min-h-screen">
            <div className="hidden lg:inline-block h-screen sticky top-0">
              <img
                src={salon}
                alt="Image of a salon"
                className="h-full w-full object-cover object-bottom"
              />
            </div>

            <div className=" -mt-4 md:mt-0 mi-h-screen overflow-y-auto px-4 md:px-6 py-10 pb-20 md:py-20 w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <div className="flex items-center gap-4">
                <Link to="/customerAuth/getStarted_SignUp">
                  <img
                    className="cursor-pointer"
                    src={arrowLeft}
                    alt="Arrow directing to left"
                  />{" "}
                </Link>
                <h2 className="text-darkerPurple font-fashion text-[1.75rem] font-bold">
                  Create Customer account
                </h2>
              </div>
              <p className="text-darkPurple font-medium text-[1rem] mt-4">
                Enter your details as they appear on your government ID to set
                up your account and start booking services
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                <Input
                  icon={user}
                  label="Full Name"
                  name="fullName"
                  inputType="text"
                  placeholder="Enter First and Last name here"
                  {...register("fullName")}
                  error={errors?.fullName?.message}
                />
                <Input
                  icon={sms}
                  name="email"
                  inputType="email"
                  label="Email Address"
                  {...register("email")}
                  error={errors?.email?.message}
                  placeholder="Enter your email address"
                />
                <div className="relative">
                  <SelectDropDown
                    control={control}
                    name="gender"
                    error={errors.gender?.message}
                    label="Gender"
                    list={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "non_binary", label: "Non-binary" },
                      {
                        value: "prefer_not_to_say",
                        label: "Prefer not to say",
                      },
                    ]}
                    
                  />
                </div>
                <PhoneNumberInput
                  control={control}
                  error={errors?.phoneNumber?.message}
                />
                <Input
                  rightIcon={eyeSlash}
                  iconRight
                  icon={guard}
                  inputType="password"
                  label="Password"
                  placeholder="Set a secure password"
                  {...register("password")}
                  error={errors?.password?.message}
                />
                <div className="relative  ">
                  <Input
                    icon={coupon}
                    label="Referral code"
                    name="referralCode"
                    inputType="text"
                    placeholder="Enter referral code here"
                    {...register("referralCode")}
                    error={errors?.referralCode?.message}
                  />
                  <p className="text-sm text-gray absolute top-0 right-2">
                    Optional
                  </p>
                </div>

                <div className="relative mb-8">
                  <div className="my-6  mt-14 md:mt-8 flex items-center gap-4">
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
                </div>

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

                <p className="text-[#2f034e] font-bold text-center mt-8">
                  Already have an account:
                  <Link
                    to={"/customerAuth/customer_signIn"}
                    className="text-purple ml-1"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default CustomerCreateAccount;
