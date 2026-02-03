import React from "react";
import ornament from "../../assets/Images/ornament.png";
import addIcon from "../../assets/Images/addPlus.svg";
import arrowDown from "../../assets/Images/arrow-downn.svg";
import { ButtonBase } from "@mui/material";
import { handleFormatting } from "../../Utils/formattingFunction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const WalletCard = () => {
  const [showBalance, setShowBalance] = React.useState(true);

  return (
    <div
      className="bg-[#96BAFF] bg-no-repeat bg-cover bg-center text-white rounded-xl p-4 mx-auto lg:mx-0 w-full max-w-[31.25rem] h-full max-h-[8.25rem] mt-6"
      style={{ backgroundImage: `url(${ornament})` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p>Available Balance</p>
          <button
            onClick={() => setShowBalance((prev) => !prev)}
            className="text-white"
          >
            {showBalance ? (
              <VisibilityOffIcon fontSize="small" />
            ) : (
              <VisibilityIcon fontSize="small" />
            )}
          </button>
        </div>
        <div className="rounded-lg shadow-md bg-[#F9F4FC] text-darkPurple font-bold">
          <Link to={"/customerWebApp/addFunds"}>
            <ButtonBase
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: ".2rem",
                padding: "5px 10px",
                borderRadius: ".5rem",
              }}
            >
              <img src={addIcon} alt="plus icon" />
              Add Money
            </ButtonBase>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-[3rem] font-semibold text-[#FDFDFD]">
          {showBalance ? handleFormatting(9051) : "••••••"}
        </h1>
        <Link to={"/customerWebApp/withdraw"}>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: ".2rem",
              padding: "5px 10px",
              fontWeight: "600",
            }}
          >
            <img src={arrowDown} alt="dropdown icon" />
            Withdraw
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WalletCard;
