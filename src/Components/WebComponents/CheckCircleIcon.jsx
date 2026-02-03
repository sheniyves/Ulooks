import React from "react";
import { motion } from "framer-motion";

const CheckCircleIcon = (props) => {
  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      <motion.path
        d="M16.0013 30.3333C8.09464 30.3333 1.66797 23.9067 1.66797 16C1.66797 8.09332 8.09464 1.66666 16.0013 1.66666C23.908 1.66666 30.3346 8.09332 30.3346 16C30.3346 23.9067 23.908 30.3333 16.0013 30.3333ZM16.0013 3.66666C9.2013 3.66666 3.66797 9.19999 3.66797 16C3.66797 22.8 9.2013 28.3333 16.0013 28.3333C22.8013 28.3333 28.3346 22.8 28.3346 16C28.3346 9.19999 22.8013 3.66666 16.0013 3.66666Z"
        fill="white"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.path
        d="M14.1059 20.7733C13.8393 20.7733 13.5859 20.6667 13.3993 20.48L9.62594 16.7067C9.23927 16.32 9.23927 15.68 9.62594 15.2933C10.0126 14.9067 10.6526 14.9067 11.0393 15.2933L14.1059 18.36L20.9593 11.5067C21.3459 11.12 21.9859 11.12 22.3726 11.5067C22.7593 11.8933 22.7593 12.5333 22.3726 12.92L14.8126 20.48C14.6259 20.6667 14.3726 20.7733 14.1059 20.7733Z"
        fill="white"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      />
    </motion.svg>
  );
};

export default CheckCircleIcon;
