import React from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import ulooksBoard from "../../../assets/Images/ulooks-board.svg";
import { Link } from "react-router-dom";
import Input from "../../../Components/WebComponents/Input";
import { Checkbox } from "@mui/material";
import SelectDropDown from "../../../Components/WebComponents/SelectDropDown";
import PhoneNumberInput from "../../../Components/WebComponents/PhoneInput";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import ServiceCategory from "../../../Components/WebComponents/ServiceCategory";
import Step1 from "./Step1";
import FormProgress from "./FormProgress";
import { useSelector } from "react-redux";
import Step2 from "./Step2";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import SlideTransaction from "../../../Components/SharedComponents/slideTransaction";
import Step3 from "./Step3";
import Step4 from "./Step4";

const CustomerPersonalizeAccount = () => {
  const currentStep = useSelector(
    (state) => state.formStep.personalizeAccountC
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
            <div className="hidden lg:inline-block h-screen sticky top-0">
              <img
                src={ulooksBoard}
                alt="Company logo on a wooden board"
                className="h-full w-full object-cover "
              />
            </div>

            <div className="min-h-screen overflow-y-auto px-4 md:px-6 py-10 pb-20 md:py-20 w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <FormProgress filled={"#6A0DAD"} currentStep={currentStep} maxSteps={3} />
              <PageTransition key={currentStep}>
                {currentStep === 1 && (
                  <>
                    <h2 className="text-darkerPurple font-fashion text-[1.75rem] font-bold">
                      Personalize your account
                    </h2>
                    <p className="text-darkPurple font-medium text-[1rem] mt-4">
                      These questions will help Ulooks tailor recommendations
                      and services for you
                    </p>
                    <h2 className="mt-6 text-darkerPurple font-fashion text-[1.75rem] font-bold">
                      Basic Information
                    </h2>
                  </>
                )}
                {currentStep === 2 && (
                  <h2 className="text-darkerPurple font-fashion text-[1.75rem] font-bold">
                    Location & Accessibility
                  </h2>
                )}
                {currentStep === 3 && (
                  <h2 className="text-darkerPurple font-fashion text-[1.75rem] font-bold">
                    Preferences & Lifestyle
                  </h2>
                )}
                {currentStep === 4 && (
                  <>
                    <h2 className="text-darkerPurple font-fashion text-[1.75rem] font-bold">
                      Face Id
                    </h2>
                    <p className="text-darkPurple font-medium text-[1rem] mt-4">
                      Position your Camera to the center of your face.
                    </p>
                  </>
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

export default CustomerPersonalizeAccount;
