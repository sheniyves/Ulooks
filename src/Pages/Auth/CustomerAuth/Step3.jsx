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
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [status, setStatus] = useState("idle");

  const step1Data = useSelector(
    (state) => state.personalizationFormData.customerPersonalizationForm.step1,
  );
  const step2Data = useSelector(
    (state) => state.personalizationFormData.customerPersonalizationForm.step2,
  );
  const navigate = useNavigate();
  React.useEffect(() => {
    getCurrentLocation()
      .then((coords) => {
        if (!coords?.latitude || !coords?.longitude) {
          throw new Error("Invalid location coordinates");
        }

        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        setIsLocationReady(true);
      })
      .catch((err) => {
        console.error("Error getting location:", err.message);

        setIsLocationReady(false);
      });
  }, []);

  const { toastMessage, toastRef, showToast } = useToast();
  console.log({ isLocationReady });

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
    console.log("Personalization data", data);
    if (!location) {
      showToast("Location not ready yet. Please wait...");
      return;
    }

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
      latitude: location.latitude,
      longitude: location.longitude,
      genderOfStylist: step2Data.genderOfStylist,
    };

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    formData.append("face_image", faceImage);

    personalize(formData);
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
      {/* <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      

      
      </form> */}
      {!isLocationReady && (
        <div className="bg-red/20 text-red p-6 shadow-sm rounded-xl mt-6">
          Location is not available, please wait.
        </div>
      )}
      <div className="mt-10" />
      <ActionButton
        type="submit"
        onClick={onSubmit}
        disabled={status === "loading" || !isLocationReady}
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
    </div>
  );
};

export default Step3;
