import React from "react";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import ulooksBoard from "../../../assets/Images/ulooks-board.svg";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./CreateServiceForm";
import FormProgress from "../CustomerAuth/FormProgress";
import { useSelector } from "react-redux";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import arrowRight from "../../../assets/Images/arrow-right.svg";
import addIcon from "../../../assets/Images/add.svg";
import { IconButton } from "@mui/material";

const SPPersonalizeAccount = () => {
  const currentStep = useSelector(
    (state) => state.formStep.personalizeAccountSP
  );
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  return (
    <div>
      <PageTransition>
        <ConatinerWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-16 min-h-screen">
            <div className="hidden lg:block sticky top-0 h-screen">
              <img
                src={ulooksBoard}
                alt="Company logo on a wooden board"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-h-screen overflow-y-auto px-4 md:px-6 py-20 w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <FormProgress
                filled={"#F79009"}
                maxSteps={3}
                currentStep={currentStep}
              />
              <PageTransition key={currentStep}>
                <h2 className="text-orange_gold font-fashion text-[1.75rem] font-bold">
                  Service Provider Personalization Questions
                </h2>

                {currentStep === 4 && (
                  <div className="-mb-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-orange_gold font-fashion text-[1.75rem] font-bold">
                        Set services
                      </h2>
                      <p className="flex items-center gap-2 cursor-pointer text-yellow_gold text-xs">
                        See services{" "}
                        <img src={arrowRight} alt="Arrow facing right" />
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <h2 className="text-yellow_gold text-xl font-medium">
                        Service 1
                      </h2>
                      <IconButton>
                        <img className="w-[90%]" src={addIcon} alt="Add icon" />
                      </IconButton>
                    </div>
                  </div>
                )}

                <div>
                  {currentStep === 1 && <Step1 />}
                  {currentStep === 2 && <Step2 />}
                  {currentStep === 3 && <Step3 />}
                  {/* {currentStep === 4 && <Step4 />} */}
                </div>
              </PageTransition>
            </div>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default SPPersonalizeAccount;
