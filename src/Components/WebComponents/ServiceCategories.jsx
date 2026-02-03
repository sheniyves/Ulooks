import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { getServiceCategories } from "../../api/services";

const ServiceCategories = () => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["serviceCategory"],
    queryFn: getServiceCategories,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("Fetched service categories:", data);
    }
  }, [isSuccess, data]);

  return (
    <div className="mt-4">
      <h2 className="text-darkerPurple font-fashion font-bold text-2xl">
        Service Categories for Men & Women
      </h2>
      <div>
        {true ? (
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-full xl:w-[65%]">
            {[1, 2, 3, 4, 6, 7, 8, 9].map((t) => (
              <li key={t} className="rounded-xl overflow-hidden">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={142}
                  className="rounded-xl"
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-full xl:w-[65%]">
            {data?.data?.map((service) => (
              <li
                key={service.id}
                className="overflow-hidden rounded-xl w-full min-h-[142px] cursor-pointer group 
               border-2 border-transparent hover:bg-gold-purple p-[2px] transition duration-300 ease-in-out"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    backgroundImage: `url(${service.image_url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full flex items-end p-4 rounded-xl bg-white"
                >
                  <h2
                    className="text-white group-hover:font-fashion group-hover:bg-gold-purple 
                     group-hover:text-transparent inline-block bg-clip-text 
                     group-hover:font-bold text-xl font-medium leading-none"
                  >
                    {service.name}
                  </h2>
                </motion.div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ServiceCategories;
