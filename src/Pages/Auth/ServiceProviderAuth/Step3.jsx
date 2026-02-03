import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { step3SchemaSP } from "../../../Schema/personalizeExperienceSchema";
import Button from "../../../Components/WebComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../../redux/formStepsSlice";
import SelectDropDown2 from "../../../Components/WebComponents/SelectDropown2";
import Upload from "./Upload";
import Input2 from "../../../Components/WebComponents/Input2";
import { motion } from "framer-motion";
import { getCurrentLocation } from "../../../Utils/locationGetter";
import { useToast } from "../../../../hooks/useToast";
import Toast from "../../../Components/Toast";
import { buttonStatus as getButtonStatus } from "../../../Utils/updateStatus";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { personalizeServiceProvider } from "../../../api/personalization";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import spinner from "../../../assets/Animations/spinner.json";

const Step3 = () => {
  const {
    watch,
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(step3SchemaSP),
  });

  const dispatch = useDispatch();
  const uploadCertificateRef = React.useRef(null);
  const uploadBusinessImageRef = React.useRef(null);
  const [location, setLocation] = useState({});
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  // Generic upload handler for both files
  const handleUpload = (ref) => () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const step1Data = useSelector(
    (state) =>
      state.personalizationFormData.serviceProviderPersonalizationForm.step1
  );
  const step2Data = useSelector(
    (state) =>
      state.personalizationFormData.serviceProviderPersonalizationForm.step2
  );

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
    mutationFn: (data) => personalizeServiceProvider(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      showToast(data.message || "Personalization successful");
      setStatus("success");
      setTimeout(() => {
        navigate("/serviceProviderAuth/account_personalize_successfully");
      }, 4000);
      console.log("Success in personalizing data", data);
    },
    onError: (error) => {
      console.log({ error });
      setStatus("error");
      showToast("Error occured");
    },
  });

 const onSubmit = (data) => {
  console.log("Step 3 form submitted", data);
  dispatch(updateStep({ formKey: "personalizeAccountSP", step: 3 }));

  const mapWorkHourRange = (range) => {
    switch (range) {
      case "Work all day":
        return { start: "00:00", end: "24:00" };
      case "6:00AM - 6:00PM":
        return { start: "06:00", end: "18:00" };
      case "9:00AM - 5:00PM":
        return { start: "09:00", end: "17:00" };
      case "10:00AM - 4:00PM":
        return { start: "10:00", end: "16:00" };
      default:
        return { start: "09:00", end: "17:00" };
    }
  };

  const { start, end } = step2Data.workHourRange
    ? mapWorkHourRange(step2Data.workHourRange)
    : {
        start: step2Data.customStartHour
          ? `${step2Data.customStartHour.toString().padStart(2, "0")}:00`
          : "09:00",
        end: step2Data.customEndHour
          ? `${step2Data.customEndHour.toString().padStart(2, "0")}:00`
          : "17:00",
      };

  const certificateImage =
    data.certificateImage instanceof FileList
      ? data.certificateImage[0]
      : data.certificateImage;

  const businessLogo =
    data.businessLogo instanceof FileList
      ? data.businessLogo[0]
      : data.businessLogo;

  const faceImage = new File(["dummy content"], "face.png", {
    type: "image/png",
  });

  const payload = {
    business_type: step1Data.serviceType.join(","),
    country: step1Data.country,
    state: step1Data.state,
    city: step1Data.city,
    address: step1Data.officeAddress,
    latitude: location.latitude,
    longitude: location.longitude,
    travel_distance_km: 3,
    is_schedule_flexible: step2Data.workingHoursType === "yes",
    available_days: step2Data.dayOfWeekAvailable.join(","),
    work_start_time: start,
    work_end_time: end,
    has_certification: data.haveAnyCertificate === "yes",
    business_bio: data.businessBio,
  };

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  if (certificateImage) formData.append("cert_image", certificateImage);
  if (businessLogo) formData.append("business_logo", businessLogo);
  if (faceImage) formData.append("face_image", faceImage);

  console.log("Final FormData being sent:", [...formData.entries()]);
  personalize(formData);
};


  const config = getButtonStatus({
    idleContent: "Done",
    loadingContent: "Processing...",
    successContent: "Personalization successful",
    errorContent: "Done",

    idleStyle: { backgroundColor: "#F79009", color: "#fff" },
    errorStyle: { backgroundColor: "#F79009", color: "#fff" },
    successStyle: { backgroundColor: "#F79009", color: "#fff" },
  });

  const { content, style } = config[status];

  return (
    <div>
      <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
        {toastMessage}
      </Toast>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <SelectDropDown2
          defaultValue={"yes"}
          control={control}
          name="haveAnyCertificate"
          error={errors.haveAnyCertificate?.message}
          label={
            "Do you currently have any certificate or professional training?"
          }
          list={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        <motion.div layout>
          {watch("haveAnyCertificate") === "yes" && (
          <>
            <div className="relative">
              <Controller
                name="certificateImage"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Upload
                    optional={false}
                    uploadRef={uploadCertificateRef}
                    onUpload={handleUpload(uploadCertificateRef)}
                    label="Upload Certificate"
                    name="certificateImage"
                    error={errors.certificateImage?.message}
                    accept="image/jpeg, image/png, image/webp, image/gif"
                    placeholder="Upload image of Certificate"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                    }}
                  />
                )}
              />
            </div>
          </>
           )} 
        </motion.div>

            <div className="relative">
              <Controller
                name="businessLogo"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Upload
                    optional={false}
                    uploadRef={uploadBusinessImageRef}
                    onUpload={handleUpload(uploadBusinessImageRef)}
                    label="Upload business image"
                    name="businessLogo"
                    error={errors.businessLogo?.message}
                    accept="image/jpeg, image/png, image/webp, image/gif"
                    placeholder="Upload Business image"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                    }}
                  />
                )}
              />
            </div>

        <Input2
          textArea
          label={"Write a brief/simple Bio about your business."}
          name={"businessBio"}
          inputType="text"
          placeholder={"Brief business description"}
          {...register("businessBio")}
          error={errors?.businessBio?.message}
        />

        <ActionButton
          type="submit"
          disabled={status === "loading"}
          // padding="1rem"
          sx={{
            ...style,
            width: "100%",
            marginTop: "1rem",
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

export default Step3;
