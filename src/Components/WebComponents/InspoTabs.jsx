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

const InspoTabs = ({ value, onSelect }) => {
  const uploadRefDialog = React.useRef(null);
  const uploadRef = React.useRef(null);
  return (
    <div>
      <UploadInspo uploadRef={uploadRef} uploadRefDialog={uploadRefDialog} />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value} >
          <div className="-blur-md overflow-hidden bg-white/30 border-b border-black/60 shadow-xl w-full">
            <Box
              sx={{
                position: "fixed",
                zIndex: 100,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                dropShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                width: "100%",
                // minWidth: "39.5%",
                // width: "100%",
              }}
            >
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
              <InfiniteVideoScroll  />
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
