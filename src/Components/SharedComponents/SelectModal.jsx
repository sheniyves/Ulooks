import React from "react";
import { motion } from "framer-motion";
const SelectModal = ({ selectedService, setSelectedService }) => {
  if (!selectedService) return null;
  return (
    <div
      onClick={() => setSelectedService(null)}
      className="bg-black bg-opacity-50 z-[105] w-full fixed inset-0 h-screen flex items-center justify-center transition-all ease-in-out duration-300"
    >
      {selectedService && (
        <motion.img
          layoutId={`card-${selectedService.id}`}
          src={selectedService.image}
          className="w-[400px] mx-4"
        />
      )}
    </div>
  );
};

export default SelectModal;
