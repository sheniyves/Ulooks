import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import WithdrawForm from "../../Components/WebComponents/WithdrawForm";

const Withdraw = () => {
  const navigate = useNavigate();
  return (
    <div className=" mt-6  pb-20">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <PageTransition>
          <div className="flex items-center justify-between  max-w-full xl:max-w-[75%] ">
            <Header iconPresence  onClick={() => navigate(-1)}>
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={arrowLeft} alt="arrow left icon" />
                Withdraw
              </div>
            </Header>
          </div>
          <div>
            <Content useMargin={false}>
              <div className="  w-full max-w-full lg:max-w-[31.25rem]   ">
                <WithdrawForm />
              </div>
            </Content>
          </div>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default Withdraw;
