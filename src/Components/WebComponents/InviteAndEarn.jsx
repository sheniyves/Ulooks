import React, { useState } from "react";
import present from "../../assets/Images/present.png";
import DrawerHeader from "../SharedComponents/DrawerHeader";
import Input from "./Input";
import guard from "../../assets/Images/guard.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import dollarIcon from "../../assets/Images/dollarSign.png";
import group from "../../assets/Images/group.png";
import { handleFormatting } from "../../Utils/formattingFunction";
import { Link } from "react-router-dom";

const InviteAndEarn = ({ drawerRef, data, forSp = false }) => {
  const [copied, setCopied] = useState(false);
  const color = forSp ? "text-yellow_gold" : "text-darkPurple";

  const handleCopy = async () => {
    if (!data?.referral_code) return;

    try {
      await navigator.clipboard.writeText(data.referral_code);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div>
      <DrawerHeader drawerRef={drawerRef} title={"Invite & Earn"} />

      <div className={`${color} font-medium text-base`}>
        <div className="flex items-center flex-col gap-6">
          <img src={present} alt="present icon" className="max-w-20" />

          <div className="text-center">
            <h2 className="font-semibold text-xl md:text-2xl">
              Invite friends & Earn
            </h2>

            <p className="max-w-[50ch] text-center text-slate-500 text-sm">
              Share your code with friends. They get a discount, and you earn
              rewards when they complete their first booking
            </p>

            <div className="mt-6 relative">
              <Input
                icon={guard}
                value={data?.referral_code}
                readOnly
                backgroundColor="#f1f5f9"
              />

              <div className="absolute right-2 top-3">
                <IconButton
                  onClick={handleCopy}
                  sx={{
                    backgroundColor: copied ? "#dcfce7" : "transparent",
                    "&:hover": {
                      backgroundColor: copied ? "#bbf7d0" : "#f1f5f9",
                    },
                  }}
                >
                  {copied ? (
                    <CheckIcon sx={{ color: "#16a34a" }} />
                  ) : (
                    <ContentCopyIcon sx={{ color: "#2F034E" }} />
                  )}
                </IconButton>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full">
              <div className="flex text-left w-full items-start justify-start flex-col gap-1  border border-[#EAEAEC] rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-center bg-green/20 flex-shrink-0 rounded-full w-8 h-8">
                  <img src={dollarIcon} alt="" className="w-4" />
                </div>
                <p> {handleFormatting(data?.referral_earnings, "USD")}</p>
                <small>Total Earnings</small>
              </div>
              <div className="flex text-left w-full items-start justify-start flex-col gap-1 border border-[#EAEAEC] rounded-xl shadow-sm p-4">
                {" "}
                <div className="flex items-center justify-center bg-blue/20 flex-shrink-0 rounded-full w-8 h-8">
                  <img src={group} alt="" className="w-4" />
                </div>
                <p>{data?.referral_count}</p>
                <small>Total Invites</small>
              </div>
            </div>

            <Link to={"/customerWebApp/profile/referralHistory"}>
            <p className="underline text-sm mt-10 text-purple cursor-pointer" >View Referral History</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteAndEarn;
