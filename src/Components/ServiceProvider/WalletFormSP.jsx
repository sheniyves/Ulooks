import React from "react";
import userIcon from "../../assets/Images/user.svg";
import cardIcon from "../../assets/Images/cardPurple.svg";
import cardTick from "../../assets/Images/cardTick.svg";
import { useForm } from "react-hook-form";
import nairaIcon from "../../assets/Images//₦.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import ActionButton from "../SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import { withdrawschema } from "../../Schema/withdrawSchema";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import Input2 from "../WebComponents/Input2";

const WithdrawFormSP = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(withdrawschema),
  });
  const [status, setStatus] = React.useState("idle");

  const buttonStatus = {
    idle: {
      content: "Withdraw",
      style: {
        backgroundColor: "#F79009",
        color: "#fff",
        cursor: "pointer",
      },
    },
    loading: {
      content: "Processing...",
      style: {
        backgroundColor: "#EAEAEC",
        color: "#666",
        cursor: "not-allowed",
      },
    },
    success: {
      content: "Withdraw Successful",
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
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    setStatus("loading");
    const timer = setTimeout(() => {
      setStatus("success");
      reset();
      navigate("/customerWebApp/emptyWallet");
    }, 4000);
    return () => clearTimeout(timer);
  };
  const { content, style } = buttonStatus[status];

  return (
    <div>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <Input2
          icon={userIcon}
          label="Card Holder's Name"
          name="cardName"
          inputType="text"
          placeholder="Type name in correct order"
          // backgroundInput="bg-[#f9fafb]"
          {...register("cardName")}
          error={errors?.cardName?.message}
        />
        <Input2
          icon={cardIcon}
          label="Card Number"
          name="cardNumber"
          inputType="text"
          placeholder="Type your card number here"
          // backgroundInput="bg-[#f9fafb]"
          {...register("cardNumber")}
          error={errors?.cardNumber?.message}
        />
        <Input2
          icon={cardTick}
          label="Account Number"
          name="accountNumber"
          inputType="text"
          placeholder="000-000-000"
          // backgroundInput="bg-[#f9fafb]"
          {...register("accountNumber")}
          error={errors?.accountNumber?.message}
        />
        <div className="text-center w-[70%] mx-auto">
          <Input2
            icon={nairaIcon}
            label="Amount to Fund"
            name="amountToFund"
            inputType="text"
            placeholder="000-000-000"
            // backgroundInput="bg-[#f9fafb]"
            {...register("amountToFund")}
            error={errors?.amountToFund?.message}
          />
        </div>
     <div className=" mt-[16rem] md:mt-10" />
        <ActionButton
          type="submit"
          disabled={status === "loading"}
          sx={{
            marginTop: "1rem",
            fontWeight: "500",
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
  );
};

export default WithdrawFormSP;
