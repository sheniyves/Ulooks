import React from "react";
import Dialog from "./AlertDialog";
import { DialogContent } from "@mui/material";
import ProgressTrackerSP from "../ServiceProvider/ProgressTrackerSP";
import location from "../../assets/Images/gray-location-icon.svg";
import SelectDropDown2 from "../WebComponents/SelectDropown2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EditAppointmentDialog = ({ reschedulRef, selectedCard, onUpdate }) => {
  const progressWidth = window.innerWidth > 770 ? 384 : "100%";

  const { control, reset } = useForm({
    defaultValues: {
      progressUpdate: selectedCard?.status || "",
    },
  });

  React.useEffect(() => {
    if (selectedCard) {
      reset({
        progressUpdate: selectedCard.status || "",
      });
    }
  }, [selectedCard, reset]);
  const navigate = useNavigate();
  const handleStatusChange = (value) => {
    if (selectedCard) {
      onUpdate(selectedCard.id, value);
    }

    if (value === "finished") {
      setTimeout(() => {
        reschedulRef.current?.closeDialog();
      }, 1000);

      setTimeout(() => {
        navigate("/serviceProviderWebApp/serviceRenderedSuccessfully");
      }, 1500);
    }
  };

  console.log({ selectedCard });

  return (
    <div className="  max-w-full md:max-w-[24rem]">
      <Dialog
        
        ref={reschedulRef}
        dialogTitle={""}
        action={""}
        iconPresence={false}
        useFullWidth={false}
      >
        <DialogContent>
          <div className="flex items-center justify-center">
            <ProgressTrackerSP
              step={selectedCard?.step}
              width={progressWidth}
            />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <img
              src={selectedCard?.image}
              className="w-[6.125rem]"
              alt="user profile"
            />
            <div>
              <p className="text-yellow_gold font-bold text-3xl">
                {selectedCard?.name}
              </p>
              <div className="flex items-center gap-2">
                <img src={location} alt="location icon" />
                <p className="flex items-center justify-between w-full mt-2">
                  {selectedCard?.serviceType}
                </p>
              </div>
            </div>
          </div>

          <p className="text-yellow_gold text-xl font-medium mt-4 -mb-4">
            Edit Customer status
          </p>
          <div className="min-w-0 md:min-w-[31.25rem]">
            <SelectDropDown2
              control={control}
              name="progressUpdate"
              label=""
              onChange={(e) => handleStatusChange(e.target.value)}
              list={[
                { value: "wating", label: "Waiting" },
                { value: "inProgress", label: "In Progress" },
                { value: "finished", label: "Finished" },
              ]}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditAppointmentDialog;
