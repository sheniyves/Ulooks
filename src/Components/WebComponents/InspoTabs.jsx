import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InfiniteVideoScroll from "./InfiniteVideoScroll";

const InspoTabs = ({ value, onSelect }) => {
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box>
          <TabList
            disableripple="true"
            onChange={onSelect}
            aria-label="Inspiration tabs"
            sx={{
              paddingInline: "1rem",
              "& .MuiTabs-indicator": {
                backgroundColor: "#6A0DAD",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#6A0DAD",
                textTransform: "none",
                fontWeight: "bold",
              },
              "& .MuiTab-root": {
                textTransform: "none",
              },
            }}
          >
            <Tab disableripple="true" label="For You" value="1" />
            <Tab disableripple="true" label="Saved" value="2" />
            <Tab disableripple="true" label="Following" value="3" />
          </TabList>
        </Box>
        <TabPanel sx={{ paddingInline: "0" }} value="1">
          <InfiniteVideoScroll />
        </TabPanel>
        <TabPanel sx={{ paddingInline: "0" }} value="2">
          Item Two
        </TabPanel>
        <TabPanel sx={{ paddingInline: "0" }} value="3">
          Item Three
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default InspoTabs;
