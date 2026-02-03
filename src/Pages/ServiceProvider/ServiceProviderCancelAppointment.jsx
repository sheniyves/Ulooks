import React from "react";
import { useParams } from "react-router-dom";
import { todaysAppointment } from "../../data/todayAppointment";
import ReviewedService from "../../Components/WebComponents/ReviewedService";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import Header from "../../Components/SharedComponents/Header";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import Content from "../../Components/SharedComponents/Content";
import CancelFormsp from "../../Components/ServiceProvider/CancelFormsp";
import Navbar from "../../Components/ServiceProvider/Navbar";

const CancelAppointments = () => {
  const { serviceId } = useParams();
  const canceledService = todaysAppointment.find(
    (service) => String(service.id) === serviceId
  );
  console.log({ canceledService });

  return (
    <div>
      <div className="w-full  pb-10 md:pb-20">
        <ConatinerWidth>
          <Sidebar
            activeBgColor="#FEF0C7"
            activeTextColor="text-orange_gold"
            navType="sp"
          />
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
                      <ReviewedService
                        forSp={false}
                        service={canceledService}
                      />
                    </div>

                    <CancelFormsp />
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
