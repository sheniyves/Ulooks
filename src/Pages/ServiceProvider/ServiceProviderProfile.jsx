import React from "react";
import Navbar from "../../Components/ServiceProvider/Navbar";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Header from "../../Components/SharedComponents/Header";
import MonthlyMetrics from "../../Components/ServiceProvider/MonthlyMetrics";
import Content from "../../Components/SharedComponents/Content";
import TimeActive from "../../Components/ServiceProvider/TimeActive";
import QuickAction from "../../Components/ServiceProvider/QuickAction";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import Notification from "../../Components/WebComponents/Notification";
import { notifications } from "../../data/notification";
import profile from "../../assets/Images/profile_big_sp.png";
import SettingsCard from "../../Components/WebComponents/SettingsCard";
import backgroundIcon from "../../assets/Images/background-icon-orange.svg";
import SettingsCardsp from "../../Components/ServiceProvider/SettingsCardsp";
import Confetti from "../../Components/WebComponents/Confetti";

const ServiceProviderProfile = () => {
  const dialogRef = React.useRef(null);
  const incomingAppointRef = React.useRef(null);

  React.useEffect(() => {
    incomingAppointRef.current?.openDialog();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundIcon})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="pb-[8rem] bg-[#fec84b]"
    >
      <Navbar />
      <Notification
        dialogRef={dialogRef}
        unreadBackground={"bg-light_gold"}
        unreadTextColor={"text-yellow_gold"}
        notifications={notifications}
      />
      <Sidebar
        activeBgColor="#FEF0C7"
        activeTextColor="text-orange_gold"
        navType="sp"
      />
      <PageTransition>
        <div className="flex items-center justify-between max-w-full xl:max-w-[75%] ">
          <Header iconPresence={false}>Profile</Header>
        </div>
        <div className=" pl-0 md:pl-4">
          <Content useMargin={false}>
            <div className=" mt-4 flex flex-row  md:flex-col gap-4 items-center justify-center w-full max-w-full lg:max-w-[20.56rem]  ml-0 lg:ml-10 ">
              
              <img
                src={profile}
                alt="profile picture"
                className="max-w-[6.75rem] md:max-w-[8.75rem]"
              />
              <div className="text-left md:text-center">
                <h2 className="font-fashion mt-4 mb-2 font-bold  text-[1.75rem] text-[#dc6803]">
                  Tom Lockwood
                </h2>
                <p className="text-yellow_gold font-semibold text-lg text-center mt-2 max-w-[46rem]">
                  Johnjakedoe@gmail.com
                </p>
                <p className="text-yellow_gold font-semibold text-lg text-center mt-2 max-w-[46rem]">
                  +234 81168392563
                </p>
              </div>
            </div>
            <div className="ml-0 lg:ml-10 max-w-full lg:max-w-[20.56rem] ">
              <SettingsCardsp />
            </div>
          </Content>
        </div>
      </PageTransition>
    </div>
  );
};

export default ServiceProviderProfile;
//Yay