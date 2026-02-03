import React from "react";
import { motion } from "framer-motion";
const PageTransition = ({ children, duration = .3 }) => {


  

  const variant = {
    start: { y: 15, opacity: 0 },
    end: { y: 0, opacity: 1, transition: { duration } },
    exit: { y: -15, opacity: 0 },
  };
  return (
    <motion.div initial="start" animate="end" exit="exit" variants={variant}>
      {children}
    </motion.div>
  );
};

export default PageTransition;
