import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import user from "../../assets/Images/user.svg";
import calendar from "../../assets/Images/calendar.svg";
import sms from "../../assets/Images/sms.svg";
import SelectDropDown from "./SelectDropDown";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../redux/formStepsSlice";
import Input2 from "./Input2";
import SelectDropDown2 from "./SelectDropown2";
import { updateForm } from "../../redux/updateKyc";
import { useQuery } from "@tanstack/react-query";
import { countriesFetch } from "../../api/customerAuth";
import { z } from "zod";

const KYCStep1 = ({ useBaseColor = true }) => {
  const InputField = useBaseColor ? Input : Input2;
  const SelectField = useBaseColor ? SelectDropDown : SelectDropDown2;
  const color = useBaseColor ? "text-darkPurple" : "text-orange_gold";
  const descColor = useBaseColor ? "text-darkerPurple" : "text-yellow_gold";
  const buttonColor = useBaseColor ? "#6A0DAD" : "#F79009";
  const buttonHoverColor = useBaseColor ? "#5a0a99" : "#dc7c06";

  const { data: countriesData, isPending } = useQuery({
    queryKey: ["countries"],
    queryFn: countriesFetch,
  });

  const validCountries = countriesData?.data.countries?.map((q) => ({
    country_code1: q.alpha_2,
    country_code2: q.alpha_3,
    value: q.name.toLowerCase(),
    label: q.name,
  }));

  const countryValues = validCountries?.map((c) => c.value) ?? [];

  const KycSchemaStep1 = z.object({
    fullName: z.string().min(2, "Full name is required"),
    // country: z.enum(countryValues, {
    //   required_error: "Select your country",
    //   invalid_type_error: "Country needs to be selected"
    // }),
    phoneNumber: z.string().min(11, "Phone number is required"),
    gender: z.enum(["male", "female"], {
      required_error: "Select your gender",
    }),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
  });
  const step1Data = useSelector((state) => state.kycData.customerKycForm.step1);
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm({
    resolver: zodResolver(KycSchemaStep1),
    defaultValues: {
      fullName: step1Data.fullName,
      phoneNumber: step1Data.phoneNumber,
      dateOfBirth: step1Data.dateOfBirth,
      gender: step1Data.gender,
      email: step1Data.email,
      country: step1Data.country
    }
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log("Form submitted for step 1", data);
    dispatch(updateStep({ formKey: "KYC", step: 2 }));
    dispatch(updateForm({ stepKey: "step1", data }));
  };
  return (
    <div>
      <h2 className={`font-fashion text-2xl ${color}`}>
        KYC Verification For your safety and Trust
      </h2>
      <p className={` font-medium ${descColor}`}>
        To ensure a secure experience for everyone on Ulooks, we require a few
        important details to verify your identity. This helps protect both
        customers and service providers during appointments, especially for home
        services
      </p>
      <h2 className={`font-fashion text-[1.755rem] ${color} my-2`}>
        📝 Personal Details
      </h2>
      <span className="text-sm text-[#98A2B3] font-normal">
        Please cross check if the details are correct, if not correct them.
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-0 md:mb-10">
        <InputField
          icon={user}
          label={"Full Name"}
          name={"fullName"}
          inputType="text"
          placeholder={"Enter your full name here"}
          {...register("fullName")}
          error={errors?.fullName?.message}
        />
        <InputField
          icon={user}
          label={"Phone number"}
          name={"phoneNumber"}
          inputType="text"
          placeholder={"Enter your phone number here"}
          {...register("phoneNumber")}
          error={errors?.phoneNumber?.message}
        />
        <InputField
          icon={calendar}
          label={"Date of Birth"}
          name={"dateOfBirth"}
          inputType="text"
          placeholder={"Enter your date of birth here"}
          {...register("dateOfBirth")}
          error={errors?.dateOfBirth?.message}
        />
        <SelectField
          control={control}
          name="gender"
          defaultValue={"male"}
          error={errors.gender?.message}
          label={"Your Gender"}
          placeholder={"Select an option"}
          list={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <InputField
          icon={sms}
          label={"Email Address"}
          name={"email"}
          inputType="email"
          placeholder={"Enter email email here"}
          {...register("email")}
          error={errors?.email?.message}
        />
        <SelectDropDown
          defaultValue={null}
          control={control}
          name="country"
          error={errors.country?.message}
          label="What country are you currently at?"
          placeholder="Select an option"
          list={validCountries}
          isListPending={isPending}
        />
        <Button
          type="submit"
          backgroundColor={buttonColor}
          sx={{
            width: "100%",
            marginTop: "2.5rem",
            marginInline: "auto",
            "&:hover": {
              backgroundColor: { buttonHoverColor },
            },
          }}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default KYCStep1;
