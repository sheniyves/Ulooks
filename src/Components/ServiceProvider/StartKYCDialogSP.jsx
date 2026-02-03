import { DialogContent } from "@mui/material";
import Dialog from "../SharedComponents/AlertDialog";
import FormProgress from "../../Pages/Auth/CustomerAuth/FormProgress";
import { useSelector } from "react-redux";
import KYCStep1 from "../../Components/WebComponents/KYCStep1";
import KYCStep2 from "../../Components/WebComponents/KYCStep2";
import KYCStep3 from "../../Components/WebComponents/KYCStep3";
import KYCStep4 from "../../Components/WebComponents/KYCStep4";
import React from "react";
import KYCExample from "../../Components/WebComponents/KYCExample";

const StartKYCDialogSP = ({ dialogRef }) => {
  const useDialog = window.innerWidth > 1024;
  const [example, setExample] = React.useState(false);
  const currentStep = useSelector((state) => state.formStep.KYC);

  return (
    <div>
      {/* {useDialog && ( */}
      <Dialog ref={dialogRef}        useFullWidth={window.innerWidth < 770}  dialogTitle={""} action={""} iconPresence={false}  >
        <div className="-mt-6 md:-mt-12 pb-10 md:pb-0">
          <DialogContent>
            <>
              <div>
                {currentStep !== 4 && (
                  <FormProgress
                    maxSteps={5}
                    filled={"#F79009"}
                    currentStep={currentStep}
                  />
                )}
              </div>
              {currentStep === 1 && <KYCStep1  useBaseColor={false} />}
              {currentStep === 2 && <KYCStep2 useBaseColor={false}  />}
              {currentStep === 3 && <KYCStep3 useBaseColor={false}  />}
              {currentStep === 4 && <KYCExample useBaseColor={false}  />}
              {currentStep === 5 && <KYCStep4  useBaseColor={false} />}
            </>
          </DialogContent>
        </div>
      </Dialog>
      {/* )} */}
    </div>
  );
};

export default StartKYCDialogSP;
