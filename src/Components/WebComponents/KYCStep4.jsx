import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../redux/formStepsSlice";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { submitKycAndContact } from "../../api/kyc";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../hooks/useToast";
import { buttonStatus as getButtonStatus } from "../../Utils/updateStatus";
import Toast from "../Toast";
import spinner from "../../assets/Animations/spinner.json";
import Lottie from "lottie-react";
import ActionButton from "../SharedComponents/ActionButton";

const KYCStep4 = ({ useBaseColor = true }) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { serviceId, bookings } = useParams();
  const [countdown, setCountdown] = useState(null);
  const [imageCaptured, setImageCaptured] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  const startCountdown = () => {
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(interval);
        captureImage();
        setCountdown(null);
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setImageCaptured(imageData);
    }
  };

  const step1Data = useSelector((state) => state.kycData.customerKycForm.step1);
  const step2Data = useSelector((state) => state.kycData.customerKycForm.step2);
  const step3Data = useSelector((state) => state.kycData.customerKycForm.step3);

  const { toastMessage, toastRef, showToast } = useToast();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  // ✅ Single mutation that handles both KYC and EC
  const { mutate: submitKycAndContactMutation, isSuccess } = useMutation({
    mutationFn: async ({ kycData, ecData }) => {
      // ✅ call the function you actually exported in kyc.js
      const response = await submitKycAndContact({ kycData, ecData });
      return response;
    },
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      showToast("KYC + Emergency Contact submitted successfully");
      setStatus("success");

      setTimeout(() => {
        const navigateTo = useBaseColor
          ? `/customerWebApp/KycSuccessful/${bookings}/${serviceId}`
          : `/serviceProviderWebApp/KycSuccessful/${serviceId}`;
        navigate(navigateTo);
      }, 4000);

      console.log("KYC + EC success:", data);
    },
    onError: (error) => {
      console.error(error);
      setStatus("error");
      showToast("Error occurred while submitting");
    },
  });

  const faceImage = new File(["dummy content"], "Screenshot (10).png", {
    type: "image/png",
    lastModified: 1737614808811,
  });

  const onSubmit = () => {
    console.log("Face image submitted:", imageCaptured);
    dispatch(updateStep({ formKey: "KYC", step: 5 }));

    // format date
    const formattedDate = new Date(step1Data.dateOfBirth)
      .toISOString()
      .split("T")[0];

    // base KYC payload
    const kycPayload = {
      full_name: step1Data.fullName,
      phone_number: step1Data.phoneNumber,
      country: step1Data.country,
      birth_date: formattedDate, // must be YYYY-MM-DD
      gender: step1Data.gender,
      email: step1Data.email,
      id_type: step2Data.identification,
      id_number: step2Data.identificationNumber,
    };

    // handle ID file (could be FileList or File)
    const identificationImage =
      step2Data.identificationImage instanceof FileList
        ? step2Data.identificationImage[0]
        : step2Data.identificationImage;

    // build FormData for KYC
    const formData = new FormData();
    Object.entries(kycPayload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (faceImage) {
      formData.append("face_image", faceImage);
    }

    if (identificationImage) {
      formData.append("id_image", identificationImage);
    }

    // emergency contact payload (can be JSON)
    const ecPayload = {
      ec_full_name: step3Data.emergencyContactName,
      ec_relationship: step3Data.emergencyContactRelationship,
      ec_phone_number: step3Data.phoneNumber,
      ec_address: step3Data.emergencyContactAddress,
    };

    console.log({ kycPayload, ecPayload });

    // call your mutation
    submitKycAndContactMutation({ kycData: formData, ecData: ecPayload });
  };

  const config = getButtonStatus({
    idleContent: "Done",
    loadingContent: "Processing...",
    successContent: "Kyc successful",
    errorContent: "Done",
  });

  const { content, style } = config[status];

  const color = useBaseColor ? "text-darkPurple" : "text-orange_gold";
  const buttonColor = useBaseColor ? "#6A0DAD" : "#F79009";
  const buttonHoverColor = useBaseColor ? "#5a0a99" : "#dc7c06";
  const descColor = useBaseColor ? "text-darkerPurple" : "text-yellow_gold";

  return (
    <div className="min-w-none md:min-w-[530px] mt-16">
      <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
        {toastMessage}
      </Toast>
      <h2 className={`font-fashion text-2xl ${color}`}>
        📸 Face & ID Matching
      </h2>
      <div
        className={`flex flex-col items-center justify-center mt-4 ${descColor} font-bold text-sm`}
      >
        <p>Please take a live selfie</p>
        <p>(To confirm your identity matches your uploaded ID)</p>
      </div>

      <div className="flex flex-col items-center justify-center my-6">
        {imageCaptured ? (
          <img
            src={imageCaptured}
            alt="Captured Face"
            className="w-60 h-80 object-cover rounded-lg border border-purple-600"
          />
        ) : (
          <div className="relative border-10 rounded-full bg-gold-purple w-60 h-80 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              className="w-60 h-80 rounded-full object-cover"
            />
            {countdown !== null && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-5xl font-bold">
                {countdown}
              </div>
            )}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {!imageCaptured ? (
        <Button
          backgroundColor={buttonColor}
          type="button"
          onClick={startCountdown}
          sx={{
            width: "100%",
            color: "#fff",
            marginTop: "1.5rem",
            "&:hover": { backgroundColor: buttonHoverColor },
          }}
        >
          Start Face Scan
        </Button>
      ) : (
        <ActionButton
          type="button" // ✅ changed from "submit"
          onClick={onSubmit} // ✅ connect onSubmit
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
          )}
          {content}
        </ActionButton>
      )}
    </div>
  );
};

export default KYCStep4;
