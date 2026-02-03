import React from "react";
import thumb from "../../assets/Images/thumb.svg";
import { motion } from "framer-motion";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/newBookingSlice";

const BookNowSuccessful = () => {
  const dispatch = useDispatch();
  const handleContinue = () => {
    dispatch(setStep(7));
  };
  return (
    <div>
      <div className="flex items-center justify-center w-full">
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
          className="w-[9.42rem] md:w-full max-w-[12.5rem]"
        />
      </div>
      <h1 className="text-purple text-center text-4xl  md:text-5xl font-bold font-fashion">
        Service Successfully <br /> Booked
      </h1>
      <p className="text-purple font-semibold text-lg text-center mt-2 max-w-[46rem]">
        Well Done, <br /> You have Successfully booked your Service
      </p>
      <Button
        sx={{ width: "100%", mt: "6rem", mb: "1rem" }}
        onClick={handleContinue}
      >
        Proceed
      </Button>
    </div>
  );
};

export default BookNowSuccessful;
