import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import { Link } from "react-router-dom";
import { queuedServices } from "../../data/queuedServices";
import QueuedServiceCards from "../../Components/WebComponents/QueuedServiceCards";

const Queue = () => {
  return (
    <div className="pb-[8rem] relative overflow-hidden">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <PageTransition>
          <div className="flex items-center justify-between max-w-full xl:max-w-[72.5%] ">
            <div className="relative w-full ">
              <div className=" mt-4 lg:mt-[8.5rem]" />
              <Link className=" inline" to={"/customerWebApp/appointments"}>
                <Header iconPresence={false}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img src={arrowLeft} alt="arrow left icon" />
                    Queue
                  </div>
                </Header>
              </Link>
            </div>
          </div>
          <Content useMargin={false}>
            <ul className="grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 gap-y-4 gap-4 md:gap-y-8 mt-6">
              {queuedServices.map((service) => (
                <QueuedServiceCards key={service.id} details={service} />
              ))}
            </ul>
          </Content>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default Queue;
