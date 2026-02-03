import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import { useForm } from "react-hook-form";
import eyeSlash from "../../assets/Images/eye-slash.svg";
import guard from "../../assets/Images/guard.svg";

import ActionButton from "../SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import Lottie from "lottie-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "../../Schema/accountEditSchema";
import { securitySchema } from "../../Schema/securitySchema";
import Input2 from "../WebComponents/Input2";

const Securitysp = ({ drawerRef }) => {
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
  } = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "InitialPassword",
    },
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
      <DrawerHeader drawerRef={drawerRef} title={"Security"} />
      <div className="flex flex-col items-center justify-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mt-6 w-full flex-col max-w-[95%] md:max-w-[85%]"
        >
          <Input2
            rightIcon={eyeSlash}
            iconRight
            icon={guard}
            inputType={"currentPassword"}
            label={"Password"}
            placeholder={"Set a secure password"}
            {...register("currentPassword")}
            error={errors?.currentPassword?.message}
          />
          <Input2
            rightIcon={eyeSlash}
            iconRight
            icon={guard}
            inputType={"password"}
            label={"Password"}
            placeholder={"Set a secure password"}
            {...register("password")}
            error={errors?.password?.message}
          />
          <Input2
            rightIcon={eyeSlash}
            iconRight
            icon={guard}
            inputType={"confirmPassword"}
            label={"Confirm Password"}
            placeholder={"Re-enter your password"}
            {...register("confirmPassword")}
            error={errors?.confirmPassword?.message}
          />
          <div className="mt-20" />
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
            )}{" "}
            {content}
          </ActionButton>
        </form>
      </div>
    </div>
  );
};

export default Securitysp;
