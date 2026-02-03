import { ButtonBase } from "@mui/material";
import React from "react";
import phone from "../../assets/Images/calling.svg";

const AddFromContact = () => {
  return (
    <div className="bg-[#E7CBFB] shadow-sm rounded-md  mx-4 md:mx-0 my-4  flex items-start gap-4 w-full">
      <ButtonBase sx={{ width: "100%", padding: "1rem", display: "flex",  alignItems: "start", justifyContent: "flex-start", gap: "1rem" }}>
        <img src={phone} alt="phone icon" /> Add Number from Contact
      </ButtonBase>
    </div>
  );
};

export default AddFromContact;
