import React from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../Utils/presistStorage";
import ServiceForWho from "./ServiceForWho";
import ServiceLocationPicker from "./ServiceLocationPicker";
import { Divider } from "@mui/material";
import locationIcon from "../../assets/Images/gray-location-icon.svg";
import galleryIcon from "../../assets/Images/gallery-import-lp.svg";
import Button from "./Button";
import { Controller, useForm } from "react-hook-form";
import Upload from "../../Pages/Auth/ServiceProviderAuth/Upload";
import { useDispatch, useSelector } from "react-redux";
import {
  setIndividual,
  setServiceLocation,
  setStep,
  setUploadedImage,
} from "../../redux/newBookingSlice";

const BookNowStep2 = () => {
  const [selectedOption, setSelectedOption] = React.useState(
    getFromLocalStorage("serviceForWho", "self")
  );
  const uploadServiceRef = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setToLocalStorage("serviceForWho", selectedOption);
  }, [selectedOption]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUpload = (ref) => () => {
    if (ref.current) {
      ref.current.click();
    }
  };
  const [locationPicker, setLocationPicker] = React.useState(() =>
    getFromLocalStorage("serviceLocation", "inShop")
  );

  const {
    control,
    formState: { errors },
  } = useForm();

  const handleContinue = () => {
    dispatch(setStep(3));
  };

  React.useEffect(() => {
    dispatch(setIndividual(selectedOption));
    dispatch(setServiceLocation(locationPicker));
  }, [selectedOption, locationPicker]);

  const serviceLocation = useSelector(
    (state) => state.newBookings.serviceLocation
  );
  const individual = useSelector((state) => state.newBookings.individual);
  const uploadedImage = useSelector((state) => state.newBookings.uploadedImage);
  console.log({ serviceLocation, uploadedImage, individual });

  return (
    <div>
      <p className="font-medium text-[#667085] text-lg text-center ">
        Select Appointment Type
      </p>
      <ServiceForWho
        selectedOption={selectedOption}
        handleChange={handleChange}
      />
      <ServiceLocationPicker
        locationPicker={locationPicker}
        setLocationPicker={setLocationPicker}
      />
      <Divider sx={{ color: "#D0D5DD", margin: "1.5rem 0" }} />
      <div className="flex items-center gap-2 text-[#98A2B3] font-medium">
        <img src={locationIcon} alt="location icon" />
        <div>
          <p>No 16 brown street by the Redeem Church,</p>
          <p>Ikeja, Lagos</p>
          <p>35 mins from your you by car</p>
        </div>
      </div>
      <Divider sx={{ color: "#D0D5DD", margin: "1.5rem 0" }} />
      <Button
        backgroundColor="#F4E2FE"
        color="#6A0DAD"
        sx={{ width: "100%", border: "1px solid #6A0DAD" }}
      >
        <img
          src={galleryIcon}
          width={24}
          height={24}
          alt="upload from gallery icon"
        />
        Select Looks from Saved Inspo
      </Button>
      <h4 className="text-[#98A2B3] font-medium text-center my-4">OR</h4>
      <Controller
        name="certificateFile"
        control={control}
        defaultValue={null}
        render={({ field, }) => (
          <Upload
            uploadRef={uploadServiceRef}
            onUpload={handleUpload(uploadServiceRef)}
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                field.onChange(files);
                const file = files[0];
                dispatch(setUploadedImage(file));
              } else {
                field.onChange(null);
              }
            }}
            label="Upload Image"
            name="certificateFile"
            error={errors.certificateFile?.message}
            accept="image/jpeg, image/png, image/webp, image/gif"
            placeholder="Upload service look"
            optional
            forSp={false}
          />
        )}
      />
      <Button
        sx={{ width: "100%", mt: "1rem" }}
        onClick={handleContinue}
      >
        Continue 
      </Button>
      <div className="h-12 w-full" />
    </div>
  );
};

export default BookNowStep2;
