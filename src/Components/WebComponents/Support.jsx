import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import { useForm } from "react-hook-form";
import Input from "./Input";
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
import { getFromLocalStorage } from "../../Utils/presistStorage";
import SelectDropDown from "./SelectDropDown";
import { useMutationFn } from "../../../hooks/queryFn";
import { sendSupportMessage } from "../../api/profile";

const Support = ({ drawerRef }) => {
  const { name, email } = getFromLocalStorage("customerData", "User");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(supportSchema),
  });

  const {
    isPending,
    mutate: sendSupport,
    isError,
    isSuccess,
  } = useMutationFn({
    fun: sendSupportMessage,
    key: ["support_message"],
    onSuccess: () => {
      navigate("/customerWebApp/messageSent");
    },
  });

  const buttonStatus = (() => {
    if (isPending) {
      return {
        content: "Sending...",
        style: {
          backgroundColor: "#B08AD6",
          color: "#666",
          cursor: "not-allowed",
        },
      };
    }

    if (isSuccess) {
      return {
        content: "Submitted Successfully",
        style: {
          backgroundColor: "#6A0DAD",
          color: "#fff",
          cursor: "default",
        },
      };
    }

    if (isError) {
      return {
        content: "Something went wrong",
        style: {
          backgroundColor: "#D92D20",
          color: "#fff",
          cursor: "default",
        },
      };
    }

    return {
      content: "Send",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "pointer",
      },
    };
  })();

  const { content, style } = buttonStatus;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("message", data.message);
    formData.append("category", data.category);
    formData.append("priority", data.priority);
    sendSupport(formData);
  };
  return (
    <div>
      <DrawerHeader drawerRef={drawerRef} title={"Support"} />

      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center flex items-center justify-center flex-col">
          <div
            style={{
              backgroundImage: `url(${backgroundIcon})`,
              objectFit: "contain",
            }}
            className="w-[11.25rem] h-[11.25rem] rounded-full bg-purple flex items-end justify-center overflow-hidden"
          >
            <motion.img
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={support}
              alt="support illustration"
            />
          </div>

          <p className="text-darkPurple font-bold text-xl mt-2">
            Hey there! Having trouble with the platform?
          </p>
          <p className="text-darkPurple font-bold text-xl">
            Let us know how we can help
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mt-6 w-full flex-col max-w-[95%] md:max-w-[85%]"
        >
          <Input
            icon={user}
            name="fullName"
            inputType="text"
            value={name}
            label="Full Name"
            {...register("fullName")}
            error={errors?.fullName?.message}
            placeholder="Enter your full name"
          />

          <Input
            icon={sms}
            name="email"
            inputType="email"
            value={email}
            label="Email Address"
            {...register("email")}
            error={errors?.email?.message}
            placeholder="Enter your email address"
          />

          <div className="-mt-4">
            <SelectDropDown
              control={control}
              name="category"
              error={errors.category?.message}
              label="Category"
              list={[
                { value: "general_inquiry", label: "General Inquiry" },
                { value: "technical_issue", label: "Technical Inquiry" },
                { value: "billing_issue", label: "Billing Issue" },
                { value: "account_issue", label: "Account Issue" },
                { value: "feature_request", label: "Feature Request" },
                { value: "report_violation", label: "Report Violation" },
                { value: "other", label: "Other" },
              ]}
            />
          </div>

          <div className="-mt-4">
            <SelectDropDown
              control={control}
              name="priority"
              error={errors.priority?.message}
              label="Priority"
              list={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
                { value: "critical", label: "Critical" },
              ]}
            />
          </div>

          <Input
            icon={sms}
            name="subject"
            inputType="text"
            label="Subject"
            {...register("subject")}
            error={errors?.subject?.message}
            placeholder="Enter message subject"
          />

          <Input
            icon={house}
            textArea
            label="Message"
            name="message"
            inputType="text"
            placeholder="Write your message here"
            {...register("message")}
            error={errors?.message?.message}
          />

          <div className="mt-6" />

          <ActionButton
            type="submit"
            disabled={isPending}
            sx={{
              ...style,
              width: "100%",
              "&:hover": {
                backgroundColor: !isPending ? "#5a0a99" : style.backgroundColor,
              },
            }}
          >
            {isPending && (
              <Lottie className="w-6" animationData={spinner} loop />
            )}
            {content}
          </ActionButton>
        </form>
      </div>
    </div>
  );
};

export default Support;
