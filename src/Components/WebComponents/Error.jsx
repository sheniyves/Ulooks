import React from "react";
import { motion } from "framer-motion";

const Error = ({ error }) => {
  return (
    <div>
      <motion.p
        initial={{ y: -3 }}
        animate={{ y: 0 }}
        exit={{ y: -3 }}
        className="text-red text-[.8rem] mt-[-.5rem] font-semibold float-end  absolute right-0 -bottom-6"
      >
        {error}
      </motion.p>
    </div>
  );
};

export default Error;
