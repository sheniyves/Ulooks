import React, { useState } from "react";

const OTPInput = ({ length = 6, onChange, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; 

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);

    const joinedOtp = updatedOtp.join("");
    onChange?.(joinedOtp);

    if (updatedOtp.every((digit) => digit !== "")) {
      onComplete?.(joinedOtp);
    }

    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };


  return (
    <div className="flex gap-4">
      {otp.map((d, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={d}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          className={`w-10 h-12 text-center rounded-md bg-[#D0D5DD] shadow-sm text-lg focus:outline-none 
            ${d ? "border-2 border-[#2F034E]" : "border-none"}`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
