import React from "react";
import ribbons from "../../assets/Images/ribbons.svg";
import thumb from "../../assets/Images/thumb.svg";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Button from "../../Components/WebComponents/Button";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
const ServiceProviderKYCSuccessfullyCreated = () => {
  const { serviceId } = useParams();

  return (
    <div className="bg-light_gold min-h-screen pb-[8rem] md:pb-20">
      <PageTransition>
        <ConatinerWidth>
          <img
            className="   w-full object-cover h-[240px]"
            src={ribbons}
            alt="Confetti to indicate success"
          />
          <div className=" flex items-center justify-center flex-col mx-auto w-[92%] md:w-full">
            <motion.img
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.2,
              }}
              src={thumb}
              alt="Thumbs up for success"
              className="w-[50%] md:w-full max-w-[12.5rem]"
            />

            <h1 className="text-orange_gold text-center leading-[3.2rem] md:leading-[4rem] text-[2.8rem]  md:text-[3.78rem] font-bold font-fashion">
              KYC Successfully Created
            </h1>
            <p className="text-yellow_gold font-semibold text-lg text-center mt-2 max-w-[46rem]">
              Your information has been received and is under review. If any
              details are invalid, you may be asked to repeat the KYC process.
              For now, well done!"
            </p>
            <Link
              className="w-full   flex justify-center items-center"
              //   to={`/customerWebApp/bookings/${serviceId}`}
              to={"/serviceProviderWebApp/home"}
            >
              <Button
                sx={{
                  backgroundColor: "#F79009",
                  width: "100%",
                  marginTop: "2.5rem",
                  maxWidth: {
                    xs: "100%",
                    md: "30%",
                  },

                  "&:hover": {
                    backgroundColor: "#dc7c06",
                  },
                }}
              >
                Go to Home Screen
              </Button>
            </Link>
            {/* <Link
              className="w-full   flex justify-center items-center"
              to={"/serviceProviderWebApp/home"}
            >
              <Button
                sx={{
                  backgroundColor: "transparent",
                  width: "100%",
                  maxWidth: {
                    xs: "100%",
                    md: "30%",
                  },
                  marginTop: "1rem",
                  color: "#F79009",
                  "&:hover": {
                    backgroundColor: "#fcd194 ",
                  },
                }}
              >
                Go to Home Screen
              </Button>
            </Link> */}
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default ServiceProviderKYCSuccessfullyCreated;
