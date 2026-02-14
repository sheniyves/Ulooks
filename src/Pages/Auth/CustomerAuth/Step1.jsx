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
import { useQueryFn } from "../../../../hooks/queryFn";
import { serviceCategory } from "../../../api/personalization";
import { normalize } from "../../../Utils/formattingFunction";
import { CircularProgress } from "@mui/material";

const Step1 = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm({
    resolver: zodResolver(step1Schema),
    // defaultValues: {
    //   serviceUsage: [],
    // },
  });
  const dispatch = useDispatch();

  const { data, isError, isPending } = useQueryFn({
    key: ["userCategories"],
    fun: serviceCategory,
    onError: (error) => {
      console.error({ error });
    },
  });

  console.log({ data });
  const categories = data?.data?.map((item) => ({
    value: normalize(item.name),
    label: item.name,
  }));

  const selected = watch("selected");
  const serviceUsage = watch("serviceUsage");
  console.log({ serviceUsage, selected });

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
        {isError ? (
          <div className="bg-red/20 p-6 rounded-lg text-red shadow-sm">
            Error occured in fetching categories.
          </div>
        ) : isPending ? (
          <div className="flex items-center gap-2 bg-slate-100 text-slate-500 text-inherit p-6 rounded-lg shadow-sm">
            Fetching categories
            <CircularProgress size={12} />
          </div>
        ) : (
          <Controller
            name="selected"
            control={control}
            render={({ field, fieldState }) => (
              <ServiceCategory
                label={"Prefered service Category"}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
                categories={categories}
              />
            )}
          />
        )}

        <SelectDropDown
          control={control}
          name="serviceUsage"
          error={errors.serviceUsage?.message}
          label={"How often do you use these services?"}
          placeholder={"Select an option"}
          list={[
            { value: "weekly", label: "Weekly" },
            { value: "bi_weekly", label: "Bi-Weekly" },
            { value: "monthly", label: "Monthly" },
            { value: "ocassionally", label: "Ocassionally" },
            { value: "rarely", label: "Rarely" },
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
