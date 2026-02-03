import React from "react";
import { useParams } from "react-router-dom";
import { services } from "../../data/barbingService";
import ReviewedService from "../../Components/WebComponents/ReviewedService";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import Header from "../../Components/SharedComponents/Header";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import Content from "../../Components/SharedComponents/Content";
import CancelForm from "../../Components/WebComponents/CancelForm";

const CancelAppointments = () => {
  const { serviceId } = useParams();
  const canceledService = services.find((service) => service.id === serviceId);

  return (
    <div>
      <div className="w-full  pb-[2rem] md:pb-20">
        <ConatinerWidth>
          <Sidebar />
          <Navbar />
          <PageTransition>
            <div>
              <div className=" mt-4 lg:mt-[8.5rem]" />
              <Header iconPresence={false}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src={arrowLeft} alt="arrow left icon" />
                  Cancel Appointment
                </div>
              </Header>
              <Content useMargin={false}>
                <div className=" mx-auto lg:mx-0 max-w-full md:max-w-[85%]">
                  <div className="grid grid-cols-1 lg:grid-cols-[45%_63%] mt-4 gap-y-4 lg:gap-12">
                    <div>
                      <ReviewedService service={canceledService} />
                    </div>
                    
                    <CancelForm />
                  </div>
                </div>
              </Content>
            </div>
          </PageTransition>
          <div></div>
        </ConatinerWidth>
      </div>
    </div>
  );
};

export default CancelAppointments;
