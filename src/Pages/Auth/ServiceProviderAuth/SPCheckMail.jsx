import React from "react";
import ContainerHeight from "../../../Components/SharedComponents/ContainerHeight";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../Components/WebComponents/Input";
import { Checkbox } from "@mui/material";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import Lottie from "lottie-react";
import screen from "../../../assets/Images/screen.svg";
import arrowLeft from "../../../assets/Images/arrow-left.svg";
import PageTransition from "../../../Components/SharedComponents/PageTransition";

const SPCheckMail = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageTransition>
        <ConatinerWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-6 lg:gap-10 xl:gap-16 min-h-screen">
            <div className="h-screen overflow-y-auto  overflow-hidden shadow-md lg:shadow-none rounded-[2rem] lg:rounded-none mx-auto pt-10  px-0 lg:px-6  w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <h2 className=" px-6 lg:px-0 text-transparent bg-gold-strong bg-clip-text font-fashion text-[1.75rem] font-bold flex items-center gap-4">
                <img
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                  src={arrowLeft}
                  alt="Arrow directing to left"
                />{" "}
                Check your email
              </h2>
              {/* <img
              src={screen}
              alt="Image of a screen"
              className=" inline-block lg:hidden w-full"
            /> */}
              <p className="px-6 lg:px-0 text-darkPurple font-medium text-[1rem] mt-4">
                We have sent a Password recovery link to your email.
              </p>

              <Button
                type="submit"
                sx={{
                  backgroundColor: "#F79009",
                  width: "100%",
                  color: "#fff",
                  marginTop: "2.5rem",
                  "&:hover": {
                    backgroundColor: "#DB7F1A",
                  },
                }}
              >
                Open Email
              </Button>
            </div>
            <div className=" hidden lg:inline-block w-full h-screen">
              <img
                src={screen}
                alt="Image of a screen"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default SPCheckMail;
