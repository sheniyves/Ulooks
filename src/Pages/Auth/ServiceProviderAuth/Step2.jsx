import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { step2SchemaSP } from "../../../Schema/personalizeExperienceSchema";
import ServiceCategory from "../../../Components/WebComponents/ServiceCategory";
import Button from "../../../Components/WebComponents/Button";
import { useDispatch } from "react-redux";
import { updateStep } from "../../../redux/formStepsSlice";
import SelectDropDown2 from "../../../Components/WebComponents/SelectDropown2";
import SlideOption from "../../../Components/SharedComponents/SlideOption";
import CheckListRadio from "../../../Components/WebComponents/CheckListRadio";
import CheckList from "../../../Components/WebComponents/CheckList";
import CustomTimeDuration from "../../../Components/WebComponents/CustomTimeDuration";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import { updateSPForm } from "../../../redux/updatePersonalizationForm";

const Step2 = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(step2SchemaSP),
    defaultValues: {
      travelDistance: "Within area",
      workingHoursType: "flexible working hours",
      dayOfWeekAvailable: [],
      workTypes: [],
      timeType: "preset",
      workHourRange: "Work all day",
      customStartHour: undefined,
      customEndHour: undefined,
    },
  });
  const dispatch = useDispatch();
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

  const onSubmit = (data) => {
    console.log("Step 2 form submitted", data);
    dispatch(updateStep({ formKey: "personalizeAccountSP", step: 3 }));
    dispatch(updateSPForm({ stepKey: "step2", data }));
  };
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <SelectDropDown2
          defaultValue={"Within area"}
          control={control}
          name="travelDistance"
          error={errors.travelDistance?.message}
          label={"How far are you willing to travel for home services?"}
          list={[
            { value: "Within area", label: "Within Area" },
            { value: "Outside area", label: "Outside Area" },
          ]}
        />
        <SelectDropDown2
          defaultValue={"flexible working hours"}
          control={control}
          name="workingHoursType"
          error={errors.workingHoursType?.message}
          label={"Do you have working hours or are you flexible?"}
          list={[
            {
              value: "yes",
              label: "Yes",
            },
            { value: "no", label: "No" },
          ]}
        />
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

        <Button
          type="submit"
          sx={{
            backgroundColor: "#F79009",
            width: "100%",
            color: "#fff",
            marginTop: "2.5rem",
            "&:hover": {
              backgroundColor: "#dc7c06",
            },
          }}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default Step2;

export const daysOfWeek = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

export const options = [
  "Work all day",
  "6:00AM - 6: 00PM",
  "9:00AM - 5:00PM",
  "10:00AM - 4:00PM",
];

export const options2 = ["Shop", "Home services", "Events"];
