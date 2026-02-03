import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";

import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import History, {
  TransactionHistoryRows,
} from "../../Components/WebComponents/TransactionHistory";
import { fulltransactionData } from "../../data/transactionData";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { ButtonBase } from "@mui/material";

const TransactionHistory = () => {
  const navigate = useNavigate();
  return (
    <div className="pb-[8rem] mt-6 min-h-screen">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <PageTransition>
          <div className="flex items-center justify-between  max-w-full xl:max-w-[75%] ">
            <Header onClick={() => navigate(-1)} iconPresence={false}>
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={arrowLeft} alt="arrow left icon" />
                Transaction History
              </div>
            </Header>
          </div>
          <div className="mt-8">
            <Content useMargin={false}>
              <div className="  w-full max-w-full lg:max-w-[31.25rem]   ">
                <ul className="mt-6">
                  {fulltransactionData?.slice(0, 7).map((data, idx) => (
                    <TransactionHistoryRows  data={data} key={idx} />
                  ))}
                </ul>
                <div className=" mt-12 rounded-lg shadow-sm bg-[#F9F4FC] text-darkPurple font-bold max-w-[40%] mx-auto">
                  <ButtonBase
                    sx={{
                      width: "100%",
                      height: "100%",
                     
                      display: "flex",
                      alignItems: "center",
                      gap: ".2rem",
                      padding: "5px 10px",
                      borderRadius: ".5rem",
                    }}
                  >
                    Load More
                  </ButtonBase>
                </div>
              </div>
            </Content>
          </div>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default TransactionHistory;
