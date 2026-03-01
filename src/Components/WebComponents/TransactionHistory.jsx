import { transactionData } from "../../data/transactionData";
import { handleFormatting } from "../../Utils/formattingFunction";
import addIcon from "../../assets/Images/addIconWhite.svg";
import sendIcon from "../../assets/Images/send.svg";
import arrowDownIcon from "../../assets/Images/arrow-downn.svg";
import { Link } from "react-router-dom";

const TransactionHistory = () => {
  return (
    <div>
      <div className="flex items-center justify-between mt-6">
        <p className="text-darkPurple text-lg font-bold mb-2">
          Transaction History
        </p>
        <Link to={"/customerWebApp/wallet/transactionHistory"}>
          <span className="text-blue hover:underline text-sm font-medium cursor-pointer">
            See more
          </span>
        </Link>
      </div>

      <ul className="mt-2">
        {transactionData?.map((data, idx) => (
          <TransactionHistoryRows data={data} key={idx} />
        ))}
      </ul>
    </div>
  );
};
export default TransactionHistory;

export const TransactionHistoryRows = ({ data, useBaseColor = true }) => {
  const handleIcon = (type) => {
    return type === "paid"
      ? addIcon
      : type === "funded"
      ? sendIcon
      : type === "withdraw"
      ? arrowDownIcon
      : "";
  };
  const color = useBaseColor ? "text-darkPurple" : "text-yellow_gold";
  const lightColor = useBaseColor ? "text-purple" : "text-orange_gold";
  return (
    <li className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <span className=" shadow-sm w-10 h-10 rounded-full bg-gold-purple flex items-center justify-center ">
          <img className="w-[1.5rem]" src={handleIcon(data.type)} alt="" />
        </span>
        <p className={`${color} text-base font-medium capitalize`}>
          {data.label}
        </p>
      </div>
      <div>
        <p className={`${lightColor} font-semibold`}>
          {handleFormatting(data.amount)}
        </p>
        <span className="text-gray text-[.63rem] block -mt-1">{`${data.date} ${data.time}`}</span>
      </div>
    </li>
  );
};
