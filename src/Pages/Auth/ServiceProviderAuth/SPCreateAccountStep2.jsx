import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { updateStep } from "../../../redux/formStepsSlice";
import Button from "../../../Components/WebComponents/Button";
import user from "../../../assets/Images/user.svg";
import arrowLocation from "../../../assets/Images/location.svg";
import Input2 from "../../../Components/WebComponents/Input2";
import SelectDropDown2 from "../../../Components/WebComponents/SelectDropown2";
import PhoneNumberInput2 from "../../../Components/WebComponents/PhoneInput2";
import { Link } from "react-router-dom";
import { createAccountFormStep2 } from "../../../Schema/businessDetailsSchema";
import { updateForm } from "../../../redux/updateAccountCreationSP";

const SPCreateAccountStep2 = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createAccountFormStep2),
  });

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    dispatch(updateStep({ formKey: "createAccountSp", step: 3 }));
    dispatch(updateForm({ stepKey: "step2", data }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Input2
          icon={user}
          label={"Business/Brand Name"}
          name={"businessName"}
          inputType="text"
          placeholder={"Enter the name of your Business"}
          {...register("businessName")}
          error={errors?.businessName?.message}
        />
        <SelectDropDown2
          control={control}
          name="serviceCategory"
          error={errors.serviceCategory?.message}
          label={"Service Category"}
          list={[
            { value: "harstyling", label: "Hairstyling" },
            { value: "makeup", label: "Makeup" },
            { value: "barbing", label: "Barbing" },
            { value: "spa_session", label: "SPA session" },
            {
              value: "beauty_and_grooming_services",
              label: "Beauty and grooming services",
            },
            { value: "special_service", label: "Special service" },
            {
              value: "hair_coloring_and_treatment",
              label: "Hair coloring and treatment",
            },
            { value: "laundry", label: "Laundry" },
          ]}
        />
        <SelectDropDown2
          control={control}
          name="serviceOperationType"
          error={errors.serviceOperationType?.message}
          label={"Service operation type"}
          list={[
            { value: "home_service", label: "Home service" },
            { value: "vist_office", label: "Visit office" },
            { value: "both", label: "Both" },
          ]}
        />
        {/* <SelectDropDown2
          control={control}
          name="yearsOfExperience"
          error={errors.yearsOfExperience?.message}
          label={"Years of Experience"}
          list={[
            { value: "2_to_3 years", label: "2 to 3 years" },
            { value: "4_to_5  years", label: "4 to 5 years" },
            { value: "over 5 years", label: "Over 5 years" },
          ]}
        /> */}

         <Input2
          icon={user}
          label={"Years of Experience"}
          name={"yearsOfExperience"}
          inputType="text"
          placeholder={"Enter your years of experience"}
          {...register("yearsOfExperience", {valueAsNumber: true})}
          error={errors?.yearsOfExperience?.message}
        />
        <Input2
          icon={arrowLocation}
          name={"businessLocation"}
          inputType="text"
          label={"Business Location"}
          {...register("businessLocation")}
          error={errors?.businessLocation?.message}
          placeholder={"Enter your shop's address"}
        />
        <Input2
          icon={arrowLocation}
          name={"localGovernmentOfBusiness"}
          inputType="text"
          label={"State and Local government of business"}
          {...register("localGovernmentOfBusiness")}
          error={errors?.localGovernmentOfBusiness?.message}
          placeholder={"Enter your shop's local govt. area"}
        />

        <Button
          type="submit"
          sx={{
            backgroundColor: "#F79009",
            width: "100%",
            color: "#fff",
            marginTop: "2.5rem",
            "&:hover": {
              backgroundColor: "#DB7F1A",
            },
          }}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default SPCreateAccountStep2;
