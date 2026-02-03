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
import notification from "../../assets/Images/notification-status.svg";
import IncomingAppointmentRef from "../../Components/SharedComponents/IncomingAppointmentRef";

const ServiceProviderHome = () => {
  const dialogRef = React.useRef(null);
  const incomingAppointRef = React.useRef(null);

  React.useEffect(() => {
    incomingAppointRef.current?.openDialog();
  }, []);

  return (
    <div className="pb-[8rem] ">
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
      <IncomingAppointmentRef incomingAppointRef={incomingAppointRef} />
      <div className=" mt-4 lg:mt-[8.5rem]" />
      <Header action={dialogRef} icon={notification}>
        Welcome back Tom
      </Header>
      <PageTransition>
        <Content useMargin={false}>
          <div className="w-full max-w-[45rem] mt-8">
            <MonthlyMetrics />
            <TimeActive />
            <QuickAction />
          </div>
        </Content>
      </PageTransition>
    </div>
  );
};

export default ServiceProviderHome;
