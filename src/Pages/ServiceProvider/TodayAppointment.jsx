import React from "react";
import ReviewedService from "../../Components/WebComponents/ReviewedService";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import Header from "../../Components/SharedComponents/Header";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import Content from "../../Components/SharedComponents/Content";
import Navbar from "../../Components/ServiceProvider/Navbar";
import { todaysAppointment as initialAppointments } from "../../data/todayAppointment";
import ServiceActionCardsSP from "../../Components/ServiceProvider/ServiceActionCardsSP";
import ReschedulingDialog from "../../Components/SharedComponents/EditAppointmentDialog";
import { getStepByStatus } from "../../Utils/updateStatus";
import CancelDialog from "../../Components/SharedComponents/CancelDialog";

const TodayAppointment = () => {
  const reschedulRef = React.useRef(null);
  const cancelDialogRef = React.useRef(null);
  const [selectedCardId, setSelectedCardId] = React.useState(null);
  const [appointments, setAppointments] = React.useState(initialAppointments);

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

  return (
    <div>
      <div className="w-full pr-0 lg:pr-4 pb-[8rem] md:pb-20">
        <ConatinerWidth>
          <Sidebar
            activeBgColor="#FEF0C7"
            activeTextColor="text-orange_gold"
            navType="sp"
          />
          <Navbar />
          <ReschedulingDialog
            onUpdate={handleStatusUpdate}
            selectedCard={selectedCard}
            reschedulRef={reschedulRef}
          />
          <CancelDialog
            selectedCard={selectedCard}
            cancelDialogRef={cancelDialogRef}
          />

          <div>
            <div className="mt-4 lg:mt-[8.5rem]" />
            <Header iconPresence={false}>
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={arrowLeft} alt="arrow left icon" />
                Today's Appointment
              </div>
            </Header>

            <PageTransition>
              <Content useMargin={false}>
                <h1 className="text-[#667085] text-xl font-medium mt-4">
                  Upcoming Appointments
                </h1>
                <p className="text-center md:text-left text-medium text-gray mt-2 mb-4">
                  Whenever you start delivering a service, Please do well to
                  Edit status, to show you are active and hence get more
                  customers.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lgl:grid-cols-3 gap-4 gap-y-4 md:gap-y-16">
                  {appointments?.map((appointment) => (
                    <ServiceActionCardsSP
                      key={appointment.id}
                      details={appointment}
                      reschedulRef={reschedulRef}
                      cancelDialogRef={cancelDialogRef}
                      setSelectedCard={() => setSelectedCardId(appointment.id)}
                    />
                  ))}
                </ul>
              </Content>
            </PageTransition>
          </div>
        </ConatinerWidth>
      </div>
    </div>
  );
};

export default TodayAppointment;
