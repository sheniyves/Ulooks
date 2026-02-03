import React from "react";
import Input2 from "./Input2";
import { useForm } from "react-hook-form";
import timer from "../../assets/Images/timer.svg";
import clock from "../../assets/Images/clock.svg";
const CustomTimeDuration = ({ register, errors }) => {
  return (
    <div>
      <Input2
        icon={clock}
        name={"customStartHour"}
        inputType="number"
        label={"Enter start time here"}
        {...register("customStartHour", { valueAsNumber: true })}
        error={errors?.customStartHour?.message}
        placeholder={"Enter time (HH:MM, 24-hour format)"}
      />

      <Input2
        icon={timer}
        name={"customEndHour"}
        inputType="number"
        label={"Enter closing time here "}
        {...register("customEndHour", { valueAsNumber: true })}
        error={errors?.customEndHour?.message}
        placeholder={"Enter time (HH:MM, 24-hour format)"}
      />
    </div>
  );
};

export default CustomTimeDuration;
