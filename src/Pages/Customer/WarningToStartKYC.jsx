import React from "react";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import warning from "../../assets/Images/warning.svg";
import { motion } from "framer-motion";
import ContainerHeight from "../../Components/SharedComponents/ContainerHeight";
import Button from "../../Components/WebComponents/Button";
import { Link, useParams } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import StartKYCDialog from "../../Components/WebComponents/StartKYCDialog";

const WarningToStartKYC = () => {
  const { serviceId } = useParams();
  const dialogRefKYC = React.useRef(null);
  return (
    <PageTransition>
      <ConatinerWidth>
        <div className="bg-light_Purple w-full px-4 py-8 min-h-screen ">
          <StartKYCDialog dialogRef={dialogRefKYC} />
          {/* <ContainerHeight> */}
            <div className="w-full   mx-auto max-w-[38.5rem]">
              <div className="flex items-center justify-center ">
                <motion.img
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{
                    opacity: [1, 0.8, 1],
                    y: [0, 5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  src={warning}
                  alt="Warning with exclamation image"
                  className="w-[50%] md:w-full max-w-[12.5rem]"
                />
              </div>
              <div>
                <h1 className="text-purple text-center leading-[3.2rem] md:leading-[4rem] text-[2.25rem] sm:text-[2.8rem]  md:text-[3.78rem] text-normal font-bold font-fashion mb-5">
                  Your Safety Comes first
                </h1>
                <div className=" font-medium text-darkPurple">
                  <p className="text-lg">
                    To ensure a secure experience for both you and your service
                    providers, we require a quick KYC (Know Your Customer)
                    verification before booking a home service
                  </p>
                  <p className="text-lg">This helps us to:</p>
                  <ul>
                    <li className="text-lg">✅Confirm your identity</li>
                    <li className="text-lg">✅Prevent fraudulent bookings</li>
                    <li className="text-lg">
                      ✅Keep both parties safe and accountable
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-8">
                <p className="text-lg text-darkPurple font-medium ">
                  It only takes a few steps to helps us keep Ulooks safe for
                  everyone.
                </p>
                <p className="text-lg text-darkPurple font-medium mt-6">
                  Let's keep it safe - together
                </p>
                <Button
                  onClick={() => dialogRefKYC.current?.openDialog()}
                  sx={{
                    backgroundColor: "#6A0DAD",
                    width: "100%",
                    color: "#fff",
                    marginTop: "2.5rem",
                    marginInline: "auto",
                    maxWidth: {
                      xs: "100%",
                      md: "90%",
                    },

                    "&:hover": {
                      backgroundColor: "#5a0a99",
                    },
                  }}
                >
                  Start KYC
                </Button>
                <Link to={`/customerWebApp/appointments/${serviceId}`}>
                  <Button
                    sx={{
                      backgroundColor: "transparent",
                      width: "100%",
                      maxWidth: {
                        xs: "100%",
                        md: "90%",
                      },
                      marginInline: "auto",
                      marginTop: "1rem",
                      color: "#6A0DAD",
                      "&:hover": {
                        backgroundColor: "#e0bbff ",
                      },
                    }}
                  >
                    Go back
                  </Button>
                </Link>
              </div>
            </div>
          {/* </ContainerHeight> */}
        </div>
      </ConatinerWidth>
    </PageTransition>
  );
};

export default WarningToStartKYC;
