import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import WithdrawForm from "../../Components/WebComponents/WithdrawForm";
import WithdrawFormSP from "../../Components/ServiceProvider/WalletFormSP";
import { motion } from "framer-motion";
import bookImage from "../../assets/Images/bookCalendar.svg";
import Navbar from "../../Components/ServiceProvider/Navbar";
import ManageAvailabilityForm from "../../Components/ServiceProvider/ManageAvailability";

const ServiceProviderAvailability = () => {
  const navigate = useNavigate();
  return (
    <div className="pb-[8rem] mt-6 min-h-screen">
      <ConatinerWidth>
        <Sidebar
          activeBgColor="#FEF0C7"
          activeTextColor="text-orange_gold"
          navType="sp"
        />
        <Navbar />
        <PageTransition>
          <div className="flex items-center justify-between  max-w-full xl:max-w-[75%] ">
            <Header iconPresence={false} onClick={() => navigate(-1)}>
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={arrowLeft} alt="arrow left icon" />
                Manage Availability
              </div>
            </Header>
          </div>
          <div>
            <Content useMargin={false}>
              <div className="  grid grid-cols-1 mdl:grid-cols-2 gap-10">
                <ManageAvailabilityForm />
                <img
                  className="hidden mdl:inline-block"
                  src={bookImage}
                  alt="Image of a book flipper calendar"
                />
              </div>
            </Content>
          </div>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default ServiceProviderAvailability;
