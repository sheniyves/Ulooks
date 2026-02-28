import React, { useEffect } from "react";
import Button from "./Button";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTopService } from "../../api/services";
import { Skeleton } from "@mui/material";
// import { topService } from "../../data/topService";

const TopServiceOfTheWeek = () => {
  // console.log({ topService });
  const x = useMotionValue(0);
  const speed = -0.5;
  const navigate = useNavigate();
  useAnimationFrame(() => {
    x.set(x.get() + speed);
    if (x.get() < -20 * 220) x.set(0);
  });

  // const today = new Date().toISOString().split("T")[0];
  const today = "2025-01-15";
console.log({today})
  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["topService", today],
    queryFn: () => getTopService(today),
    onSuccess: (data) => {
      console.log("Fetched top services:", data?.data);
    },
    onError: (error) => {
      const status = error?.response?.statusCode;
      console.log({ error })
      if (status === 403) {
        navigate("/customerAuth/customer_signIn");
      }
    }
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("Fetched top services:", data?.data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      const status = error?.response?.statusCode;
      if (status === 403) {
        navigate("/customerAuth/customer_signIn");
      }
    }
  }, [isError, error, navigate]);

  return (
    <div className="mt-4 overflow-hidden">
      <h2 className="text-darkerPurple font-fashion ml-4 lg:ml-[330px] font-bold text-2xl mb-4">
        Top Service of the Week
      </h2>

      <div className="max-w-full xl:max-w-[75%] overflow-hidden bg-white fadeout-horizontal">
        {true ? (
          <ul className="flex gap-4 p-2 ml-[324px]">
            {[1, 2, 3, 4].map((t) => (
              <li
                key={t}
                className="rounded-xl overflow-hidden w-[211px] h-[152px]"
              >
                <Skeleton
                  variant="rectangular"
                  width={152}
                  height={152}
                  className="rounded-xl"
                />
              </li>
            ))}
          </ul>
        ) : (
          <motion.ul
            className="flex gap-4 w-max cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -2000, right: 0 }}
            dragElastic={0.05}
            dragMomentum={true}
          >
            {data?.data?.map?.((service, index) => (
              <li
                // key={`${service.id}-${index}`}
                key={service.id}
                style={{
                  backgroundImage: `url(${service.image_url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="p-4 relative w-[211px] h-[152px] rounded-lg shrink-0"
              >
                <h2 className="text-white font-fashion text-xl font-bold leading-none">
                  {service.name}
                </h2>
                <span className="text-white text-xs font-medium leading-none block">
                  {service.description}
                </span>
                <div className="flex justify-end absolute right-4 bottom-4">
                  <Link to={`/customerWebApp/appointments/${service.id}`}>
                    <Button
                      fontWeight={400}
                      color="white"
                      sx={{ py: 0.5, px: 1.2 }}
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
};

export default TopServiceOfTheWeek;
