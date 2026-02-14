import React, { forwardRef, useState, useImperativeHandle } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  ButtonBase,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = forwardRef(
  (
    {
      dialogTitle,
      action,
      icon,
      children,
      iconPresence = true,
      useFullWidth = false,
      reduceIndex = false,
      background,
      onClose,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      onClose?.();
    };

    useImperativeHandle(ref, () => ({
      openDialog: handleClickOpen,
      closeDialog: handleClose,
      isOpen: open,
    }));

    return (
      <Dialog
        disableEnforceFocus
        open={open}
        // keepMounted
        onClose={handleClose}
        fullScreen={useFullWidth}
        disablePortal
        scroll="paper"
        // hideBackdrop={reduceIndex}
        slots={{
          transition: Transition,
        }}
        PaperProps={{
          sx: {
            backgroundColor: background || "#fff",
            borderRadius: window.innerWidth <= 770 ? ".6rem" : "1rem",
            maxHeight: "90vh", // limit dialog height
          },
        }}
      >
        {/* Title */}
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

        {/* Scrollable content */}
        <DialogContent
          dividers
          sx={{
            maxHeight: "75vh",
            overflowY: "auto",
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);

export default AlertDialog;
