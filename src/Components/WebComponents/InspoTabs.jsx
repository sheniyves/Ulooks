import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InfiniteVideoScroll from "./InfiniteVideoScroll";
import { ButtonBase, IconButton } from "@mui/material";
import UploadInspo from "./UploadInspo";
import addPlus from "../../assets/Images/addPlus.svg";
import { useDynamicScreen } from "../../Utils/screenWidth";

const InspoTabs = ({ value, onSelect }) => {
  const uploadRefDialog = React.useRef(null);
  const dynamicScreen = useDynamicScreen();
  const uploadRef = React.useRef(null);
  return (
    <div>
      <UploadInspo uploadRef={uploadRef} uploadRefDialog={uploadRefDialog} />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <div className=" overflow-hidden relative  w-full">
            <Box
              sx={{
                position: "fixed",
                top: dynamicScreen < 1024 ? 0 : 90,
                zIndex: 100,
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
              <TabList
                value={value}
                onChange={onSelect}
                aria-label="Inspiration tabs"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  px: "1rem",
                  whiteSpace: "nowrap",
                  "& .MuiTabs-flexContainer": {
                    alignItems: "center",
                  },

                  "& .MuiTabs-indicator": {
                    backgroundColor: "#6A0DAD",
                  },

                  "& .MuiTab-root": {
                    textTransform: "none",
                    minWidth: "auto",
                    px: 2,
                  },

                  "& .MuiTab-root.Mui-selected": {
                    color: "#6A0DAD",
                    fontWeight: "bold",
                  },
                }}
              >
                <Tab
                  disableripple="true"
                  label="For you"
                  value="1"
                  sx={{ color: "white", fontFamily: "urbanist" }}
                />
                <Tab
                  disableripple="true"
                  label="Following"
                  value="2"
                  sx={{ color: "white", fontFamily: "urbanist" }}
                />
                <Tab
                  disableripple="true"
                  label="Saved"
                  value="3"
                  sx={{ color: "white", fontFamily: "urbanist" }}
                />
                <Tab
                  disableripple="true"
                  label="Mine"
                  value="4"
                  sx={{ color: "white", fontFamily: "urbanist" }}
                />
                <div className=" mt-0 md:mt-1" />
                <ButtonBase
                  onClick={() => uploadRefDialog.current?.openDialog()}
                  sx={{
                    fontFamily: "urbanist",
                    borderRadius: "20px",
                    border: "1px solid white",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    paddingInline: "1rem",
                    color: "white",
                    height: "2rem",
                    gap: "4px",
                  }}
                >
                  Create
                  <img
                    src={addPlus}
                    alt="Add icon"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </ButtonBase>
              </TabList>
            </Box>
          </div>
          <div className="overflow-hidden">
            <TabPanel sx={{ paddingInline: "0", overflow: "hidden" }} value="1">
              <InfiniteVideoScroll />
            </TabPanel>
            <TabPanel sx={{ paddingInline: "0" }} value="2">
              Item Two
            </TabPanel>
            <TabPanel sx={{ paddingInline: "0" }} value="3">
              Item Three
            </TabPanel>
          </div>
        </TabContext>
      </Box>
    </div>
  );
};

export default InspoTabs;
