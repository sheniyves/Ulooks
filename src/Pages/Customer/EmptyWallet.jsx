import React from "react";
import wallet from "../../assets/Images/wallet-add-big.svg";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Button from "../../Components/WebComponents/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
const EmptyWallet = () => {
  return (
    <div className="bg-[#f4e2fe] min-h-screen ">
      <PageTransition>
        <ConatinerWidth>
          <div className=" flex items-center justify-center flex-col mx-auto w-[92%] md:w-full pt-20">
            <motion.img
              src={wallet}
              alt="Wallet icon"
              className="w-[50%] md:w-full max-w-[12.5rem]"
            />
                            <h1 className=" text-[2.8rem]  md:text-[3.78rem] font-bold font-fashion text-transparent bg-purple-strong-gold bg-clip-text inline-block">
              Your Wallet is Empty
            </h1>
            <p className="text-purple font-semibold text-lg text-center mt-2 max-w-[46rem]">
              Once you start booking services, any cashback
            </p>
            <p className="text-purple font-semibold text-lg text-center mt-2 max-w-[46rem]">
              promo credits, or top-ups will show here.
            </p>
            <div className="mt-10" />
            <Link
              className="w-full   flex justify-center items-center"
              to={`/customerWebApp/home`}
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
                Explore Services
              </Button>
            </Link>
            <Link
              className="w-full   flex justify-center items-center"
              to={"/customerWebApp/addFunds"}
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
                  color: "#6A0DAD",
                  "&:hover": {
                    backgroundColor: "#e0bbff ",
                  },
                }}
              >
                Top up wallet
              </Button>
            </Link>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default EmptyWallet;
