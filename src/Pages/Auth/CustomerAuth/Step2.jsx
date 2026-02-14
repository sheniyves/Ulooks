import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import house from "../../../assets/Images/house.svg";
import Input from "../../../Components/WebComponents/Input";
import SelectDropDown from "../../../Components/WebComponents/SelectDropDown";
import Button from "../../../Components/WebComponents/Button";
import { useDispatch } from "react-redux";
import { updateStep } from "../../../redux/formStepsSlice";
import useCountryAndState from "../../../../hooks/useCountryAndState";
import { z } from "zod";
import { updateForm } from "../../../redux/updatePersonalizationForm";

const Step2 = () => {
  const dispatch = useDispatch();

  const schemaRef = useRef(z.object({}));

  const resolverWrapper = useCallback((values, context, options) => {
    return zodResolver(schemaRef.current)(values, context, options);
  }, []);

  const form = useForm({
    resolver: resolverWrapper,
    defaultValues: {
      country: "",
      state: "",
      city: "",
      houseAddress: "",
      locationDescription: "",
    },
    mode: "onSubmit",
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
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

  const countryValues = validCountries?.map((c) => c.value) ?? [];
  const stateValues = validStates?.map((s) => s.value) ?? [];

  const step2Schema = useMemo(() => {
    if (countryValues.length === 0) {
      return z.object({
        country: z.string().nullable().optional(),
        state: z.string().nullable().optional(),
        city: z.string().nullable().optional(),
        houseAddress: z.string().min(5, "Enter your home address"),
        locationDescription: z
          .string()
          .min(5, "Give a brief description about home address"),
        genderOfStylist: z.enum(
          ["male", "female", "others", "not_gender_specific"],
          {
            errorMap: () => ({ message: "Select your preference" }),
          },
        ),
      });
    }

   
    const countrySchema = z
      .enum(countryValues.length > 0 ? countryValues : ["dummy"])
      .refine((val) => val !== "", { message: "Select your country" });

    const stateSchema =
      subdivisionCount > 0 && stateValues.length > 0
        ? z
            .enum(stateValues)
            .nullable()
            .refine((val) => val !== null, {
              message: "Select a state you live in",
            })
        : z.string().nullable().optional();

    const citySchema =
      subdivisionCount > 0
        ? z.string().min(2, "Enter your city")
        : z.string().nullable().optional();

  return z.object({
    country: countrySchema,
    state: stateSchema,
    city: citySchema,
    houseAddress: z.string().min(5, "Enter your home address"),
    locationDescription: z
      .string()
      .min(5, "Give a brief description about home address"),
    genderOfStylist: z.enum(["male", "female", "others", "not_gender_specific"], {
      errorMap: () => ({ message: "Select your preference" }),
    }),
  });
  }, [countryValues, stateValues, subdivisionCount]);

  useEffect(() => {
    schemaRef.current = step2Schema;
  }, [step2Schema]);

  useEffect(() => {
    if (!getSelectedCountryCode) {
      setValue("state", null);
      setValue("city", "");
      return;
    }

    if (subdivisionCount === 0) {
      setValue("state", null);
      setValue("city", "");
    }
  }, [getSelectedCountryCode, subdivisionCount, setValue]);


  const onSubmit = (data) => {
    console.log("Step 2 form submitted", data);
    dispatch(updateStep({ formKey: "personalizeAccountC", step: 3 }));
    dispatch(updateForm({ stepKey: "step2", data }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <SelectDropDown
          control={control}
          name="country"
          error={errors.country?.message}
          label="What country are you currently at?"
          placeholder="Select an option"
          list={validCountries}
          isListPending={isPending}
        />

        {getSelectedCountryCode && subdivisionCount > 0 && (
          <>
            {validStates?.length > 0 && (
              <SelectDropDown
                control={control}
                name="state"
                error={errors.state?.message}
                label="What state are you currently living at?"
                placeholder="Select an option"
                list={validStates}
                isListPending={isStatePending}
              />
            )}

            <Input
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

        <Input
          icon={house}
          label="House Address"
          name="houseAddress"
          inputType="text"
          placeholder="Enter your current house address"
          {...register("houseAddress")}
          error={errors?.houseAddress?.message}
        />

        <Input
          icon={house}
          textArea
          label="Brief House location and description - for Home services"
          name="locationDescription"
          inputType="text"
          placeholder="Brief house description"
          {...register("locationDescription")}
          error={errors?.locationDescription?.message}
        />
        <SelectDropDown
          control={control}
          name="genderOfStylist"
          error={errors.genderOfStylist?.message}
          label={"Do you prefer a specific stylist gender?"}
          placeholder={"Select an option"}
          list={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "others", label: "Others" },
            { value: "not_gender_specific", label: "Not gender specific" },
          ]}
          //   defaultValue="male"
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

export default Step2;
