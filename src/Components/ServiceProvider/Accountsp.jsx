import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import ProfileUpload from "../SharedComponents/ProfileUpload";
import { useForm } from "react-hook-form";
import sms from "../../assets/Images/sms.svg";
import user from "../../assets/Images/user.svg";
import ActionButton from "../SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import Lottie from "lottie-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "../../Schema/accountEditSchema";
import PhoneNumberInput2 from "../WebComponents/PhoneInput2";
import SelectDropDown2 from "../WebComponents/SelectDropown2";
import Input2 from "../WebComponents/Input2";

const Accountsp = ({ drawerRef }) => {
  const [status, setStatus] = React.useState("idle");

  const buttonStatus = {
    idle: {
      content: "Save Changes",
      style: {
        backgroundColor: "#F79009",
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
        backgroundColor: "#F79009",
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
        <h2 className="font-fashion mt-4 mb-2 font-bold  text-[1.75rem] text-orange_gold">
          Tom Lockwood
        </h2>
        <p className="text-yellow_gold font-semibold text-lg text-center mt-2 max-w-[46rem]">
          Johnjakedoe@gmail.com
        </p>
        <p className="text-yellow_gold font-semibold text-lg text-center mt-2 max-w-[46rem]">
          +234 81168392563
        </p>
      </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex mt-6 w-full flex-col max-w-[95%] md:max-w-[85%]">
          <Input2
            icon={user}
            name={"fullName"}
            inputType="text"
            label={"Full Name"}
            {...register("fullName")}
            error={errors?.fullName?.message}
            placeholder={"Enter your full name"}
          />
          <Input2
            icon={sms}
            name={"email"}
            inputType="email"
            label={"Email Address"}
            {...register("email")}
            error={errors?.email?.message}
            placeholder={"Enter your email address"}
          />
          <div className="-mt-4 relative">

          <SelectDropDown2
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
          <PhoneNumberInput2
            control={control}
            error={errors?.phoneNumber?.message}
          />
          <div className="mt-6"/>
          <ActionButton
            type="submit"
            disabled={status === "loading"}
            sx={{
              ...style,
              width: "100%",
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
            )}
            {content}
          </ActionButton>
        </form>
      </div>
    </div>
  );
};

export default Accountsp;
