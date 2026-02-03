import { Avatar } from "@mui/material";
import React from "react";
import { handlePriceFormatting } from "../../../Utils/formattingFunction";
import Header from "../../../Components/SharedComponents/Header";
import { Link, useNavigate } from "react-router-dom";
import arrowLeft from "../../../assets/Images/arrow-left.svg";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import ulooksBoard from "../../../assets/Images/ulooks-board.svg"; // 🔑 bring in the left image
import Button from "../../../Components/WebComponents/Button";

const CreatedServiceExamples = () => {
  const navigate = useNavigate();
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

            <div className="min-h-screen pb-20 overflow-y-auto px-4 md:px-6 w-[100%] md:w-[90%] xl:w-[80%] no-scrollbar">
              <div className="text-left flex w-full items-start justify-start mb-12 mt-20">
                <Link to={"/serviceProviderWebApp/create_service"}>
                  <div className="flex w-full items-center gap-2 cursor-pointer">
                    <img src={arrowLeft} alt="arrow left icon" />
                    <h2 className="text-transparent bg-clip-text inline-block bg-gold-purple font-bold cursor-pointer text-[1.75rem] font-fashion">
                      Example
                    </h2>
                  </div>
                </Link>
              </div>
              <div className="mx-auto max-w-[28rem]">
                <h4 className="text-yellow_gold  text-sm font-semibold ">
                  My Services
                </h4>
                <div className="mt-4 ">
                  {Array.from({ length: 6 }).map((data, i) => (
                    <Rows data={data} key={i} />
                  ))}
                </div>
                <Button
                  onClick={() =>
                    navigate("/serviceProviderWebApp/create_service")
                  }
                  sx={{
                    backgroundColor: "#F79009",
                    width: "100%",
                    color: "#fff",
                    marginTop: "2.5rem",
                    "&:hover": { backgroundColor: "#dc7c06" },
                  }}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default CreatedServiceExamples;

const Rows = ({ data }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar />
          <div className="text-left">
            <p className="text-[#2E1702] font-semibold text-base sm:text-xl">
              Simple Haircut
            </p>
            <span className="text-gray text-xs">Adult and Teenager</span>
          </div>
        </div>
        <p className="text-[#2E1702] font-semibold text-base sm:text-xl">
          {handlePriceFormatting(1000)}
        </p>
      </div>
    </div>
  );
};
