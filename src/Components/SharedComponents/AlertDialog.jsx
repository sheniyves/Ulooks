import React, { forwardRef, useState, useImperativeHandle } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  ButtonBase,
  IconButton,
} from "@mui/material";
import { useDynamicScreen } from "../../Utils/screenWidth";

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
      iconPresenceRight = false,
      iconRight,
      useFullWidth = false,
      reduceIndex = false,
      background,
      onClose,
      maxHeight = "90vh",
      dialogAction = () => { },
      useDialogAction =false
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const dynamicScreen = useDynamicScreen();
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
        // disableEnforceFocus
        open={open}
        // keepMounted
        onClose={handleClose}
        fullScreen={useFullWidth}
        // disablePortal
        scroll="paper"
        // hideBackdrop={reduceIndex}
        slots={{
          transition: Transition,
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: background || "#fff",
              borderRadius: dynamicScreen <= 770 ? ".6rem" : "1rem",
              maxHeight: maxHeight, // limit dialog height
            },
          },
        }}
      >
        {/* Title */}
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            onClick={useDialogAction  ? dialogAction : handleClose}
            className="flex items-center gap-2 cursor-pointer"
          >
            {iconPresence && <img src={icon} alt={`${dialogTitle} icon`} />}
            <div onClick={handleClose} className="-mt-10">
              {iconPresenceRight && (
                <IconButton sx={{ right: 10, position: "absolute" }}>
                  <img
                    onClick={handleClose}
                    src={iconRight}
                    alt={`close icon`}
                  />
                </IconButton>
              )}
            </div>

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
  },
);

export default AlertDialog;
