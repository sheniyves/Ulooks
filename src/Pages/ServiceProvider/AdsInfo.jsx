import React from "react";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Button from "../../Components/WebComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import Header from "../../Components/SharedComponents/Header";
import arrowLeft from "../../assets/Images/arrow-left.svg";
const AdsInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#fef0c7] min-h-screen pb-[8rem] px-4 pr-0 md:pb-20">
      <PageTransition>
        <ConatinerWidth>
          <div onClick={() => navigate(-1)} className="flex items-center pt-6 md:pt-20 gap-2 max-w-[60rem] font-bold mx-auto mb-8 md:mb-20 cursor-pointer">
            <img src={arrowLeft} alt="Arrow facing left" />
            <h1 className=" text-[1.75rem]  text-transparent bg-gold-purple bg-clip-text inline-block font-fashion">
              My Business Ads
            </h1>
          </div>
          <div className="  flex items-center  flex-col mx-auto w-[92%] md:w-full ">
            <div className="w-full mx-auto max-w-[49.625rem]">
              <h1 className="font-bold text-transparent bg-gold-purple inline-block bg-clip-text font-fashion  text-4xl mb-8">
                Thinking of running ads? Here’s what you should know
              </h1>
              <ul className="text-yellow_gold text-xl font-medium list-disc">
                {info.map((n, i) => (
                  <li className="pl-4" key={i}>{n}</li>
                ))}
              </ul>
              <Link
                className="w-full  flex justify-center items-center"
                to={"/serviceProviderWebApp/home"}
              >
                <Button
                  sx={{
                    backgroundColor: "#F79009",
                    width: "100%",
                    margin:"auto",
                    color: "#fff",
                    marginTop: "3.5rem",
                    maxWidth: {
                      xs: "100%",
                      md: "80%",
                    },

                    "&:hover": {
                      backgroundColor: "#dc7c06",
                    },
                  }}
                >
                  Go home
                </Button>
              </Link>
            </div>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default AdsInfo;

const info = [
  "We’ll use your current profile details and cover image for your ads.",
  "If you'd like something different, please update them before launching your ad.",
  "Ads cost ₦500 per day, deducted directly from your earnings.",
  "Your ad will only be shown within your city/region.",
  "Your wallet keeps track of all your ad deductions and balances",
  "Ads put your services in front of more potential customers in your area, increasing your",
  "Chances of getting booked faster.",
];
