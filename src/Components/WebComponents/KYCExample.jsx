import React from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { updateStep } from "../../redux/formStepsSlice";
import kycImage from "../../assets/Images/kycExample.svg";

const KYCExample = ({ useBaseColor = true }) => {
  const dispatch = useDispatch();
  const proceed = () => {
    dispatch(updateStep({ formKey: "KYC", step: 5 }));
  };
  const color = useBaseColor ? "text-darkPurple" : "text-orange_gold";
  const buttonColor = useBaseColor ? "#6A0DAD" : "#F79009";
  const buttonHoverColor = useBaseColor ? "#5a0a99" : "#dc7c06";
      const descColor = useBaseColor ? "text-darkerPurple" : "text-yellow_gold";
  return (
    <div className="min-w-none md:min-w-[530px] ">
      <h2 className={`font-fashion text-2xl ${color} `}>
        📸 Liveness Check Face & Id Verification
      </h2>
      <div className="flex flex-col items-center justify-center my-4">
        <img src={kycImage} alt="kyc example image" />
        <p className={`${descColor} font-bold mt-4`}>
          This is an example of how it should be
        </p>
        <p className={`font-bold mt-4 ${descColor} `}>
          To continue, please follow the steps below carefully:
        </p>
      </div>

      <div className={`${descColor}`}>
        <p className="font-medium">
          {" "}
          🧍‍♂️ Step 1: Hold your ID Close to your Face
        </p>
        <ul className="text-base font-medium ml-8 list-disc">
          <li>Make sure your government-issued ID is clearly visible</li>
          <li>Hold it next to your face (or either side)</li>
          <li>Make sure your government-issued ID is clearly visible</li>
        </ul>

        <p className="font-medium mt-4">
          {" "}
          🟣 Step 2: Align Yourself in the Circle
        </p>
        <ul className="text-base font-medium ml-8 list-disc">
          <li>Position your face and ID inside the on-screen circle</li>
          <li>Keep still and make sure you’re in a well-lit environment</li>
          <li>Avoid hats, masks, or sunglasses</li>
        </ul>
        <p className="font-medium mt-4">✅ Step 3: Hold Still for 3 Seconds</p>
        <ul className="text-base font-medium ml-8 list-disc">
          <li>Once aligned, the camera will automatically scan</li>
          <li>A countdown will begin: “3… 2… 1…”</li>
          <li>Finish</li>
        </ul>
      </div>

      <Button
        onClick={proceed}
        backgroundColor={buttonColor}
        sx={{
          width: "100%",
          marginTop: "2.5rem",
          marginInline: "auto",
          "&:hover": { backgroundColor: buttonHoverColor },
        }}
      >
        Continue
      </Button>
      <div className="pb-10" />
    </div>
  );
};

export default KYCExample;
