import React from "react";
import DragModal from "../WebComponents/DragModal";
import { IconButton } from "@mui/material";
import Button from "../WebComponents/Button";
import Input from "../WebComponents/Input";
import { previousLocations } from "../WebComponents/Location";
import closeCircle from "../../assets/Images/close-circle.svg";
import locationInputIcon from "../../assets/Images/locationPurple.svg";

const MobileLocation = ({ dragRef, register, errors }) => {
  return (
    <div>
      <DragModal ref={dragRef}>
        <div className="  relative">
          <div className="absolute -top-10 right-2 ">
            <IconButton onClick={() => dragRef.current?.closeMobileDrawer()}>
              <img src={closeCircle} alt="close icon" />
            </IconButton>
          </div>
          <div className="mt-4">
            <Input
              icon={locationInputIcon}
              inputType={"text"}
              label={"Change current location"}
              placeholder={"Type LGA, City, and State of New Location "}
              {...register("location")}
              error={errors?.password?.message}
            />
          </div>
          <span className="text-sm text-black font-medium my-6 block">
            Previous Locations
          </span>
          <ul className="mb-16 flex flex-col gap-y-2 pl-2 text-base text-black">
            {previousLocations.map((previousLocation) => (
              <li key={previousLocation.id}>{previousLocation.location}</li>
            ))}
          </ul>
          <Button
            fontWeight={600}
            sx={{
              backgroundColor: "#6A0DAD",
              width: "100%",
              color: "#fff",
              marginTop: "1rem",

              "&:hover": {
                backgroundColor: "#5a0a99",
              },
            }}
          >
            Change Location
          </Button>
          <Button
            fontWeight={600}
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              color: "#6A0DAD",
              marginTop: "1rem",
              "&:hover": {
                backgroundColor: "#e0bbff ",
              },
            }}
          >
            Find Services Close to me
          </Button>
        </div>
      </DragModal>
    </div>
  );
};

export default MobileLocation;
