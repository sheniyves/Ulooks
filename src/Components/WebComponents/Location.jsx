import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import arrowLeft from "../../assets/Images/notArrowLeft.svg";
import Dialog from "../SharedComponents/AlertDialog";
import { notifications } from "../../data/notification";
import Input from "../../Components/WebComponents/Input";
import locationIcon from "../../assets/Images/locationPurple.svg";
import { useForm } from "react-hook-form";
import closeCircle from "../../assets/Images/close-circle.svg";
import Button from "./Button";

const Location = ({ locationRef }) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <Dialog iconPresence={false} ref={locationRef} icon={arrowLeft}>
      <div className=" min-w-[540px]  relative">
        <div className="absolute -top-10 right-2 ">
          <IconButton onClick={() => locationRef.current?.closeDialog()}>
            <img src={closeCircle} alt="close icon" />
          </IconButton>
        </div>
        <DialogContent>
          <div className="-mt-6">
            <Input
              icon={locationIcon}
              inputType={"text"}
              label={"Change current location"}
              placeholder={"Type LGA, City, and State of New Location "}
              {...register("password")}
              error={errors?.password?.message}
            />
          </div>
          <span className="text-sm text-black font-medium my-6 block">
            Previous Locations
          </span>
          <ul className="flex flex-col gap-y-2 pl-2 text-base text-black">
            {previousLocations.map((previousLocation) => (
              <li key={previousLocation.id}>{previousLocation.location}</li>
            ))}
          </ul>
          <Button
            sx={{
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
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default Location;
export const previousLocations = [
  { id: 1, location: "Ikorodu,Lagos state." },
  { id: 2, location: "Owerri,imo state." },
  { id: 3, location: "Sabon gari, Zaria kaduna state." },
];
