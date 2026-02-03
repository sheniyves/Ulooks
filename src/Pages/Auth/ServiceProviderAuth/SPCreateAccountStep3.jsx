import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../../redux/formStepsSlice";
import Button from "../../../Components/WebComponents/Button";
import user from "../../../assets/Images/user.svg";
import personalCard from "../../../assets/Images/personalcard.svg";
import bank from "../../../assets/Images/bank.svg";
import Input2 from "../../../Components/WebComponents/Input2";
import { Link, useNavigate } from "react-router-dom";
import { createAccountFormStep3 } from "../../../Schema/businessDetailsSchema";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import spinner from "../../../assets/Animations/spinner.json";
import { Checkbox } from "@mui/material";
import Lottie from "lottie-react";
import Error from "../../../Components/WebComponents/Error";
import { updateForm } from "../../../redux/updateAccountCreationSP";
import { useToast } from "../../../../hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { createUserAccount } from "../../../api/customerAuth";
import { setToLocalStorage } from "../../../Utils/presistStorage";
import { buttonStatus as getButtonStatus } from "../../../Utils/updateStatus";
import Toast from "../../../Components/Toast";

const SPCreateAccountStep3 = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createAccountFormStep3),
  });

  const step1Data = useSelector(
    (state) =>
      state.serviceProviderAccountCreation.serviceProviderCreateAccount.step1
  );
  const step2Data = useSelector(
    (state) =>
      state.serviceProviderAccountCreation.serviceProviderCreateAccount.step2
  );

  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const { toastMessage, toastRef, showToast } = useToast();

  const { mutate: createAccount, isSuccess } = useMutation({
    mutationKey: ["createServiceProviderAccount"],
    mutationFn: (data) => createUserAccount(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      console.log("Success data", data);
      setToLocalStorage("userSPData", {
        userId: data?.data?.data.id,
        email: data?.data?.data?.email,
      });
      showToast(data.message || "Account Created");

      setStatus("success");

      setTimeout(() => {
        navigate("/serviceProviderAuth/account_created_successfully");
      }, 4000);
    },
    onError: () => {
      setStatus("error");
      showToast("Error occurred");
    },
  });

  const config = getButtonStatus({
    idleContent: "Sign Up",
    loadingContent: "Creating Account...",
    successContent: "Account Created",
    errorContent: "Something went wrong",

    idleStyle: { backgroundColor: "#F79009", color: "#fff" },
    errorStyle: { backgroundColor: "#F79009", color: "#fff" },
    successStyle: { backgroundColor: "#F79009", color: "#fff" },
  });

  const { content, style } = config[status];

  const onSubmit = (data) => {
    const payload = {
      email: step1Data.email,
      full_name: step1Data.fullName,
      password: step1Data.password,
      phone_number: `+${step1Data.phoneNumber}`,
      gender: step1Data.gender,
      role: "service_provider",
      brand_name: step2Data.businessName,
      service_category: step2Data.serviceCategory,
      service_operation_type: step2Data.serviceOperationType,
      years_of_experience: step2Data.yearsOfExperience,
      office_address: step2Data.businessLocation,
      bank_account_number: data.bankAccountNumber,
      bank_name: data.bankName,
    };
    console.log({ payload });
    createAccount(payload);
  };
  return (
    <div>
      <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
        {toastMessage}
      </Toast>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Input2
          icon={user}
          label={"Bank Account Number"}
          name={"bankAccountNumber"}
          inputType="text"
          placeholder={"Enter bank account number here"}
          {...register("bankAccountNumber")}
          error={errors?.bankAccountNumber?.message}
        />
        <Input2
          icon={bank}
          label={"Bank Name"}
          name={"bankName"}
          inputType="text"
          placeholder={"Enter your bank's name here"}
          {...register("bankName")}
          error={errors?.bankName?.message}
        />
        {/* <Input2
          icon={personalCard}
          label={"BVN number"}
          name={"bvnNumber"}
          inputType="text"
          placeholder={"Enter your bank's name here"}
          {...register("bvnNumber")}
          error={errors?.bvnNumber?.message}
        /> */}
        <div className="relative mb-8">
          <div className="my-6 flex items-center gap-4">
            <div className="border-2 w-6 h-6 rounded-[.3rem] flex items-center justify-center border-[#F79009]">
              <Controller
                name="agreedToTerms"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={field.value}
                    aria-label="Checkbox"
                    sx={{
                      color: "#F79009",
                      "&.Mui-checked": {
                        color: "#F79009",
                      },
                    }}
                  />
                )}
              />
            </div>
            <p className="text-yellow-gold text-sm font-bold ">
              By creating an account with us, you agree to our{" "}
              <Link className="text-yellow_gold hover:underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link className="text-yellow_gold hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
          <Error error={errors?.agreedToTerms?.message} />
        </div>
        <ActionButton
          type="submit"
          disabled={status === "loading"}
          sx={{
            ...style,
            width: "100%",
            marginTop: "2.5rem",
            "&:hover": {
              backgroundColor:
                status === "idle" ? "#DB7F1A" : style.backgroundColor,
            },
          }}
        >
          {status === "loading" && (
            <Lottie
              size={20}
              className="w-6"
              animationData={spinner}
              loop={true}
            />
          )}{" "}
          {content}
        </ActionButton>
      </form>
    </div>
  );
};

export default SPCreateAccountStep3;
