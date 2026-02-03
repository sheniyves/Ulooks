import React from "react";
import Navbar from "../../Components/ServiceProvider/Navbar";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import noAppointments from "../../assets/Images/calendar-remove-sp.svg";
import Button from "../../Components/WebComponents/Button";
import Container from "../../Components/SharedComponents/Container";
import MobileNavbar from "../../Components/WebComponents/MobileNavbar";
import { Link } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";

const ServiceProviderNoAppointments = () => {
  return (
    <div className=" relative bg-light_gold min-h-screen pb-[7rem]">
      <ConatinerWidth>
        <Sidebar
          activeBgColor="#FEF0C7"
          activeTextColor="text-orange_gold"
          navType="sp"
        />
        <Navbar />
        <MobileNavbar />
        <PageTransition>
          <Container useMargin={window.innerWidth > 1024}>
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
                You haven’t created any services yet. Add your first service to
                start offering beauty sessions.
              </p>
              <Link
                className="w-full flex items-center justify-center"
                to={"/serviceProviderWebApp/create_service"}
              >
                <Button
                  backgroundColor={"#F79009"}
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
                      backgroundColor: "#DB7F1A",
                    },
                  }}
                >
                  Create services
                </Button>
              </Link>
              {/* <Button
                backgroundColor="transparent"
                color="#F79009"
                sx={{
                  width: "100%",
                  marginTop: "1rem",
                  minWidth: "330px",
                  border: "1px solid #F79009",
                  maxWidth: {
                    xs: "100%",
                    md: "60%",
                    lg: "40%",
                  },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#F790091E",
                  },
                }}
              >
                Run Ads
              </Button> */}
            </div>
          </Container>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default ServiceProviderNoAppointments;
