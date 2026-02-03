import React from "react";
import wallet from "../../assets/Images/wallet-add-big.svg";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Button from "../../Components/WebComponents/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/ServiceProvider/Navbar";
const NoEarnings = () => {
  return (
    <div className="bg-light_gold min-h-screen ">
      <PageTransition>
        <ConatinerWidth>
          <Sidebar
            activeBgColor="#FEF0C7"
            activeTextColor="text-orange_gold"
            navType="sp"
          />
          <Navbar />
          <div className=" flex items-center justify-center flex-col mx-auto w-[92%] md:w-full pt-20">
            <motion.img
              src={wallet}
              alt="Wallet icon"
              className="w-[50%] md:w-full max-w-[12.5rem]"
            />
            <h1 className=" text-[2.8rem]  md:text-[3.78rem] font-bold font-fashion text-transparent bg-purple-strong-gold bg-clip-text inline-block">
              No Earnings Yet
            </h1>
            <p className="text-purple font-semibold text-lg text-center mt-2 max-w-[46rem]">
              Your earnings from completed services will appear
            </p>
            <p className="text-purple font-semibold text-lg text-center mt-2 max-w-[46rem]">
              here. Accept bookings and start earning today!
            </p>
            <div className="mt-10" />
            <Link
              className="w-full   flex justify-center items-center"
              to={`/serviceProviderWebApp/appointments`}
            >
              <Button
                backgroundColor={"#F79009"}
                sx={{
                  width: "100%",
                  color: "#fff",
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
                View Available Bookings
              </Button>
            </Link>
            <Link
              className="w-full   flex justify-center items-center"
              to={"/customerWebApp/addFunds"}
            >
              <Button
                backgroundColor={"transparent"}
                color="#F79009"
                sx={{
                  width: "100%",
                  border: "1px solid #F79009",
                  maxWidth: {
                    xs: "100%",
                    md: "30%",
                  },
                  marginTop: "1rem",
                  "&:hover": {
                    backgroundColor: "#e0bbff ",
                  },
                }}
              >
                Set up your Profile to Start Earning
              </Button>
            </Link>
          </div>
        </ConatinerWidth>
      </PageTransition>
    </div>
  );
};

export default NoEarnings;
