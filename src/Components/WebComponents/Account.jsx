import React from "react";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import ProfileUpload from "../SharedComponents/ProfileUpload";
import { useForm } from "react-hook-form";
import Input from "./Input";
import sms from "../../assets/Images/sms.svg";
import user from "../../assets/Images/user.svg";
import SelectDropDown from "./SelectDropDown";
import PhoneNumberInput from "./PhoneInput";
import ActionButton from "../SharedComponents/ActionButton";
import spinner from "../../assets/Animations/spinner.json";
import Lottie from "lottie-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "../../Schema/accountEditSchema";
import { getFromLocalStorage } from "../../Utils/presistStorage";
import { editUserProfile, userProfile } from "../../api/profile";
import { useMutationFn, useQueryFn } from "../../../hooks/queryFn";
import { showToast } from "../../Utils/updateStatus";
import { useToast } from "../../../hooks/useToast";
import Toast from "../Toast";
import { useQueryClient } from "@tanstack/react-query";

const Account = ({ drawerRef, data }) => {
  const [status, setStatus] = React.useState("idle");
  const { name, email, phone_number, gender } = getFromLocalStorage(
    "customerData",
    "User",
  );
  const queryClient= useQueryClient()
  const { toastMessage, toastRef, showToast } = useToast();
  const buttonStatus = {
    idle: {
      content: "Save Changes",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "pointer",
      },
    },
    loading: {
      content: "Saving Changes...",
      style: {
        backgroundColor: "#EAEAEC",
        color: "#666",
        cursor: "not-allowed",
      },
    },
    success: {
      content: "Submitted Successfully",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "default",
      },
    },
    error: {
      content: "Something went wrong",
      style: {
        backgroundColor: "#D32F2F",
        color: "#fff",
        cursor: "default",
      },
    },
  };

  const { mutate: editProfile, isSuccess } = useMutationFn({
    fun: (data) => editUserProfile(data),
    key: ["editProfile"],
    onSuccess: (data) => {
      setStatus("success");
      showToast(data.message || "Profile edited!", 2000);
      queryClient.invalidateQueries(["userProfile"])
      setTimeout(() => {
        drawerRef.current?.closeDrawer();
      }, 2000);

      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    },
    onError: (error) => {
      setStatus("error");
      const errorCode = error.response?.data?.statusCode;

      if (errorCode === 404) {
        showToast("User not found");
        return;
      }
      showToast("Error occurred");
    },
  });

  const { content, style } = buttonStatus[status];
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      state: data.state,
      city: data.city,
      address: data.address,
      phoneNumber: data.phone_number,
    },
  });
  const onSubmit = (data) => {
    setStatus("loading");

    const { phoneNumber, state, city, address } = data;
    const payload = {
      phone_number: phoneNumber,
      state,
      city,
      address,
    };

    editProfile(payload);
  };

  return (
    <div>
      <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
        {toastMessage}
      </Toast>
      <DrawerHeader drawerRef={drawerRef} title={"Account"} />
      <div className="flex flex-col items-center justify-center h-full">
        <ProfileUpload drawerRef={drawerRef} />
        <div className="text-center">
          <h2 className="font-fashion capitalize mt-4 mb-2 font-bold  text-[1.75rem] text-[#6A0DAD]">
            {name}
          </h2>
          <p className="text-darkPurple font-semibold text-lg text-center  max-w-[46rem]">
            {email}
          </p>
          <p className="text-darkPurple font-semibold text-lg text-center max-w-[46rem]">
            {phone_number}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mt-6 w-full flex-col max-w-[95%] md:max-w-[85%]"
        >
          <div className="bg-gray shadow-sm rounded-lg p-4 md:p-10 mb-6">
            <Input
              icon={user}
              name={"fullName"}
              inputType="text"
              textColor={"text-gray/80"}
              value={name || "John Doe"}
              disabled
              label={"Full Name"}
              {...register("fullName")}
              error={errors?.fullName?.message}
            />
            <Input
              icon={sms}
              name={"email"}
              value={email || "johndoe@gmail.com"}
              disabled
              textColor={"text-gray/80"}
              inputType="email"
              label={"Email Address"}
              {...register("email")}
              error={errors?.email?.message}
            />
            <Input
              icon={user}
              name={"gender"}
              value={gender || "N/A"}
              disabled
              textColor={"text-gray/80"}
              inputType="text"
              label={"Gender"}
              {...register("gender")}
              error={errors?.gender?.message}
            />

            <p className="text-sm text-gray text-right">
              These Fields can't be edited.
            </p>
          </div>

          <PhoneNumberInput
            control={control}
            error={errors?.phoneNumber?.message}
          />
          <Input
            leftIcon={false}
            name={"state"}
            inputType="text"
            label={"State"}
            {...register("state")}
            error={errors?.state?.message}
            placeholder={"Enter your current state"}
          />
          <Input
            leftIcon={false}
            name={"city"}
            inputType="text"
            label={"City"}
            {...register("city")}
            error={errors?.city?.message}
            placeholder={"Enter your current city"}
          />
          <Input
            leftIcon={false}
            name={"address"}
            inputType="text"
            label={"Address"}
            {...register("address")}
            error={errors?.address?.message}
            placeholder={"Enter your current address"}
          />
          <div className="mt-6" />
          <ActionButton
            type="submit"
            disabled={status === "loading"}
            padding="1rem"
            sx={{
              ...style,
              width: "100%",
              "&:hover": {
                backgroundColor:
                  status === "idle" ? "#5a0a99" : style.backgroundColor,
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
            )}
            {content}
          </ActionButton>
        </form>
      </div>
    </div>
  );
};

export default Account;
