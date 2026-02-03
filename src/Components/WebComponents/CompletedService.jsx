import React from "react";
import { motion } from "framer-motion";
import { completedServices } from "../../data/completedServices";

const CompletedService = ({ selected, selectedService }) => {
  return (
    <div className="mt-4">
      <h2 className="text-darkerPurple font-fashion font-bold text-2xl">
        Completed Service
      </h2>

      <div className="">

      <ul className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(114px,_1fr))] gap-2 mt-4 w-full">
        {completedServices?.map((service) => (
          <motion.li
            key={service.id}
            className={`cursor-pointer w-full max-h-fit rounded-lg overflow-hidden `}
            style={{ zIndex: 10 * service.id }}
             layoutId={`card-${service.id}`}
            onClick={() => selected(service)}
          >
            <motion.img
         
              initial={{ scale: 1.05 }}
              whileHover={{ scale: 1.1 }}
              className="w-full"
              src={service.image}
              alt="Completed service image"
            />
          </motion.li>
        ))}
        </ul>
      </div>
        
    </div>
  );
};

export default CompletedService;
