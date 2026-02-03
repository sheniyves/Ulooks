import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { step1Schema } from "../../../Schema/personalizeExperienceSchema";
import calendar from "../../../assets/Images/calendar.svg";
import Input from "../../../Components/WebComponents/Input";
import ServiceCategory from "../../../Components/WebComponents/ServiceCategory";
import SelectDropDown from "../../../Components/WebComponents/SelectDropDown";
import Button from "../../../Components/WebComponents/Button";
import { useDispatch } from "react-redux";
import { updateStep } from "../../../redux/formStepsSlice";
import { updateForm } from "../../../redux/updatePersonalizationForm";

const Step1 = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(step1Schema),
    // defaultValues: {
    //   serviceUsage: [],
    // },
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log("Step 1 form submitted", data);
    dispatch(updateStep({ formKey: "personalizeAccountC", step: 2 }));
   dispatch(updateForm({ stepKey: "step1", data }));

  };
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Input
          icon={calendar}
          label={"Date of Birth"}
          name={"dateOfBirth"}
          inputType="text"
          placeholder={"Enter your date of birth here"}
          {...register("dateOfBirth")}
          error={errors?.dateOfBirth?.message}
        />

        <Controller
          name="selected"
          control={control}
          render={({ field, fieldState }) => (
            <ServiceCategory
              label={"Prefered service Category"}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error}
            />
          )}
        />
        <SelectDropDown
          control={control}
          name="serviceUsage"
          error={errors.serviceUsage?.message}
          label={"How often do you use these services?"}
          placeholder={"Select an option"}
          list={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
            { value: "not_very_often", label: "Not very often" },
          ]}
        />

        <Button
          type="submit"
          sx={{
            backgroundColor: "#6A0DAD",
            width: "100%",
            color: "#fff",
            marginTop: "2.5rem",
            "&:hover": {
              backgroundColor: "#5a0a99",
            },
          }}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default Step1;
