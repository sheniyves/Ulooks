import Dialog from "../SharedComponents/AlertDialog";
import FormProgress from "../../Pages/Auth/CustomerAuth/FormProgress";
import { useSelector } from "react-redux";
import KYCStep1 from "./KYCStep1";
import KYCStep2 from "./KYCStep2";
import KYCStep3 from "./KYCStep3";
import KYCStep4 from "./KYCStep4";
import React, { useRef } from "react";
import KYCExample from "./KYCExample";
import { useDynamicScreen } from "../../Utils/screenWidth";
import arrowLeft from "../../assets/Images/arrow-left.svg";

const StartKYCDialog = ({ dialogRef }) => {
  const currentStep = useSelector((state) => state.formStep.KYC);
  const dynamicScreen = useDynamicScreen();
  const kycStepIIRef = useRef(null);
  const kycStepIIIRef = useRef(null);
  const kycStepIVRef = useRef(null);

  const dialogAction = () => {
    switch (currentStep) {
      case 1:
        dialogRef.current?.openDialog();
        break;
      case 2:
        dialogRef.current?.closeDialog();
        setTimeout(() => {
          kycStepIIRef.current?.openDialog();
        }, 500);
        break;
      case 3:
        kycStepIIRef.current?.closeDialog();
        setTimeout(() => {
          kycStepIIIRef.current?.openDialog();
        }, 500);
        break;
      case 4:
        kycStepIIIRef.current?.closeDialog();
        setTimeout(() => {
          kycStepIVRef.current?.openDialog();
        }, 500);
        break;
      default:
        dialogRef.current?.closeDialog();
        break;
    }
  };
  return (
    <>
      <Dialog
        ref={dialogRef}
        useFullWidth={dynamicScreen < 770}
        dialogTitle={`KYC step I`}
        action={""}
        icon={arrowLeft}
        maxHeight={"100vh"}
        useDialogAction={true}
        dialogAction={dialogAction}
      >
        <div className="   pb-10 md:pb-0">
          {currentStep !== 4 && (
            <FormProgress
              maxSteps={5}
              filled={"#6A0DAD"}
              currentStep={currentStep}
            />
          )}
          <KYCStep1 />
        </div>
      </Dialog>

      <Dialog
        ref={kycStepIIRef}
        useFullWidth={dynamicScreen < 770}
        dialogTitle={`KYC step II`}
        action={""}
        icon={arrowLeft}
        maxHeight={"100vh"}
        useDialogAction={true}
        dialogAction={dialogAction}
      >
        <div className="   pb-10 md:pb-0">
          {currentStep !== 4 && (
            <FormProgress
              maxSteps={5}
              filled={"#6A0DAD"}
              currentStep={currentStep}
            />
          )}
          <KYCStep2 />
        </div>
      </Dialog>

      <Dialog
        ref={kycStepIIIRef}
        useFullWidth={dynamicScreen < 770}
        dialogTitle={`KYC step III`}
        action={""}
        icon={arrowLeft}
        maxHeight={"100vh"}
        useDialogAction={true}
        dialogAction={dialogAction}
      >
        <div className="   pb-10 md:pb-0">
          {currentStep !== 4 && (
            <FormProgress
              maxSteps={5}
              filled={"#6A0DAD"}
              currentStep={currentStep}
            />
          )}
          <KYCStep3 />
        </div>
      </Dialog>
      <Dialog
        ref={kycStepIVRef}
        useFullWidth={dynamicScreen < 770}
        dialogTitle={`KYC step IV`}
        action={""}
        icon={arrowLeft}
        maxHeight={"100vh"}
        useDialogAction={true}
        dialogAction={dialogAction}
      >
        <div className="   pb-10 md:pb-0">
          {currentStep !== 4 && (
            <FormProgress
              maxSteps={5}
              filled={"#6A0DAD"}
              currentStep={currentStep}
            />
          )}
          <KYCStep4 />
        </div>
      </Dialog>
    </>
  );
};

export default StartKYCDialog;
