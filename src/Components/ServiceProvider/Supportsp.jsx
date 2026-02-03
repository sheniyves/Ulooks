import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import { useForm } from "react-hook-form";
import sms from "../../assets/Images/sms.svg";
import user from "../../assets/Images/user.svg";
import ActionButton from "../SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import Lottie from "lottie-react";
import { zodResolver } from "@hookform/resolvers/zod";
import backgroundIcon from "../../assets/Images/formIcons.svg";
import house from "../../assets/Images/house.svg";
import support from "../../assets/Images/support.svg";
import { motion } from "framer-motion";
import { supportSchema } from "../../Schema/supportSchema";
import { useNavigate } from "react-router-dom";
import Input2 from "../WebComponents/Input2";

const Supportsp = ({ drawerRef }) => {
  const [status, setStatus] = React.useState("idle");

  const buttonStatus = {
    idle: {
      content: "Send",
      style: {
        backgroundColor: "#F79009",
        color: "#fff",
        cursor: "pointer",
      },
    },
    loading: {
      content: "Sending...",
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
    resolver: zodResolver(supportSchema),
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("Form submitted", data);
    setStatus("loading");
    const timer = setTimeout(() => {
      setStatus("success");
      navigate("/serviceProviderWebApp/messageSent");
    }, 4000);
    return () => clearTimeout(timer);
  };
  return (
    <div>
      <DrawerHeader drawerRef={drawerRef} title={"Support"} />
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center flex items-center justify-center  flex-col ">
          <div
            style={{
              backgroundImage: `url(${backgroundIcon})`,
              objectFit: "contain",
            }}
            className="w-[11.25rem] h-[11.25rem] rounded-full bg-[#fec84b] flex items-end justify-center overflow-hidden"
          >
            <motion.img
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              src={support}
              alt="support illustration"
            />
          </div>
          <p className="text-yellow_gold font-bold text-xl text-center mt-2 max-w-[46rem] ">
            Hey there! Having trouble with the platform?
          </p>
          <p className="text-yellow_gold font-bold text-xl text-center  max-w-[46rem]">
            Let us know how we can help
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mt-6 w-full flex-col max-w-[95%] md:max-w-[85%]"
        >
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

          <Input2
            icon={house}
            textArea
            label={"Message"}
            name={"message"}
            inputType="text"
            placeholder={"Write your message here"}
            {...register("message")}
            error={errors?.message?.message}
          />

          <div className="mt-6" />
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

export default Supportsp;
