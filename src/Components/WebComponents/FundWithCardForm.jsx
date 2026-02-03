import React from "react";
import Input from "./Input";
import userIcon from "../../assets/Images/user.svg";
import cardIcon from "../../assets/Images/cardPurple.svg";
import cardTick from "../../assets/Images/cardTick.svg";
import calendarIcon from "../../assets/Images/calendar.svg";
import nairaIcon from "../../assets/Images//₦.svg";
import { useForm } from "react-hook-form";
import { cardSchema } from "../../Schema/cardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { isCardDetailsSubmitted } from "../../redux/addFundsSlice";

const FundWithCardForm = ({ isActive, buttonRef }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(cardSchema),
  });
const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(isCardDetailsSubmitted(true))
     reset()
    console.log("Card form submitted", data);
  };

  React.useEffect(() => {
    if (!isActive) reset();
  }, [isActive, reset]);

  return (
    <motion.div
      className={`${!isActive ? " hidden md:inline-block" : "inline-block"}`}
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0.6,
        padding: isActive ? "0rem" : "1rem",
        pointerEvents: isActive ? "auto" : "none",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          icon={userIcon}
          label={"Card Holder's Name"}
          name={"cardName"}
          inputType="text"
          placeholder={"Type your name in correct order"}
          backgroundInput="bg-[#f9fafb]"
          {...register("cardName")}
          error={errors?.cardName?.message}
          readOnly={!isActive}
        />
        <Input
          icon={cardIcon}
          label={"Card Number"}
          name={"cardNumber"}
          inputType="text"
          placeholder={"Type your card number"}
          backgroundInput="bg-[#f9fafb]"
          {...register("cardNumber")}
          error={errors?.cardNumber?.message}
          readOnly={!isActive}
        />
        <Input
          icon={cardTick}
          label={"Account Number"}
          name={"accountNumber"}
          inputType="text"
          placeholder={"Type in the account number"}
          backgroundInput="bg-[#f9fafb]"
          {...register("accountNumber")}
          error={errors?.accountNumber?.message}
          readOnly={!isActive}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4">
          <Input
            icon={calendarIcon}
            label={"Expiration Date"}
            name={"expirationDate"}
            inputType="text"
            placeholder={"MM/YY"}
            backgroundInput="bg-[#f9fafb]"
            {...register("expirationDate")}
            error={errors?.expirationDate?.message}
            readOnly={!isActive}
          />
          <Input
            icon={cardIcon}
            label={"CVV"}
            name={"cvv"}
            inputType="text"
            placeholder={"###"}
            backgroundInput="bg-[#f9fafb]"
            {...register("cvv")}
            error={errors?.cvv?.message}
            readOnly={!isActive}
          />
        </div>
        <div className=" text-left sm:text-center w-full w-[100%] sm:w-[70%] mx-auto ">
          <Input
            icon={nairaIcon}
            label={"Amount to Fund"}
            name={"amountToFund"}
            inputType="text"
            placeholder={"000-000-000"}
            backgroundInput="bg-[#f9fafb]"
            {...register("amountToFund")}
            error={errors?.amountToFund?.message}
            readOnly={!isActive}
          />
        </div>
        <button ref={buttonRef} className="hidden" type="submit"></button>
      </form>
    </motion.div>
  );
};

export default FundWithCardForm;
