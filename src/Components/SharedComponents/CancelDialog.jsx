import React from "react";
import Dialog from "./AlertDialog";
import { DialogActions, DialogContent } from "@mui/material";
import Button from "../WebComponents/Button";
import { Link } from "react-router-dom";

const CanelDialog = ({ cancelDialogRef, selectedCard, onUpdate }) => {

  return (
    <div className=" max-w-full md:max-w-[24rem] bg-[#fef0c7]">
      <Dialog
        
        ref={cancelDialogRef}
        dialogTitle={""}
        action={""}
        iconPresence={false}
        useFullWidth={false}
        background={"#fef0c7"}
      >
        <DialogContent>
          <h1 className="text-orange_gold text-center  mb-6  text-4xl  font-normal sm:font-bold font-fashion">
            Consider Rescheduling
          </h1>
          <p className="text-yellow_gold font-semibold text-lg text-center mt-2">
            Please consider rescheduling instead of canceling - frequent
            cancellations may affect your rating on Ulooks.
          </p>
          <p className="text-yellow_gold font-semibold text-lg text-center mt-4">
            If cancellations is unavailable kindly note that it could impact
            your service credibility on the platform.
          </p>
        </DialogContent>
        <div className=" p-6 flex gap-4 flex-col sm:flex-row items-center justify-between  ">
          <Button
            backgroundColor="#F79009"
            sx={{
              width: "100%",
              "&:hover": {
                backgroundColor: "#dc7c06",
              },
            }}
            onClick={() => cancelDialogRef.current?.closeDialog()}
          >
            Go back and Reschedule
          </Button>
          <Link to={`/serviceProviderWebApp/cancelAppointments/${selectedCard?.id}`} className="w-full">
            <Button
              backgroundColor="#D92D20"
              sx={{
                width: "100%",
                "&:hover": {
                  backgroundColor: "#B71F16",
                },
              }}
            >
              Proceed to Cancel
            </Button>
          </Link>
        </div>
      </Dialog>
    </div>
  );
};

export default CanelDialog;
