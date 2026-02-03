import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { step3Schema } from "../../../Schema/personalizeExperienceSchema";
import Input from "../../../Components/WebComponents/Input";
import ServiceCategory from "../../../Components/WebComponents/ServiceCategory";
import SelectDropDown from "../../../Components/WebComponents/SelectDropDown";
import Button from "../../../Components/WebComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../../redux/formStepsSlice";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import spinner from "../../../assets/Animations/spinner.json";
import { useNavigate } from "react-router-dom";
import { updateForm } from "../../../redux/updatePersonalizationForm";
import { getCurrentLocation } from "../../../Utils/locationGetter";
import { useMutation } from "@tanstack/react-query";
import { personalizeUser } from "../../../api/personalization";
import { useToast } from "../../../../hooks/useToast";
import Toast from "../../../Components/Toast";
import { buttonStatus as getButtonStatus } from "../../../Utils/updateStatus";

const Step3 = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(step3Schema),
  });
  const dispatch = useDispatch();
  const [location, setLocation] = useState({});
  const [status, setStatus] = useState("idle");

  const step1Data = useSelector(
    (state) => state.personalizationFormData.customerPersonalizationForm.step1
  );
  const step2Data = useSelector(
    (state) => state.personalizationFormData.customerPersonalizationForm.step2
  );
  const navigate = useNavigate();
  React.useEffect(() => {
    getCurrentLocation()
      .then((coords) => {
        console.log("Your location:", coords.latitude, coords.longitude);

        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      })
      .catch((err) => {
        console.error("Error getting location:", err.message);
      });
  }, []);

  const { toastMessage, toastRef, showToast } = useToast();

  const { mutate: personalize, isSuccess } = useMutation({
    mutationFn: (data) => personalizeUser(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      showToast(data.message || "Personalization successful");
      setStatus("success");
      setTimeout(() => {
        navigate("/customerAuth/account_personalize_successfully");
      }, 4000);
      console.log("Success in personalizing data", data);
    },
    onError: (error) => {
      console.log({ error });
      setStatus("error");
      showToast("Error occured");
    },
  });

  const faceImage = new File(["dummy content"], "Screenshot (10).png", {
    type: "image/png",
    lastModified: 1737614808811,
  });

  const onSubmit = async (data) => {
    dispatch(updateStep({ formKey: "personalizeAccountC", step: 3 }));
    dispatch(updateForm({ stepKey: "step2", data }));

    const payload = {
      birth_date: new Date(step1Data.dateOfBirth).toISOString().split("T")[0],
      preferred_categories: step1Data.selected.join(","),
      service_frequency: step1Data.serviceUsage,
      country: step2Data.country,
      living_state: step2Data.state,
      living_city: step2Data.city,
      house_address: step2Data.houseAddress,
      location_description: step2Data.locationDescription,
      wants_location_recommendation:
        step2Data.recommendations === "yes" ,
      service_preference: step2Data.serviceType,
      wants_discounts: step2Data.discountNdOffers === "yes",
      wants_reminders: data.reminders === "yes",
      wants_to_save_funds: data.saveFunds === "yes",
      latitude: location.latitude,
      longitude: location.longitude,
    };

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("face_image", faceImage);

    console.log(payload);

    personalize(formData);
    console.log("Form data", data);
  };

  const config = getButtonStatus({
    idleContent: "Done",
    loadingContent: "Processing...",
    successContent: "Personalization successful",
    errorContent: "Done",
  });

  const { content, style } = config[status];

  return (
    <div>
      <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
        {toastMessage}
      </Toast>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
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
        <SelectDropDown
          control={control}
          name="reminders"
          error={errors.reminders?.message}
          label={
            "Would you like reminders for your next beauty/grooming appointment?"
          }
          placeholder={"Select an option"}
          list={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        <SelectDropDown
          control={control}
          name="saveFunds"
          error={errors.saveFunds?.message}
          label={
            "Would you like to save funds for beauty/grooming services in your Ulooks?"
          }
          placeholder={"Select an option"}
          list={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />

        <div className="mt-10" />
        {/* <Button sx={{ width: "100%" }} type="submit">
          Continue
        </Button> */}
        <ActionButton
          type="submit"
          disabled={status === "loading"}
          sx={{
            marginTop: "1rem",
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
          )}{" "}
          {content}
        </ActionButton>
      </form>
    </div>
  );
};

export default Step3;
