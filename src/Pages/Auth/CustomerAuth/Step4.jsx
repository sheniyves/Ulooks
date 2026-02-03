import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateStep } from "../../../redux/formStepsSlice";
import { updateForm } from "../../../redux/updatePersonalizationForm";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import spinner from "../../../assets/Animations/spinner.json";

const Step4 = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle");
  const [streaming, setStreaming] = useState(false);
  const [photo, setPhoto] = useState(null);

  // Start the camera when component mounts
  React.useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreaming(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    startCamera();

    return () => {
      // stop stream on unmount
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Capture photo
  const takeShot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0);
    const imageData = canvasRef.current.toDataURL("image/png");
    setPhoto(imageData);

    // Save to redux
    dispatch(updateForm({ stepKey: "step4", data: { photo: imageData } }));

    // stop the camera after capture
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setStreaming(false);

    // Move to next step after a delay
    setStatus("loading");
    const timer = setTimeout(() => {
      dispatch(updateStep({ formKey: "personalizeAccountC", step: 5 }));
      navigate("/customerAuth/account_personalize_successfully");
    }, 3000);
    return () => clearTimeout(timer);
  };

  const buttonStatus = {
    idle: {
      content: "Take Shot",
      style: {
        backgroundColor: "#6A0DAD",
        color: "#fff",
        cursor: "pointer",
      },
    },
    loading: {
      content: "",
      style: {
        backgroundColor: "#EAEAEC",
        color: "#666",
        cursor: "not-allowed",
      },
    },
  };

  const { content, style } = buttonStatus[status];

  return (
    <div className="mt-8 flex flex-col items-center space-y-6">
      {/* Show live camera if streaming */}
      {streaming && !photo && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-w-md rounded-lg shadow"
        />
      )}

      {/* Show captured photo */}
      {photo && (
        <img
          src={photo}
          alt="Captured"
          className="w-full max-w-md rounded-lg shadow"
        />
      )}

      {/* Action Button */}
      <ActionButton
        onClick={takeShot}
        disabled={status === "loading"}
        sx={{
          ...style,
          width: "100%",
          marginTop: "2.5rem",
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

      {/* Hidden canvas used for snapshot */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Step4;
