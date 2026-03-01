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
import { getFromLocalStorage } from "../../Utils/presistStorage";
import { userProfile } from "../../api/profile";
import { useQueryFn } from "../../../hooks/queryFn";
import { Tooltip, Zoom } from "@mui/material";
import { getBadgeType } from "../../Utils/formattingFunction";

const CustomerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, phone_number } = getFromLocalStorage(
    "customerData",
    "User",
  );
  const { data } = useQueryFn({
    key: ["userProfile"],
    fun: userProfile,
  });
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
                <div className="relative ">
                  <img
                    src={data?.profile_picture_url || profile}
                    alt="profile picture"
                    className="w-[8.75rem] h-[8.75rem] object-cover rounded-full border-2 border-gold"
                  />
                  <Tooltip
                    title={data?.badge}
                    slots={{
                      transition: Zoom,
                    }}
                  >
                    <img
                      src={getBadgeType(data?.badge)}
                      alt={`${data?.name}badge`}
                      className="max-w-[2.75rem] absolute top-0 right-0 cursor-pointer"
                      onClick={() => {
                        navigate("/customerWebApp/badgeExplanation", {
                          previousUrl: location.pathname,
                        });
                      }}
                    />
                  </Tooltip>
                </div>
                <div className="text-left md:text-center">
                  <h2 className="font-fashion capitalize mt-4 mb-2 font-bold  text-[1.75rem] text-[#6A0DAD] text-center">
                    {name}
                  </h2>
                  <p className="text-darkPurple font-semibold text-lg text-center  max-w-[46rem]">
                    {email}
                  </p>
                  <p className="text-darkPurple font-semibold text-lg text-center  max-w-[46rem]">
                    {data?.phone_number || phone_number}
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
