import React from "react";
import ribbons from "../../assets/Images/ribbons.svg";
import thumb from "../../assets/Images/thumb.svg";
import Button from "../../Components/WebComponents/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import { services } from "../../data/barbingService";
import ServiceActionCards from "../../Components/WebComponents/ServiceActionCards";
const ServiceFinished = () => {
  return (
    <div className="bg-[#f4e2fe] min-h-screen py-[5%] px-4 pb-[8rem] md:pb-[5%]">
      <PageTransition>
        {/* <ConatinerWidth> */}
        {/* <img
          className="   w-full object-cover h-[240px]"
          src={ribbons}
          alt="Confetti to indicate success"
        /> */}
        <div className=" flex items-center justify-center flex-col mx-auto w-[92%] md:w-full">
          <div className="flex items-center justify-center md:justify-normal flex-wrap md:flex-nowrap gap-4 my-12">
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
            <ServiceActionCards success={true} details={services[0]} />
          </div>

          <h1 className="text-purple text-center leading-[3.2rem] md:leading-[4rem] text-[2.8rem]  md:text-[3.78rem] font-bold font-fashion">
            Serviced Finished
          </h1>
          <p className="text-purple font-semibold text-lg text-center mt-2">
            Well done! We hope you had an amazing experience. Kindly take a
            moment to rate your
          </p>
          <p className="text-purple font-semibold text-lg text-center mt-2">
            service and leave a review for your provider.
          </p>
          <Link
            className="w-full   flex justify-center items-center"
            to={`/customerWebApp/reviews/${services[0].id}`}
          >
            <Button
              sx={{
                backgroundColor: "#6A0DAD",
                width: "100%",
                color: "#fff",
                marginTop: "2.5rem",
                maxWidth: {
                  xs: "100%",
                  md: "35%",
                },

                "&:hover": {
                  backgroundColor: "#5a0a99",
                },
              }}
            >
              Share your review and rating
            </Button>
          </Link>
          <Link
            className="w-full   flex justify-center items-center"
            to={"/customerWebApp/home"}
          >
            <Button
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                maxWidth: {
                  xs: "100%",
                  md: "35%",
                },
                marginTop: "1rem",
                color: "#6A0DAD",
                "&:hover": {
                  backgroundColor: "#e0bbff ",
                },
              }}
            >
              Share Review later
            </Button>
          </Link>
        </div>
        {/* </ConatinerWidth> */}
      </PageTransition>
    </div>
  );
};

export default ServiceFinished;
