import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import noAppointments from "../../assets/Images/calendar-remove.svg";
import Button from "../../Components/WebComponents/Button";
import Container from "../../Components/SharedComponents/Container";
import MobileNavbar from "../../Components/WebComponents/MobileNavbar";
const NoAppointments = () => {
  return (
    <div className=" relative bg-light_Purple min-h-screen pb-[7rem]">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <MobileNavbar />
        <Container useMargin={window.innerWidth > 1024}>
          <h1 className=" pt-[5%] text-2xl font-bold font-fashion text-transparent bg-purple-strong-gold bg-clip-text inline-block">
            Appointments
          </h1>
          <div className="pt-[10%] w-full flex flex-col items-center justify-center  text-transparent bg-gold-strong bg-clip-text">
            <img
              className="w-[30%] sm:w-full max-w-[120px]"
              src={noAppointments}
              alt="Calender remove"
            />
            <h1 className="text-[60px] leading-tight md:leading-normal text-center font-fashion font-bold text-transparent bg-purple-strong-gold bg-clip-text ">
              No Appointments Yet
            </h1>
            <p className="text-xl text-darkPurple text-center ">
              You haven't booked any services yet. Explore <br /> and schedule
              your beauty session
            </p>
            <Button
              sx={{
                width: "100%",
                marginTop: "5rem",
                minWidth: "330px",
                maxWidth: {
                  xs: "100%",
                  md: "60%",
                  lg: "40%",
                },

                "&:hover": {
                  backgroundColor: "#5a0a99",
                },
              }}
            >
              Book a Service
            </Button>
          </div>
        </Container>
      </ConatinerWidth>
    </div>
  );
};

export default NoAppointments;
