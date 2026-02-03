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
import WalletCard from "../../Components/WebComponents/WalletCard";
import RecentlyUsedService from "../../Components/WebComponents/RecentlyUsedServiceProvidert";
import TransactionHistory from "../../Components/WebComponents/TransactionHistory";

const CustomerWallet = () => {
  return (
    <div className="pb-[8rem] mt-6 min-h-screen">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <PageTransition>
          <div className="flex items-center justify-between  max-w-full xl:max-w-[75%] ">
            <Header iconPresence={false}>Wallet</Header>
          </div>
          <div>
            <Content useMargin={false}>
              <div className="  w-full max-w-full lg:max-w-[31.25rem]   ">
                <WalletCard />
                <RecentlyUsedService />
                <TransactionHistory />
              </div>
            </Content>
          </div>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default CustomerWallet;
