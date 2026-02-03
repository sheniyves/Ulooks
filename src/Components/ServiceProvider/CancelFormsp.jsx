import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import ActionButton from "../SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import { cancelAppointmentsSchema } from "../../Schema/cancelAppointmentsSchema";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { reasons } from "../../data/reasons";
import Input from "../WebComponents/Input";
import ReasonRowssp from "./ReasonsRowsp";
import Input2 from "../WebComponents/Input2";

const CancelFormsp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(cancelAppointmentsSchema),
  });

  const reviewInText = watch("reasonInText");
  const [selectedReason, setSelectedReason] = React.useState([]);
  const [status, setStatus] = React.useState("idle");
  const navigate = useNavigate();

  const handleSelectReason = (Id) => {
    setSelectedReason((prev) =>
      prev.includes(Id) ? prev.filter((x) => x !== Id) : [...prev, Id]
    );
  };

  const isButtonReady =
    reviewInText?.trim().replace(/\s+/g, ",").length > 5 &&
    selectedReason.length > 0;

  const onSubmit = (data) => {
    console.log("Cancel service form submitted", data);
    //TODO: Send both data to as payload
    setStatus("loading");
    const timer = setTimeout(() => {
      setStatus("success");
    }, 4000);

    setTimeout(() => {
      navigate("/serviceProviderWebApp/serviceCancelledSuccessfully");
    }, 5000);
    return () => clearTimeout(timer);
  };

  const buttonStatus = {
    idle: {
      content: "Cancel Appointment",
      style: {
        backgroundColor: "#F04438",
        color: "#fff",
        cursor: "pointer",
      },
    },
    loading: {
      content: "Canceling...",
      style: {
        backgroundColor: "#EAEAEC",
        color: "#666",
        cursor: "not-allowed",
      },
    },
    success: {
      content: "Appointment Canceled",
      style: {
        backgroundColor: "#0ef01c",
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg text-yellow_gold font-medium mb-2 ">
        Please Let us know why you’re cancelling
      </p>
      <ul className="flex flex-col gap-y-4 mb-4">
        {reasons.map((reason) => (
          <ReasonRowssp
            details={reason}
            key={reason.id}
            onSelect={handleSelectReason}
            isSelected={selectedReason.includes(reason.id)}
          />
        ))}
      </ul>

      <Input2
        textArea
        label={"Write a more descriptive reason"}
        name={"reasonInText"}
        inputType="text"
        placeholder={"Type other reasons here"}
        {...register("reasonInText")}
        error={errors?.reasonInText?.message}
      />
      <ActionButton
        type="submit"
        // disabled={!isButtonReady}
        sx={{
          marginTop: "1rem",
          width: "100%",
          fontWeight: "500",
          backgroundColor: style.backgroundColor,
          color: style.color,
          cursor: style.cursor,
          "&:hover": {
            backgroundColor:
              status === "idle" ? "D9372C" : style.backgroundColor,
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
  );
};

export default CancelFormsp;
