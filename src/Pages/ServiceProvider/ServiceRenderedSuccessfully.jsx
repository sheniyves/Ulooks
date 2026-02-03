import React from "react";
import ribbons from "../../assets/Images/ribbons.svg";
import thumb from "../../assets/Images/thumb.svg";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Button from "../../Components/WebComponents/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
const ServiceRenderedSuccessfully = () => {
  return (
    <div className="bg-[#fef0c7] min-h-screen ">
      <PageTransition>
        <ConatinerWidth>
          <img
            className="  w-full object-cover object-center  h-[240px]"
            src={ribbons}
            alt="Confetti to indicate success"
          />
          <div className="  flex items-center justify-center flex-col mx-auto w-[92%] md:w-full">
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

            <h1 className="text-orange_gold text-center leading-[3.2rem] md:leading-[4rem] text-[2.25rem] sm:text-[2.8rem]  md:text-[3.78rem] font-normal sm:font-bold font-fashion">
              Service Rendered Successfully
            </h1>
            <p className="text-yellow_gold font-semibold text-lg text-center mt-2">
              Well Done.
            </p>
            <p className="text-yellow_gold font-semibold text-lg text-center mt-2">
              You have Successfully rendered a service, expect good reviews and
              ratings.
            </p>
            <Link
              className="w-full   flex justify-center items-center"
              to={"/serviceProviderWebApp/home"}
            >
              <Button
                backgroundColor="#F79009"
                sx={{
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
                Go home
              </Button>
            </Link>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default ServiceRenderedSuccessfully;
