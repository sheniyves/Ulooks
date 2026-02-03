import React, { useRef } from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import Content from "../../Components/SharedComponents/Content";
import Header from "../../Components/SharedComponents/Header";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import IconBackground from "../../assets/Images/formIcons.svg";
import SettingsCard from "../../Components/WebComponents/SettingsCard";
import WalletCard from "../../Components/WebComponents/WalletCard";
import RecentlyUsedService from "../../Components/WebComponents/RecentlyUsedServiceProvidert";
import TransactionHistory from "../../Components/WebComponents/TransactionHistory";
import Button from "../../Components/WebComponents/Button";
import addPlus from "../../assets/Images/addPlus.svg";
import { IconButton, styled, TextField } from "@mui/material";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import DownloadApp from "../../Components/WebComponents/DownloadApp";
import InspoTabs from "../../Components/WebComponents/InspoTabs";
import InfiniteVideoScroll from "../../Components/WebComponents/InfiniteVideoScroll";
import AlertDialog from "../../Components/SharedComponents/AlertDialog";
import UploadInspo from "../../Components/WebComponents/UploadInspo";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import { Link, useLocation } from "react-router-dom";

const CreatePost = () => {
  const location = useLocation();
  const post = location.state?.file || null;
  const downloadOnAppRef = useRef(null);
  const uploadRefDialog = useRef(null);
  const CustomizedTextField = styled(TextField)({
    "& .label.Mui-focused": {
      color: "red",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#6A0DAD",
      borderBottomWidth: "2px",
    },
    "& .MuiInput-underline:hover": {
      borderBottomColor: "#6A0DAD",
      borderBottomWidth: ".6px",
    },
  });

  return (
    <div className=" mt-0 lg:mt-6 min-h-screen relative">
      <ConatinerWidth>
        <DownloadApp downloadOnAppRef={downloadOnAppRef} />
        <div className="ml-0 lg:ml-[310px] mt-0 lg:mt-[5.7rem] bg-[#FEF0C7] sticky top-0 z-10">
          <div className=" px-4 md:px-0 flex items-center justify-between mx-auto max-w-[31.25rem] h-16 md:h-14">
            <h3 className="text-sm font-bold text-darkPurple">
              Activate lite mode for less content
            </h3>
            <Button
              backgroundColor="#F79009"
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
          <Content useMargin={false}>
            <div className="sticky top-60 w-full mx-auto max-w-full md:max-w-[31.25rem] mt-4">
              <div className="flex items-center justify-between">
                <Link to={"/serviceProviderWebApp/inspiration"}>
                  <div className="flex items-center gap-2">
                    <img src={arrowLeft} alt="arrow left icon to go back" />
                    <h2 className="font-bold text-transparent bg-gold-purple inline-block bg-clip-text font-fashion text-[1.76rem]">
                      Add Post
                    </h2>
                  </div>
                </Link>
                <IconButton
                  onClick={() => uploadRefDialog.current?.openDialog()}
                >
                  <img src={addPlus} alt="Add icon" />
                </IconButton>
              </div>
              <div className="mt-4" />
              <img
                src={URL.createObjectURL(post)}
                alt="selected image to post"
              />
              <form className="my-4 pb-20" action="">
                <CustomizedTextField
                  id="standard-basic"
                  label="Add some writeup..."
                  variant="standard"
                  fullWidth
                />
                <Button
                  backgroundColor="#F79009"
                  sx={{ width: "100%", marginTop: "6rem" }}
                  type="submit"
                >
                  Post
                </Button>
              </form>
            </div>
          </Content>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default CreatePost;
