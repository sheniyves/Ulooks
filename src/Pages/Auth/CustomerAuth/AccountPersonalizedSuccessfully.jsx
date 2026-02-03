import React from "react";
import ribbons from "../../../assets/Images/ribbons.svg";
import thumb from "../../../assets/Images/thumb.svg";
import ConatinerWidth from "../../../Components/SharedComponents/ConatinerWidth";
import Button from "../../../Components/WebComponents/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../../../Components/SharedComponents/PageTransition";
const AccountCreatedSuccessfully = () => {
  return (
    <div className="bg-[#f4e2fe] min-h-screen ">
      <PageTransition>
        <ConatinerWidth>
          <img
            className="  w-full object-cover h-[240px]"
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

            <h1 className="text-purple text-center leading-[3.2rem] md:leading-[4rem] text-[2.8rem]  md:text-[3.78rem] font-bold font-fashion">
              Account Successfully Personalized
            </h1>
            <p className="text-purple font-semibold text-lg text-center mt-2">
              Well Done
            </p>
            <p className="text-purple font-semibold text-lg text-center mt-2">
              You have successfully personalized your account
            </p>
            <Link
              className="w-full   flex justify-center items-center"
              // to={"/customerAuth/personalize_account"}
              to={"/customerWebApp/home"}
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
                Start Ulooks
              </Button>
            </Link>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default AccountCreatedSuccessfully;
