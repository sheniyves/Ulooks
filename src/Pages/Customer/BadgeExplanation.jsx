import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import { useNavigate, useLocation } from "react-router-dom";
import badge1 from "../../assets/Images/sp_badge_grade_1.svg";
import badge2 from "../../assets/Images/sp_badge_grade_2.svg";
import badge3 from "../../assets/Images/sp_badge_grade_3.svg";
import badge4 from "../../assets/Images/sp_badge_grade_4.svg";
import WithdrawForm from "../../Components/WebComponents/WithdrawForm";

const BadgeExplanation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className=" mt-6 pb-20">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <PageTransition>
          <div className="flex items-center justify-between  max-w-full xl:max-w-[75%] ">
            <Header
              iconPresence 
              onClick={() => navigate(location.state.previousUrl)}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={arrowLeft} alt="arrow left icon" />
                Badge Explained
              </div>
            </Header>
          </div>
          <div>
            <Content useMargin={false}>
              <div className="  w-full max-w-full lg:max-w-[31.25rem]   ">
                <p className="text-darkPurple text-base font-medium my-4">
                  At Ulooks, we celebrate the hard work of our service Providers
                  and progress. Every service provider on our platform earns a
                  badge that shows customers their experience and reliability.
                </p>
                <ul className="space-y-4">
                  {badgeExplanation.map((d, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <img src={d.icon} alt={`${d.icon} Icon`} />
                      <div>
                        <h2 className="text-xl font-bold font-fashion text-darkerPurple">
                          {d.label}
                        </h2>
                        <p className="text-darkPurple text-sm font-medium">
                          {d.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Content>
          </div>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default BadgeExplanation;

const badgeExplanation = [
  {
    icon: badge1,
    label: "Starter Stylist",
    desc: "Everyone begins here once they join Ulooks.",
  },
  {
    icon: badge2,
    label: "Growing Pro",
    desc: "After completing 1000 appointments with minimum of 3.5 rating the Service Provider will level up to Growing Pro.",
  },
  {
    icon: badge3,
    label: "Trusted Expert",
    desc: "With 3000 successful appointments with minimum of 4.0 rating the Service Provider will become a Trusted Expert.",
  },
  {
    icon: badge4,
    label: "Service Master",
    desc: "At 5000 appointments with minimum of 4.5 rating, the Service Provider will achieve the highest rank: Service Master.",
  },
];
