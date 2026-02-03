import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Dialog, DialogTitle, Slide, ButtonBase } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MapDialog = forwardRef(
  ({ dialogTitle, action, icon, children, iconPresence = true }, ref) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useImperativeHandle(ref, () => ({
      openDialog: handleClickOpen,
      closeDialog: handleClose,
      isOpen: open,
    }));
    // if (!open) return null;
    return (
      <Dialog
        
        open={open}
        keepMounted
        onClose={handleClose}
        fullScreen
        disablePortal
        disableScrollLock
        hideBackdrop
        slots={{
          transition: Transition,
        }}
        slotProps={{
          paper: {
            sx: {
              zIndex: 12,
              position: "fixed",
            },
          },
          backdrop: {
            sx: {
              zIndex: 12,
            },
          },
          transition: {
            direction: "up",
          },
        }}
        sx={{
          zIndex: 12,
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={handleClose}
            className="flex items-center gap-2 cursor-pointer"
          >
            {iconPresence && <img src={icon} alt={`${dialogTitle} icon`} />}
            <p className="font-bold text-transparent bg-gold-purple inline-block bg-clip-text font-fashion text-2xl">
              {dialogTitle}
            </p>
          </div>
          <ButtonBase>
            <span className="text-purple cursor-pointer text-xs font-medium p-2">
              {action}
            </span>
          </ButtonBase>
        </DialogTitle>

        {children}
      </Dialog>
    );
  }
);

export default MapDialog;
