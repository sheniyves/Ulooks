import React from "react";
import userIcon from "../../assets/Images/user.svg";
import cardIcon from "../../assets/Images/cardPurple.svg";
import cardTick from "../../assets/Images/cardTick.svg";
import { Controller, useForm } from "react-hook-form";
import nairaIcon from "../../assets/Images//₦.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import ActionButton from "../SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import { withdrawschema } from "../../Schema/withdrawSchema";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import Input2 from "../WebComponents/Input2";
import SlideOption from "../SharedComponents/SlideOption";
import CheckListRadio from "../WebComponents/CheckListRadio";
import {
  daysOfWeek,
  options,
  options2,
} from "../../Pages/Auth/ServiceProviderAuth/Step2";
import PageTransition from "../SharedComponents/PageTransition";
import CustomTimeDuration from "../WebComponents/CustomTimeDuration";
import ServiceCategory from "../WebComponents/ServiceCategory";
import CheckList from "../WebComponents/CheckList";
import { setupProfile } from "../../Schema/setupProfileSchema";

const ManageAvailabilityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(setupProfile),
    defaultValues: {
      dayOfWeekAvailable: [],
      workTypes: [],
      timeType: "preset",
      workHourRange: "",
      customStartHour: undefined,
      customEndHour: undefined,
    },
  });

  const [status, setStatus] = React.useState("idle");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleTimeSelection = (index) => {
    setActiveIndex(index);

    if (index === 0) {
      setValue("timeType", "preset");
      setValue("customStartHour", undefined);
      setValue("customEndHour", undefined);
    } else {
      setValue("timeType", "custom");
      setValue("workHourRange", undefined);
    }
  };
  const buttonStatus = {
    idle: {
      content: "Update Availability",
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
      content: "Availability Updated",
      style: {
        backgroundColor: "#DC6803",
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
      //   navigate("/customerWebApp/emptyWallet");
    }, 4000);
    return () => clearTimeout(timer);
  };
  const { content, style } = buttonStatus[status];

  return (
    <div>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="dayOfWeekAvailable"
          control={control}
          render={({ field, fieldState }) => (
            <ServiceCategory
              categories={daysOfWeek}
              value={field.value}
              onChange={field.onChange}
              label={"What days of the week are you available"}
              error={fieldState.error}
              color="#F79009"
              textColor="text-yellow_gold"
              useSlice={false}
            />
          )}
        />
        <SlideOption
          setActiveIndex={handleTimeSelection}
          activeIndex={activeIndex}
          label={"Select available worktime"}
          options={["Pre-Set time frame", "Custom time frame"]}
        />
        <div className=" p-0 ">
          <PageTransition key={activeIndex}>
            {activeIndex === 0 ? (
              <Controller
                name="workHourRange"
                control={control}
                render={({ field, fieldState }) => (
                  <CheckListRadio
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    options={options}
                  />
                )}
              />
            ) : (
              <CustomTimeDuration register={register} errors={errors} />
            )}
          </PageTransition>
        </div>

        <Controller
          name="workTypes"
          control={control}
          render={({ field, fieldState }) => (
            <CheckList
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              options={options2}
              label={"Select work type"}
            />
          )}
        />

        <div className="mt-10" />
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

export default ManageAvailabilityForm;
