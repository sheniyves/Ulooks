import React from "react";
import DragModal from "./DragModal";
import { IconButton } from "@mui/material";
import closeCircle from "../../assets/Images/close-circle.svg";
import BookNowStep1 from "./BookNowStep1";
import { useSelector } from "react-redux";
import BookNowStep2 from "./BookNowStep2";
import BookNowStep3 from "./BookNowStep3";
import BookNowStep4 from "./BookNowStep4";
import BookNowStep5 from "./BookNowStep5.jsx";
import BookNowSuccessful from "./BookNowSuccessful";
import ViewBookedSevice from "./ViewBookedSevice";

const BookingNowMobile = ({ dragRef, data }) => {
  const step = useSelector((state) => state.newBookings.step);
  return (
    <div>
      <DragModal ref={dragRef}>
        <div className="  relative">
          <div className="absolute -top-5 right-2 ">
            <IconButton onClick={() => dragRef.current?.closeMobileDrawer()}>
              <img src={closeCircle} alt="close icon" />
            </IconButton>
          </div>
          {step === 1 && <BookNowStep1 data={data} />}
          {step === 2 && <BookNowStep2 />}
          {step === 3 && <BookNowStep3 />}
          {step === 4 && <BookNowStep4 />}
          {step === 5 && <BookNowStep5 />}
          {step === 6 && <BookNowSuccessful />}
          {step === 7 && <ViewBookedSevice data={data} />}
        </div>
      </DragModal>
    </div>
  );
};

export default BookingNowMobile;
