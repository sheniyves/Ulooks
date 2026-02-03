import Dialog from "../SharedComponents/AlertDialog";
import FormProgress from "../../Pages/Auth/CustomerAuth/FormProgress";
import { useSelector } from "react-redux";
import KYCStep1 from "./KYCStep1";
import KYCStep2 from "./KYCStep2";
import KYCStep3 from "./KYCStep3";
import KYCStep4 from "./KYCStep4";
import React from "react";
import KYCExample from "./KYCExample";

const StartKYCDialog = ({ dialogRef }) => {
  const currentStep = useSelector((state) => state.formStep.KYC);

  return (
    <Dialog
      ref={dialogRef}
      useFullWidth={window.innerWidth < 770}
      dialogTitle={""}
      action={""}
      iconPresence={false}
    >
      <div className=" md:-mt-4 pb-10 md:pb-0">
        {currentStep !== 4 && (
          <FormProgress
            maxSteps={5}
            filled={"#6A0DAD"}
            currentStep={currentStep}
          />
        )}

        {currentStep === 1 && <KYCStep1 />}
        {currentStep === 2 && <KYCStep2 />}
        {currentStep === 3 && <KYCStep3 />}
        {currentStep === 4 && <KYCExample />}
        {currentStep === 5 && <KYCStep4 />}
      </div>
    </Dialog>
  );
};

export default StartKYCDialog;
