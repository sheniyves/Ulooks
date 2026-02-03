import React from "react";
import ribbons from "../../../assets/Images/ribbons.svg";
import thumb from "../../../assets/Images/thumb.svg";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const SPAccountCreatedSuccessfully = () => {
  return (
    <div className="bg-[#f4e2fe] min-h-screen ">
      <ConatinerWidth>
        <img
          className="  w-full object-cover h-[240px]"
          src={ribbons}
          alt="Confetti to indicate success"
        />
        <div className=" flex items-center justify-center flex-col  mx-auto w-[92%] md:w-full">
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

          <h1 className="text-purple text-center leading-[3.2rem] md:leading-[4rem] text-[2.25rem] sm:text-[2.8rem]  md:text-[3.78rem] font-normal sm:font-bold font-fashion">
            Account Successfully Created
          </h1>
          <p className="text-purple font-semibold text-lg text-center mt-2">
            Please personalize your account so we can provide you with the best,
            most tailored services.
          </p>
          <Link
            className="w-full   flex justify-center items-center"
            to={"/customerAuth/personalize_account"}
          >
            <Button
              sx={{
                backgroundColor: "#6A0DAD",
                width: "100%",
                color: "#fff",
                marginTop: "2.5rem",
                maxWidth: {
                  xs: "100%",
                  md: "30%",
                },

                "&:hover": {
                  backgroundColor: "#5a0a99",
                },
              }}
            >
              Personalize Account
            </Button>
          </Link>
          <Button
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              maxWidth: {
                xs: "100%",
                md: "30%",
              },
              marginTop: "1rem",
              color: "#6A0DAD",
              "&:hover": {
                backgroundColor: "#e0bbff ",
              },
            }}
          >
            Skip, Do Later
          </Button>
        </div>
      </ConatinerWidth>
    </div>
  );
};

export default SPAccountCreatedSuccessfully;
