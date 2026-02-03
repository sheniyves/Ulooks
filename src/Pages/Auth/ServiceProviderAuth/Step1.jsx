import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../Components/WebComponents/Input";
import ServiceCategory from "../../../Components/WebComponents/ServiceCategory";
import SelectDropDown from "../../../Components/WebComponents/SelectDropDown";
import Button from "../../../Components/WebComponents/Button";
import { useDispatch } from "react-redux";
import { updateStep } from "../../../redux/formStepsSlice";
import arrowLocation from "../../../assets/Images/location.svg";
import SelectDropDown2 from "../../../Components/WebComponents/SelectDropown2";
import Input2 from "../../../Components/WebComponents/Input2";
import { updateSPForm } from "../../../redux/updatePersonalizationForm";
import house from "../../../assets/Images/house.svg";
import { z } from "zod";
import useCountryAndState from "../../../../hooks/useCountryAndState";

const Step1 = () => {
  const schemaRef = useRef(z.object({}));

  const resolverWrapper = useCallback((values, context, options) => {
    return zodResolver(schemaRef.current)(values, context, options);
  }, []);

  const form = useForm({
    resolver: resolverWrapper,
    defaultValues: {
      state: "",
      city: "",
      locationDescription: "",
      recommendations: "",
      serviceType: [],
      discountNdOffers: "",
      howDoYouWork: "Individual",
      preferableLocation: "Home",
      officeAddress: "",
    },
    mode: "onSubmit",
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const selectedCountry = watch("country");

  const {
    validStates,
    validCountries,
    isStatePending,
    isPending,
    subdivisionCount,
    getSelectedCountryCode,
  } = useCountryAndState(selectedCountry);

  useEffect(() => {
    const countryValues = validCountries?.map((c) => c.value) ?? [];
    const stateValues = validStates?.map((s) => s.value) ?? [];

    schemaRef.current = z.object({
      serviceType: z
        .array(z.number())
        .min(1, "Select at least one category")
        .default([]),

      howDoYouWork: z.enum(["Individual", "Group"], {
        required_error: "Select how you work",
      }),

      preferableLocation: z.enum(["Home", "Office", "both"], {
        required_error: "Select a preferable location",
      }),

      country:
        countryValues.length > 0
          ? z
              .enum(countryValues, { required_error: "Select your country" })
              .nullable()
              .refine((val) => val !== null && val !== "", {
                message: "Select your country",
              })
          : z.string().nullable().optional(),

      state:
        stateValues.length > 0
          ? z.enum(stateValues, { required_error: "Select your state" })
          : z.string().optional(),

      city:
        subdivisionCount > 0
          ? z.string().min(2, "Enter your location area")
          : z.string().optional(),

      officeAddress: z.string().min(2, "Enter LGA area"),
    });
  }, [validCountries, validStates, subdivisionCount]);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log("Step 1 form submitted", data);
    dispatch(updateStep({ formKey: "personalizeAccountSP", step: 2 }));
    dispatch(updateSPForm({ stepKey: "step1", data }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      {/* Service Type */}
      <Controller
        name="serviceType"
        control={control}
        render={({ field, fieldState }) => (
          <ServiceCategory
            value={field.value}
            onChange={field.onChange}
            label="What type of service do you offer"
            error={fieldState.error}
            color="#F79009"
            textColor="text-yellow_gold"
          />
        )}
      />

      {/* Work type */}
      <SelectDropDown2
        defaultValue="Individual"
        control={control}
        name="howDoYouWork"
        error={errors.howDoYouWork?.message}
        label="Do you work as an individual or as part of a business"
        list={[
          { value: "Individual", label: "Individual" },
          { value: "Group", label: "Group" },
        ]}
      />

      {/* Preferable location */}
      <SelectDropDown2
        defaultValue="Home"
        control={control}
        name="preferableLocation"
        error={errors.preferableLocation?.message}
        label="Where do you mostly offer your services"
        list={[
          { value: "Home", label: "Home" },
          { value: "Office", label: "Office" },
          { value: "both", label: "Both" },
        ]}
      />

      {/* Country */}
      <SelectDropDown2
        control={control}
        name="country"
        error={errors.country?.message}
        label="What country are you currently at?"
        placeholder="Select an option"
        list={validCountries}
        isListPending={isPending}
      />

      {/* State + City */}
      {getSelectedCountryCode && subdivisionCount > 0 && (
        <>
          {validStates?.length > 0 && (
            <SelectDropDown2
              control={control}
              name="state"
              error={errors.state?.message}
              label="What state are you currently living at?"
              placeholder="Select an option"
              list={validStates}
              isListPending={isStatePending}
            />
          )}

          <Input2
            icon={house}
            label="City"
            name="city"
            inputType="text"
            placeholder="Enter your current city"
            {...register("city")}
            error={errors?.city?.message}
          />
        </>
      )}

      {/* LGA */}
      <Input2
        icon={arrowLocation}
        name="officeAddress"
        inputType="text"
        label="Where is your shop located at"
        {...register("officeAddress")}
        error={errors?.officeAddress?.message}
        placeholder="Enter your shop Local Government Area"
      />

      <Button
        type="submit"
        sx={{
          backgroundColor: "#F79009",
          width: "100%",
          color: "#fff",
          marginTop: "2.5rem",
          "&:hover": { backgroundColor: "#dc7c06" },
        }}
      >
        Continue
      </Button>
    </form>
  );
};

export default Step1;
