import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import { IconButton } from "@mui/material";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import UpcomingAppointments from "../../Components/WebComponents/UpcomingAppointments";
import History from "../../Components/WebComponents/History";
import SlideOption from "../../Components/SharedComponents/SlideOption";
import { services } from "../../data/barbingService";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../Utils/presistStorage";
import ServiceActionCardsSP from "../../Components/ServiceProvider/ServiceActionCardsSP";
import { todaysAppointment as initialAppointments } from "../../data/todayAppointment";
import Navbar from "../../Components/ServiceProvider/Navbar";
import EditAppointmentDialog from "../../Components/SharedComponents/EditAppointmentDialog";
import { getStepByStatus } from "../../Utils/updateStatus";
import CancelDialog from "../../Components/SharedComponents/CancelDialog";

const ServiceProviderAppointment = () => {
  const [activeIndex, setActiveIndex] = React.useState(() =>
    getFromLocalStorage("appointments", 0)
  );
  const [appointments, setAppointments] = React.useState(initialAppointments);
  React.useEffect(() => {
    setToLocalStorage("appointments", activeIndex);
  }, [activeIndex]);
  const [selectedCardId, setSelectedCardId] = React.useState(null);
  const upcomingServices = services?.slice(0, 2);
  const handleButtonToggle = (index) => {
    setActiveIndex(index);
  };
  const cancelDialogRef = React.useRef(null);
  const reschedulRef = React.useRef(null);
  const selectedCard = React.useMemo(() => {
    return appointments.find((a) => a.id === selectedCardId);
  }, [selectedCardId, appointments]);

  const handleStatusUpdate = (serviceId, newStatus) => {
    setAppointments((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? { ...service, status: newStatus, step: getStepByStatus(newStatus) }
          : service
      )
    );
  };

  console.log({ selectedCardId });
  return (
    <div className="pb-[8rem] relative overflow-hidden">
      <ConatinerWidth>
        <Sidebar
          activeBgColor="#FEF0C7"
          activeTextColor="text-orange_gold"
          navType="sp"
        />
        <Navbar />

        <EditAppointmentDialog
          onUpdate={handleStatusUpdate}
          selectedCard={selectedCard}
          reschedulRef={reschedulRef}
        />
        <CancelDialog
          selectedCard={selectedCard}
          cancelDialogRef={cancelDialogRef}
        />
        <PageTransition>
          <div className="flex items-center justify-between max-w-full xl:max-w-[72.5%] ">
            <div className="relative w-full ">
              <div className=" mt-4 lg:mt-[8.5rem]" />
              <Header iconPresence={false}>Appointments</Header>
            </div>
          </div>
          <Content useMargin={false}>
            {window.innerWidth > 1024 && (
              <div>
                <UpcomingAppointments>
                  {appointments.map((appointment) => (
                    <ServiceActionCardsSP
                      key={appointment.id}
                      details={appointment}
                      reschedulRef={reschedulRef}
                      cancelDialogRef={cancelDialogRef}
                      setSelectedCard={() => setSelectedCardId(appointment.id)}
                      selectedCardId={selectedCardId}
                    />
                  ))}
                </UpcomingAppointments>
                <PageTransition duration={0.5}>
                  <div className="-mr-10">
                    <History>
                      {appointments
                        .slice(0, 1)
                        .concat(appointments.slice(2))
                        .map((appointment) => (
                          <ServiceActionCardsSP
                            key={appointment.id}
                            details={appointment}
                            reschedulRef={reschedulRef}
                            cancelDialogRef={cancelDialogRef}
                            setSelectedCard={() =>
                              setSelectedCardId(appointment.id)
                            }
                            selectedCardId={selectedCardId}
                          />
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
                      background="bg-orange_gold"
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
                          <ServiceActionCardsSP
                            key={idx}
                            details={appointment}
                            reschedulRef={reschedulRef}
                            selectedCardId={selectedCardId}
                          />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeIndex === 1 &&
                        services.map((appointment, idx) => (
                          <ServiceActionCardsSP
                            isDone={true}
                            key={idx}
                            details={appointment}
                            selectedCardId={selectedCardId}
                          />
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

export default ServiceProviderAppointment;
