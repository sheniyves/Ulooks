import React from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import salon from "../../../assets/Images/salon.svg";
import { Checkbox } from "@mui/material";
import SelectDropDown from "../../../Components/WebComponents/SelectDropDown";
import PhoneNumberInput from "../../../Components/WebComponents/PhoneInput";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import Input2 from "../../../Components/WebComponents/Input2";
import PhoneNumberInput2 from "../../../Components/WebComponents/PhoneInput2";
import SelectDropDown2 from "../../../Components/WebComponents/SelectDropown2";
import FormProgress from "../CustomerAuth/FormProgress";
import { useSelector } from "react-redux";
import SPCreateAccountStep1 from "./SPCreateAccountStep1";
import SPCreateAccountStep2 from "./SPCreateAccountStep2";
import SPCreateAccountStep3 from "./SPCreateAccountStep3";
import arrowLeft from "../../../assets/Images/arrow-left.svg";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import { Link } from "react-router-dom";

const SPCreateAccount = () => {
  const currentStep = useSelector((state) => state.formStep.createAccountSp);
  return (
    <div>
      <PageTransition>
        <ConatinerWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-16 min-h-screen">
            <div className="hidden lg:inline-block sticky top-0 h-screen">
              <img
                src={salon}
                alt="Image of a salon"
                className="h-full w-full object-cover object-bottom"
              />
            </div>

            <div className=" -mt-10 md:mt-0 min-h-screen overflow-y-auto px-4 md:px-6 py-20 w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <FormProgress filled={"#F79009"} currentStep={currentStep} />
              <PageTransition key={currentStep}>
                {currentStep === 1 && (
                  <div>
                    <div className="flex items-center gap-4">
                      <Link to="/">
                        <img
                          className="cursor-pointer"
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(63%) sepia(22%) saturate(4081%) hue-rotate(358deg) brightness(99%) contrast(95%)",
                          }}
                          src={arrowLeft}
                          alt="Arrow directing to left"
                        />{" "}
                      </Link>
                      <h2 className="text-orange_gold font-fashion text-[1.75rem] font-bold">
                        Create Service Provider account
                      </h2>
                    </div>
                    <p className="text-yellow_gold font-medium text-[1rem] mt-4">
                      Provide your details to complete your account setup and
                      start offering services
                    </p>
                    <h2 className="mt-2 text-orange_gold font-fashion text-[1.75rem] font-bold">
                      Basic Information
                    </h2>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="flex items-center gap-4">
                    <Link to="/">
                      <img
                        className="cursor-pointer"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(63%) sepia(22%) saturate(4081%) hue-rotate(358deg) brightness(99%) contrast(95%)",
                        }}
                        src={arrowLeft}
                        alt="Arrow directing to left"
                      />{" "}
                    </Link>
                    <h2 className="text-orange_gold font-fashion text-[1.75rem] font-bold mt-8">
                      Business details
                    </h2>
                  </div>
                )}
                {currentStep === 3 && (
                       <div className="flex items-center gap-4">
                      <Link to="/">
                        <img
                          className="cursor-pointer"
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(63%) sepia(22%) saturate(4081%) hue-rotate(358deg) brightness(99%) contrast(95%)",
                          }}
                          src={arrowLeft}
                          alt="Arrow directing to left"
                        />{" "}
                      </Link>
                  <h2 className="text-orange_gold font-fashion text-[1.75rem] font-bold mt-8">
                    Bank and Payment Information
                    </h2>
                    </div>
                )}

                <div>
                  {currentStep === 1 && <SPCreateAccountStep1 />}
                  {currentStep === 2 && <SPCreateAccountStep2 />}
                  {currentStep === 3 && <SPCreateAccountStep3 />}
                </div>
              </PageTransition>
            </div>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default SPCreateAccount;
