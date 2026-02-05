import { Box } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Drawer as MUIDrawer } from "@mui/material";

const Drawer = forwardRef(({ children }, ref) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: {
        xs: "100vw", 
        md: "100%",  
        lg: "46.5625rem",
        },
        minWidth: "51vw",
        paddingInline: "1.3rem",
        paddingBottom: "5rem",
      }}
      role="presentation"
    >
      {children}
    </Box>
  );

  useImperativeHandle(ref, () => ({
    openDrawer: () => toggleDrawer(true),
    closeDrawer: () => toggleDrawer(false),
  }));

  return (
    <div>
      <MUIDrawer  elevation={2} anchor="right" open={open} onClose={() => toggleDrawer(true)} >
      {/* <MUIDrawer hideBackdrop elevation={2} anchor="right" open={open} onClose={() => toggleDrawer(false)}> */}
        {DrawerList}
      </MUIDrawer>
    </div>
  );
});

export default Drawer;
