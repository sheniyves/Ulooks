import React from "react";
import wallet from "../../assets/Images/InsufficentWallet.svg";
import thumb from "../../assets/Images/thumb.svg";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Button from "../../Components/WebComponents/Button";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import MobileNavbar from "../../Components/WebComponents/MobileNavbar";

const InsufficientFunds = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log({ location });
  const navigateToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <div className="bg-[#FECDCA] min-h-screen ">
      <PageTransition>
        <MobileNavbar />
        <ConatinerWidth>
          <div className=" flex items-center justify-center flex-col mx-auto w-[92%] md:w-full pt-[10%]">
            <motion.img
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{
                opacity: [1, 0.8, 1],
                y: [0, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              src={wallet}
              alt="Thumbs up for success"
              className="w-[50%] md:w-full max-w-[12.5rem]"
            />

            <h1 className="text-[#F04438] text-center leading-[3.2rem] md:leading-[4rem] text-[2.8rem]  md:text-[3.78rem] font-bold font-fashion">
              Insufficent Funds
            </h1>
            <p className="text-[#F04438] font-semibold text-lg text-center mt-2">
              Please fund your wallet to pay for your service as you would in
              real time.
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
                Fund Wallet Now
              </Button>
            </Link>
            <Button
              onClick={navigateToPreviousPage}
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                maxWidth: {
                  xs: "100%",
                  md: "30%",
                },
                marginTop: "1rem",
                color: "#F04438",
                "&:hover": {
                  backgroundColor: "#e0bbff ",
                },
              }}
            >
              Go Back
            </Button>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default InsufficientFunds;
