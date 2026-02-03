import React from "react";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Navbar from "../../Components/SharedComponents/Navbar";
import Header from "../../Components/SharedComponents/Header";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import Content from "../../Components/SharedComponents/Content";
import MobileNavbar from "../../Components/WebComponents/MobileNavbar";
import { useParams } from "react-router-dom";
import { services } from "../../data/barbingService";
import ServiceCard from "../../Components/WebComponents/ServiceCard";
import { useSelector } from "react-redux";
import Info from "./Info";
import userIcon from "../../assets/Images/user.svg";
import calendar from "../../assets/Images/calendar.svg";
import CheckoutPriceCard from "./CheckoutPriceCard";
import MonthsRow from "../../Components/WebComponents/MonthsRow";

const BookingCheckout = () => {
  const { serviceId } = useParams();
  const service = services.find((service) => service.id === serviceId);
  const subscribed = useSelector((state) => state.bookings.subscribed);

  console.log({ subscribed });
  const userData = useSelector((state) => {
    const {
      person,
      availableTime,
      date,
      bookingsForm,
      subService,
      monthsSubscribed,
      frequencyPerMonth,
      timeFrame,
    } = state.bookings;
    // Log everything clearly
    // console.log("🧍‍♂️ Person:", person);
    // console.log("⏰ Available Time:", availableTime);
    // console.log("📅 Date:", date);
    // console.log("📄 Bookings Form:", bookingsForm);
    // console.log("🧰 Sub Service:", subService);
    // console.log("🧰 Time frame:", timeFrame);
    // console.log("🗓️ Months Subscribed:", monthsSubscribed);
    // console.log("🔁 Frequency Per Month:", frequencyPerMonth);
    return {
      person,
      availableTime,
      date,
      bookingsForm,
      subService,
      monthsSubscribed,
      frequencyPerMonth,
      timeFrame,
    };
  });

  const customerFormDetails = Object.values(userData?.bookingsForm);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="pb-[8rem] relative">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
      <div  className=" mt-4 lg:mt-[8.5rem]" />
        <Header iconPresence={false}>
          <div className="flex items-center gap-2">
            <img src={arrowLeft} alt="arrow left" />
            Booking Checkout
          </div>
        </Header>
        <PageTransition>
          <Content useMargin={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-20 mt-4 ">
              <div>
                <ServiceCard service={service} />
                <div className="mt-6" />
                <Info
                  icon={userIcon}
                  title={"Customer Info"}
                  extraInfo={`For ${userData?.person}`}
                  info={customerFormDetails}
                />
                {subscribed && (
                  <>
                    <p className="text-[#667085] font-medium">
                      Subcribed for {userData?.monthsSubscribed.length} Months
                    </p>
                    <MonthsRow selectedMonth={userData?.monthsSubscribed} />
                    <p className="text-[#667085] font-medium mt-4">
                      {userData?.frequencyPerMonth}
                    </p>
                  </>
                )}
                <div className="mt-6" />
                <Info
                  icon={calendar}
                  title="Date & Time"
                  info={[`${userData?.date} - ${userData?.availableTime}`]}
                />
              </div>
              <div>
                <CheckoutPriceCard subServices={userData?.subService} />
              </div>
            </div>
          </Content>
        </PageTransition>
        <MobileNavbar />
      </ConatinerWidth>
    </div>
  );
};

export default BookingCheckout;
