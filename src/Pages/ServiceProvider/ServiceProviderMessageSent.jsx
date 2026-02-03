import React from "react";
import thumb from "../../assets/Images/thumb.svg";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Button from "../../Components/WebComponents/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
const ServiceProviderMessageSent = () => {

  return (
    <div className="bg-light_gold min-h-screen ">
      <PageTransition>
        <ConatinerWidth>
          <div className=" flex items-center justify-center flex-col mx-auto w-[92%] md:w-full pt-[10%]">
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
              Your Message Has been sent
            </h1>
            <p className="text-yellow_gold font-semibold text-lg text-center mt-2 max-w-[46rem]">
              Thank you for reaching out to us. we will get back to you ASAP
            </p>
            <p className="text-yellow_gold font-semibold text-lg text-center mt-2 max-w-[46rem]">
              Via in appchat or mail
            </p>

            <Link
              className="w-full   flex justify-center items-center"
              to={"/"}
            >
              <Button
                sx={{
                  backgroundColor: "#F79009",
                  width: "100%",
                  color: "#fff",
                  marginTop: "2.5rem",
                  maxWidth: {
                    xs: "100%",
                    md: "30%",
                  },

                  "&:hover": {
                    backgroundColor: "#DB7F1A",
                  },
                }}
              >
                Go Home
              </Button>
            </Link>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default ServiceProviderMessageSent;
