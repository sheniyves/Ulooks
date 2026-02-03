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
    <div className=" mt-0 lg:mt-6 min-h-screen relative">
      <ConatinerWidth>
        <DownloadApp downloadOnAppRef={downloadOnAppRef} />
        <UploadInspo uploadRef={uploadRef} uploadRefDialog={uploadRefDialog} />
        <div className="ml-0 lg:ml-[310px] mt-0 lg:mt-[5.7rem] bg-[#E7CBFB] sticky top-0 z-10">
          <div className=" px-4 md:px-0 flex items-center justify-between mx-auto max-w-[31.25rem] h-16 md:h-14">
            <h3 className="text-sm font-bold text-darkPurple">
              Activate lite mode for less content
            </h3>
            <Button
              sx={{
                borderRadius: "2rem",
                fontWeight: "normal",
                height: "38px",
                width: "7.25rem",
              }}
              onClick={() => downloadOnAppRef.current?.openDialog()}
            >
              Turn On
            </Button>
          </div>
        </div>

        <Sidebar />
        <Navbar />

        <PageTransition>
          {/* <Content useMargin={false}> */}
          <div className="ml-0 lg:ml-[320px]">
            <div className="  sticky top-60 w-full mx-auto max-w-full md:max-w-[31.25rem] mt-4">
              <div className="flex items-center justify-between px-4">
                <h2 className="font-bold text-transparent bg-gold-purple inline-block bg-clip-text font-fashion text-[1.76rem]">
                  Inspiration
                </h2>
                <IconButton
                  onClick={() => uploadRefDialog.current?.openDialog()}
                >
                  <img src={addPlus} alt="Add icon" />
                </IconButton>
              </div>
              <InspoTabs value={value} onSelect={handleChange} />
            </div>
          </div>
          {/* </Content> */}
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default CustomerInspiration;
