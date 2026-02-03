import React, { useEffect, useRef } from "react";
import Button from "./Button";
import { setStep } from "../../redux/newBookingSlice";
import { useDispatch } from "react-redux";

const BookNowStep4 = () => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const handleContinue = () => {
    dispatch(setStep(5));
  };

  useEffect(() => {
    // Request camera access
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, // use front camera on mobile
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        alert("Please allow camera access in your browser.");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center p-6">
      <p className="font-medium text-[#667085] text-lg">Security Face Matching</p>
      <p className="text-sm text-[#667085] mt-2">
        For your safety and security, please re-verify your identity to proceed
        with booking the service.
      </p>

      {/* Camera oval frame */}
      <div className="relative w-56 h-72 mt-6 flex items-center justify-center overflow-hidden rounded-full border-4 border-purple-600">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </div>

      <Button sx={{ width: "100%", marginTop: "1rem" }} onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
};

export default BookNowStep4;
