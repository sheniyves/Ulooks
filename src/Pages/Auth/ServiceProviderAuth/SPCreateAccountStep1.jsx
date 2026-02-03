import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountForm } from "../../../Schema/customerCreateAccountForm";
import { useDispatch } from "react-redux";
import { updateStep } from "../../../redux/formStepsSlice";
import Button from "../../../Components/WebComponents/Button";
import user from "../../../assets/Images/user.svg";
import sms from "../../../assets/Images/sms.svg";
import guard from "../../../assets/Images/guard.svg";
import eyeSlash from "../../../assets/Images/eye-slash.svg";
import Input2 from "../../../Components/WebComponents/Input2";
import SelectDropDown2 from "../../../Components/WebComponents/SelectDropown2";
import PhoneNumberInput2 from "../../../Components/WebComponents/PhoneInput2";
import { Link } from "react-router-dom";
import { createAccountForm1 } from "../../../Schema/businessDetailsSchema";
import { updateForm } from "../../../redux/updateAccountCreationSP";

const SPCreateAccountStep1 = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createAccountForm1),
  });

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    dispatch(updateStep({ formKey: "createAccountSp", step: 2 }));

    dispatch(updateForm({ stepKey: "step1", data }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Input2
          icon={user}
          label={"Full Name"}
          name={"fullName"}
          inputType="text"
          placeholder={"Enter First and Last name here"}
          {...register("fullName")}
          error={errors?.fullName?.message}
        />
        <Input2
          icon={sms}
          name={"email"}
          inputType="email"
          label={"Email Address"}
          {...register("email")}
          error={errors?.email?.message}
          placeholder={"Enter your email address"}
        />
        <SelectDropDown2
          control={control}
          name="gender"
          error={errors.gender?.message}
          label={"Gender"}
          list={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "non_binary", label: "Non-binary" },
            { value: "prefer_not_to_say", label: "Prefer not to say" },
          ]}
        />
        <PhoneNumberInput2
          control={control}
          error={errors?.phoneNumber?.message}
        />
        <Input2
          rightIcon={eyeSlash}
          iconRight
          icon={guard}
          inputType={"password"}
          label={"Password"}
          placeholder={"Set a secure password"}
          {...register("password")}
          error={errors?.password?.message}
        />
        {/* <Input2
          rightIcon={eyeSlash}
          iconRight
          icon={guard}
          inputType={"password"}
          label={"Confirm Password"}
          placeholder={"Re-enter your password"}
          {...register("confirmPassword")}
          error={errors?.confirmPassword?.message}
        /> */}

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

export default SPCreateAccountStep1;
