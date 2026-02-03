import React from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { updateStep } from "../../redux/formStepsSlice";
import user from "../../assets/Images/user.svg";
import Upload from "../../Pages/Auth/ServiceProviderAuth/Upload";
import Button from "./Button";
import { KycSchemaStep2, KycSchemaStep3 } from "../../Schema/KycSchema";
import PhoneNumberInput from "./PhoneInput";
import Input2 from "./Input2";
import SelectDropDown2 from "./SelectDropown2";
import PhoneNumberInput2 from "./PhoneInput2";
import { updateForm } from "../../redux/updateKyc";

const KYCStep3 = ({ setExample, useBaseColor = true }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(KycSchemaStep3),
    mode: "onTouched",
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("Form submitted for form 3", data);
    dispatch(updateStep({ formKey: "KYC", step: 4 }));
    dispatch(updateForm({ stepKey: "step3", data }));
  };
  const InputField = useBaseColor ? Input : Input2;
  const color = useBaseColor ? "text-darkPurple" : "text-orange_gold";
  const buttonColor = useBaseColor ? "#6A0DAD" : "#F79009";
  const buttonHoverColor = useBaseColor ? "#5a0a99" : "#dc7c06";
  const PhoneInputField = useBaseColor ? PhoneNumberInput : PhoneNumberInput2;

  return (
    <div className=" min-w-none md:min-w-[530px] mt-16">
      <h2 className={`font-fashion text-2xl ${color} `}>
        📞 Emergency Contact
      </h2>
      <form className="mt-4 mb-0 md:mb-10" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          icon={user}
          label="Full Name of Emergency Contact"
          name="emergencyContactName"
          inputType="text"
          placeholder="Enter the first and Last name here"
          {...register("emergencyContactName")}
          error={errors?.emergencyContactName?.message}
        />

        <InputField
          icon={user}
          label="Relationship to you"
          name="emergencyContactRelationship"
          inputType="text"
          placeholder="Enter the relationship"
          {...register("emergencyContactRelationship")}
          error={errors?.emergencyContactRelationship?.message}
        />

        <PhoneInputField
          control={control}
          error={errors?.phoneNumber?.message}
        />

        <div className="relative">
          <span className="absolute right-0 text-sm text-gray">Optional</span>
          <InputField
            icon={user}
            label="Emergency Contact Address"
            name="emergencyContactAddress"
            inputType="text"
            placeholder="Enter emergency contact address"
            {...register("emergencyContactAddress")}
            error={errors?.emergencyContactAddress?.message}
          />
        </div>

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

export default KYCStep3;
