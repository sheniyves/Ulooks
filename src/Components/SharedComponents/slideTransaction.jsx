import React from "react";
import { motion } from "framer-motion";
const SlideTransaction = ({ children }) => {

  const variant = {
    start: { x: 15, opacity: 0 },
    end: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -15, opacity: 0 },
  };
  return (
    <motion.div initial="start" animate="end" exit="exit" variants={variant}>
      {children}
    </motion.div>
  );
};

export default SlideTransaction;
