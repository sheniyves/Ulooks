import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import ProfileUpload from "../SharedComponents/ProfileUpload";
import { useForm } from "react-hook-form";
import Input from "./Input";
import sms from "../../assets/Images/sms.svg";
import user from "../../assets/Images/user.svg";
import SelectDropDown from "./SelectDropDown";
import PhoneNumberInput from "./PhoneInput";
import ActionButton from "../SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import Lottie from "lottie-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "../../Schema/accountEditSchema";

const Account = ({ drawerRef }) => {
  const [status, setStatus] = React.useState("idle");

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
    control,
  } = useForm({
    resolver: zodResolver(accountSchema)
  });
  const onSubmit = (data) => {
    console.log("Form submitted", data);
    setStatus("loading");
    const timer = setTimeout(() => {
     setStatus("success");
    }, 4000);
    return () => clearTimeout(timer);
  };
  return (
    <div>
      <DrawerHeader drawerRef={drawerRef} title={"Account"} />
      <div className="flex flex-col items-center justify-center h-full">
        <ProfileUpload />
            <div className="text-center">
        <h2 className="font-fashion mt-4 mb-2 font-bold  text-[1.75rem] text-[#6A0DAD]">
          John Jake Doe
        </h2>
        <p className="text-darkPurple font-semibold text-lg text-center mt-2 max-w-[46rem]">
          Johnjakedoe@gmail.com
        </p>
        <p className="text-darkPurple font-semibold text-lg text-center mt-2 max-w-[46rem]">
          +234 81168392563
        </p>
      </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex mt-6 w-full flex-col max-w-[95%] md:max-w-[85%]">
          <Input
            icon={user}
            name={"fullName"}
            inputType="text"
            label={"Full Name"}
            {...register("fullName")}
            error={errors?.fullName?.message}
            placeholder={"Enter your full name"}
          />
          <Input
            icon={sms}
            name={"email"}
            inputType="email"
            label={"Email Address"}
            {...register("email")}
            error={errors?.email?.message}
            placeholder={"Enter your email address"}
          />
          <div className="-mt-4 relative">

          <SelectDropDown
            control={control}
            name="gender"
            error={errors.gender?.message}
            label={"Gender"}
            list={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "non_binary", label: "Non-binary" },
              { value: "prefer_not_to_say", label: "Prefer not to say" },
            ]}
            />
            </div>
          <PhoneNumberInput
            control={control}
            error={errors?.phoneNumber?.message}
          />
          <div className="mt-6"/>
          <ActionButton
            type="submit"
            disabled={status === "loading"}
            padding="1rem"
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
            )}
            {content}
          </ActionButton>
        </form>
      </div>
    </div>
  );
};

export default Account;
