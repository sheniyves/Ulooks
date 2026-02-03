import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import { IconButton } from "@mui/material";
import queueIcon from "../../assets/Images/queue.svg";
import plusIcon from "../../assets/Images/add-square.svg";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import UpcomingAppointments from "../../Components/WebComponents/UpcomingAppointments";
import History from "../../Components/WebComponents/History";
import SlideOption from "../../Components/SharedComponents/SlideOption";
import { services } from "../../data/barbingService";
import ServiceActionCards from "../../Components/WebComponents/ServiceActionCards";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../Utils/presistStorage";
import { Link } from "react-router-dom";

const CustomerAppointments = () => {
  const [activeIndex, setActiveIndex] = React.useState(() =>
    getFromLocalStorage("appointments", 0)
  );
  React.useEffect(() => {
    setToLocalStorage("appointments", activeIndex);
  }, [activeIndex]);
  const upcomingServices = services?.slice(0, 2);
  const handleButtonToggle = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="pb-[8rem] relative overflow-hidden">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <PageTransition>
          <div className="flex items-center justify-between max-w-full xl:max-w-[72.5%] ">
            <div className="relative w-full ">
              <div className=" mt-4 lg:mt-[8.5rem]" />
              <Header iconPresence={false}>Appointments</Header>
              <div className="flex items-end -mb-4  absolute   right-4 bottom-0">
                <Link to={"/customerWebApp/queue"}>
                  <IconButton>
                    <img src={queueIcon} alt="Queue icon" />
                  </IconButton>
                </Link>
                <IconButton>
                  <img src={plusIcon} alt="Plus icon" />
                </IconButton>
              </div>
            </div>
          </div>
          <Content useMargin={false}>
            {window.innerWidth > 1024 && (
              <div>
                <UpcomingAppointments>
                  {upcomingServices.map((appointment, idx) => (
                    <ServiceActionCards key={idx} details={appointment} />
                  ))}
                </UpcomingAppointments>
                <PageTransition duration={0.5}>
                  <div className="-mr-10">
                    <History>
                      {services
                        .slice(0, 1)
                        .concat(services.slice(2))
                        .map((appointment, idx) => (
                          <ServiceActionCards done={true} key={idx} details={appointment} />
                        ))}
                    </History>
                  </div>
                </PageTransition>
              </div>
            )}
            <div>
              {window.innerWidth < 1025 && (
                <>
                  <div className="max-w-[35.125rem] mx-auto mt-10 mb-6">
                    <SlideOption
                      setActiveIndex={handleButtonToggle}
                      activeIndex={activeIndex}
                      label={""}
                      options={["Active booking", "History"]}
                    />
                  </div>
                  <PageTransition key={activeIndex}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeIndex === 0 &&
                        upcomingServices.map((appointment, idx) => (
                          <ServiceActionCards key={idx} details={appointment} />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeIndex === 1 &&
                        services.map((appointment, idx) => (
                          <ServiceActionCards done={true} key={idx} details={appointment} />
                        ))}
                    </div>
                  </PageTransition>
                </>
              )}
            </div>
          </Content>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default CustomerAppointments;
