import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import arrowDownIcon from "../../assets/Images/arrow-down.svg?url";
import Error from "./Error";
import { Controller } from "react-hook-form";

export default function PhoneNumberInput2({ error, control, ...props }) {
  const border = error ?  "1px solid #e15771" : "1px solid #D0D5DD"
  const borderButton = error ?  "1px solid #e15771" : "1px solid #D0D5DD"
  const background = error ? "#fee4ee" : "transparent"
  const buttonStatus = error ? "#fee4ee" : "#F9FAFB"
  return (
    <div className="mb-4 relative">
      <span className="text-yellow_gold font-medium text-sm">Phone Number</span>
      <Controller
        name="phoneNumber"
        control={control}
        defaultValue={""}
        render={({ field }) => (
            <PhoneInput
              country={"ng"}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              inputStyle={{
                border: "none",
                marginLeft: "2rem",
                background: "transparent"
              }}
              containerStyle={{
                padding: ".5rem 0",
                borderRadius: ".5rem",
                border,
                background
              }}
              buttonStyle={{
                backgroundColor: "F9FAFB",
                borderRight: borderButton,
                padding: ".8rem",
                backgroundImage: `url(${arrowDownIcon})`,
                backgroundRepeat: "no-repeat",
                borderTopLeftRadius: ".5rem",
                borderBottomLeftRadius: ".5rem"
              }}
              dropdownStyle={{ zIndex: 9999 }}
              {...props}
            />
          )
        }
      />
      <Error error={error} />
    </div>
  );
}
