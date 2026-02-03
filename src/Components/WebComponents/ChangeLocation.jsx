import React from "react";
import { useForm } from "react-hook-form";
import editIcon from "../../assets/Images/edit-2.svg";
import locationIcon from "../../assets/Images/locationPurple.svg";
import undoIcon from "../../assets/Images/undo.svg";
import { IconButton } from "@mui/material";
import Input from "./Input";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { setLocation } from "../../redux/newBookingSlice";

const ChangeLocation = ({ data }) => {
  const { reset, register, handleSubmit, watch } = useForm({
    defaultValues: { location: data.location },
  });

  const [change, setChange] = React.useState("");
  const [editLocation, setEditLocation] = React.useState(false);
  const dispatch = useDispatch();
  const location = watch("location");

  const handleChange = (formData) => {
    if (formData.location) {
      setChange(formData.location); 
    }
    setEditLocation(false);
    reset({ location: formData.location || data.location });
  };

  React.useEffect(() => {
    if (change) {
      dispatch(setLocation(change));
    } else {
      dispatch(setLocation(data.location));
    }
  }, [change, data.location, dispatch]);
    
    

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <span className="text-[#667085] font-sm font-medium">Location</span>
        <IconButton
          onClick={() => {
            if (editLocation) {
              reset({ location: data.location });
              setChange(""); 
              setEditLocation(false);
            } else {
              setEditLocation(true);
            }
          }}
        >
          <img src={editLocation ? undoIcon : editIcon} alt="Edit icon" />
        </IconButton>
      </div>

      {!editLocation ? (
        <p className="text-darkPurple font-medium text-lg md:text-xl capitalize -mt-2">
          {change || data.location}
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(handleChange)}
          className="flex items-center w-full gap-2 -mt-2 "
        >
          <div className="w-full">
            <Input
              icon={locationIcon}
              {...register("location")}
              placeholder="Change location"
            />
          </div>
          <Button
            type="submit"
            sx={{ padding: "1.05rem 1rem", marginBottom: ".3rem" }}
            backgroundColor={!location ? "#EAEAEC" : "#6A0DAD"}
            color={!location ? "#6A0DAD" : "#fff"}
            disabled={!location}
          >
            Edit
          </Button>
        </form>
      )}
    </div>
  );
};

export default ChangeLocation;
