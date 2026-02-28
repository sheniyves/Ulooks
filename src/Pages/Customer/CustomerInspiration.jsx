import React, { useRef } from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import IconBackground from "../../assets/Images/formIcons.svg";
import profile from "../../assets/Images/bigProfile.svg";
import SettingsCard from "../../Components/WebComponents/SettingsCard";
import WalletCard from "../../Components/WebComponents/WalletCard";
import RecentlyUsedService from "../../Components/WebComponents/RecentlyUsedServiceProvidert";
import TransactionHistory from "../../Components/WebComponents/TransactionHistory";
import Button from "../../Components/WebComponents/Button";
import addPlus from "../../assets/Images/addPlus.svg";
import { IconButton } from "@mui/material";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import DownloadApp from "../../Components/WebComponents/DownloadApp";
import InspoTabs from "../../Components/WebComponents/InspoTabs";
import InfiniteVideoScroll from "../../Components/WebComponents/InfiniteVideoScroll";
import AlertDialog from "../../Components/SharedComponents/AlertDialog";
import UploadInspo from "../../Components/WebComponents/UploadInspo";

const CustomerInspiration = () => {
  const downloadOnAppRef = useRef(null);
  const uploadRefDialog = useRef(null);
  const uploadRef = useRef(null);

  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="   min-h-screen relative">
      <UploadInspo uploadRef={uploadRef} uploadRefDialog={uploadRefDialog} />
      <ConatinerWidth>
        <DownloadApp downloadOnAppRef={downloadOnAppRef} />
        <Sidebar />
        <Navbar />

        <PageTransition>
          {/* <Content useMargin={false}> */}
          <div className="ml-0 lg:ml-[320px]">
            <div className="  sticky  w-full mx-auto max-w-full md:max-w-[31.25rem] ">
              {/* <div className="flex items-center justify-between px-4">
                <h2 className="font-bold text-transparent bg-gold-purple inline-block bg-clip-text font-fashion text-[1.76rem]">
                  Inspiration
                </h2>
                <IconButton
                  onClick={() => uploadRefDialog.current?.openDialog()}
                >
                  <img src={addPlus} alt="Add icon" />
                </IconButton>
              </div> */}
              <div className="relative w-full h-full  ">
                <InspoTabs value={value} onSelect={handleChange} />
              </div>
            </div>
          </div>
          {/* </Content> */}
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default CustomerInspiration;
