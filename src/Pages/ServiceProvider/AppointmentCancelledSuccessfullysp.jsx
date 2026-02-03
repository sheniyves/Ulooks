import React from "react";
import ribbons from "../../assets/Images/ribbons.svg";
import thumb from "../../assets/Images/thumb.svg";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Button from "../../Components/WebComponents/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
const AppointmentCancelledSuccessfullysp = () => {
  return (
    <div className="bg-light_gold min-h-screen pb-[8rem] lg:pb-20">
      <PageTransition>
        <ConatinerWidth>
          {/* <img
            className="   w-full object-cover h-[240px]"
            src={ribbons}
            alt="Confetti to indicate success"
          /> */}
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

            <h1 className="text-orange_gold text-center leading-[3.8rem] md:leading-[4rem] text-[3.78rem] font-bold font-fashion">
              Appointment Cancelled Successfully
            </h1>
            <div className=" w-full mx-auto max-w-full md:max-w-[70%] lg:max-w-[50%] mt-4">
              <p className="text-yellow_gold font-semibold text-lg text-center mt-2">
                You've successfully cancelled this appointment. The customer
                will be notified, and their refund (minus service charges) will
                be processed.
              </p>
              <p className="text-yellow_gold  font-semibold text-lg text-center mt-2">
                Please try to keep your availability updated to avoid missed
                opportunities. We hope you stay ready for new bookings! 💼✂️
              </p>
            </div>

            <Link
              className="w-full max-w-full sm:max-w-[80%] mx-auto flex justify-center items-center"
              to={`/serviceProviderWebApp/home`}
            >
              <Button
                backgroundColor="#F79009"
                sx={{
                  width: "100%",
                  marginTop: "2.5rem",
                  maxWidth: {
                    xs: "100%",
                    md: "35%",
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

export default AppointmentCancelledSuccessfullysp;
