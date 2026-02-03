import React from "react";
import icons from "../../assets/Images/formIcons.svg";
import ticketFrame from "../../assets/Images/ticketFrame.svg";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { services } from "../../data/barbingService";
import calendar from "../../assets/Images/calendar.svg";
import userIcon from "../../assets/Images/user.svg";
import scissor from "../../assets/Images/scissorPurple.svg";
import Info from "./Info";
import { sub_Services } from "../../Components/WebComponents/SubServices";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import {
  getFrequencyCount,
  handleFormatting,
  handlePriceFormatting,
} from "../../Utils/formattingFunction";
import Button from "../../Components/WebComponents/Button";

const Ticket = () => {
  const { serviceId } = useParams();
  const userData = useSelector((state) => {
    const {
      person,
      availableTime,
      date,
      bookingsForm,
      subService,
      subscribed,
      monthsSubscribed,
      frequencyPerMonth,
    } = state.bookings;
    return {
      person,
      availableTime,
      date,
      bookingsForm,
      subService,
      subscribed,
      monthsSubscribed,
      frequencyPerMonth,
    };
  });

  const serviceName = services.find(
    (service) => service.id === serviceId
  )?.name;

  const subServices = sub_Services.filter((c) =>
    userData.subService.includes(c.id)
  );

  console.log(subServices);

  const totalAmount = subServices.reduce(
    (acc, service) => acc + service.amount,
    0
  );
  const ulooksCharges = totalAmount * 0.15;

  const expendedInfo = subServices.map((service) => {
    return {
      service: service.service,
      amount: service.amount,
    };
  });

  return (
    <ConatinerWidth>
      <div
        className="flex items-center justify-center px-4 min-h-screen "
        style={{
          backgroundImage: `url(${icons})`,
          backgroundSize: "contain",
          width: "100%",
        }}
      >
        <PageTransition>
          <div
            className="py-6 px-8 md:px-14 w-full min-w-[25rem] sm:min-w-[33rem] md:min-w-[37.5rem] min-h-[33.9rem] h-[100%] mb-[10%] ticket"
            style={{
              backgroundImage: `url(${ticketFrame})`,
              backgroundSize: "cover",
              height: "100%",
              width: "100%",
              maxWidth: "37.5rem",
              maxHeight: "33.9rem",
            }}
          >
            <h2 className="font-fashion text-[1.755rem] text-darkPurple my-2">
              {serviceName || "Service Name Not Found"}
            </h2>
            <div>
              <Info
                icon={calendar}
                title="Date & Time"
                info={[`${userData?.date} - ${userData?.availableTime}`]}
              />
              <Info
                icon={userIcon}
                title={"Customer Info"}
                extraInfo={`For ${userData?.person}`}
                info={Object.values(userData?.bookingsForm)}
              />
              <Info
                icon={scissor}
                title={"Service(s) wanted"}
                extraInfo={`For ${userData?.person}`}
                expendedInfo={expendedInfo}
              />
              {userData?.subscribed && (
                <div className="flex items-center justify-between text-[#667085]">
                  {" "}
                  <p className="font-medium text-base "> Subscribed</p>
                  <p className="text-base font-medium">
                    {`${getFrequencyCount(userData?.frequencyPerMonth)} (times) x ${
                      userData?.monthsSubscribed.length
                    } Months`}
                  </p>{" "}
                </div>
              )}

              <div className="flex items-center justify-between text-[#667085]">
                <p className="font-medium text-base "> Charges</p>
                <p className="text-xl font-bold">
                  {handlePriceFormatting(ulooksCharges)}
                </p>
              </div>
              <div className="mt-4" />
              <div className="flex items-center justify-between text-darkPurple">
                <p className="font-bold text-xl ">Total</p>
                <p className="text-xl font-bold">
                  {handleFormatting(totalAmount + ulooksCharges)}
                </p>
              </div>
            </div>
          </div>
        </PageTransition>
      </div>
      <div className="mx-auto px-6 max-w-[36rem] my-5">
        <Link to={"/"}>
          <Button
            sx={{
              backgroundColor: "transparent",
              border: "2px solid #6A0DAD",
              marginInline: "auto",
              marginTop: "-6rem",
              width: "100%",
              color: "#6A0DAD",
              "&:hover": {
                backgroundColor: "#e0bbff ",
              },
            }}
          >
            Go Home
          </Button>
        </Link>
      </div>
    </ConatinerWidth>
  );
};

export default Ticket;
