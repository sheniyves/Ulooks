import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";

import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import IconBackground from "../../assets/Images/formIcons.svg";
import profile from "../../assets/Images/bigProfile.svg";
import SettingsCard from "../../Components/WebComponents/SettingsCard";
import badge1 from "../../assets/Images/sp_badge_grade_1.svg";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${IconBackground})` }}
      className="pb-[8rem] pt-6 relative bg-[#e7cbfb] min-h-screen"
    >
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <PageTransition>
          <div className="flex items-center justify-between max-w-full xl:max-w-[75%] ">
            <Header iconPresence={false}>Profile</Header>
          </div>
          <div className=" pl-0 md:pl-4">
            <Content useMargin={false}>
              <div className="  flex flex-col md:flex-col items-center justify-center w-full max-w-full lg:max-w-[20.56rem]  ml-0 lg:ml-10 ">
                <div className="relative">
                  <img
                    src={profile}
                    alt="profile picture"
                    className="max-w-[8.75rem]"
                  />
                  <img
                    src={badge1}
                    alt="John jake doe badge"
                    className="max-w-[2.75rem] absolute top-0 right-0 cursor-pointer"
                    onClick={() => {
                      navigate("/customerWebApp/badgeExplanation", {
                        previousUrl: location.pathname,
                      });
                    }}
                  />
                </div>
                <div className="text-left md:text-center">
                  <h2 className="font-fashion mt-4 mb-2 font-bold  text-[1.75rem] text-[#6A0DAD]">
                    John Jake Doe
                  </h2>
                  <p className="text-darkPurple font-semibold text-lg text-center mt-2 max-w-[46rem]">
                    Johnjakedoe@gmail.com
                  </p>
                  <p className="text-darkPurple font-semibold text-lg text-center mt-2 max-w-[46rem]">
                    +234 81168392563
                  </p>
                </div>
              </div>
              <div className="ml-0 lg:ml-10 max-w-full lg:max-w-[20.56rem] ">
                <SettingsCard />
              </div>
            </Content>
          </div>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default CustomerProfile;
