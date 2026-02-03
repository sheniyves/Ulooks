import { transactionData } from "../../data/transactionData";
import { handleFormatting } from "../../Utils/formattingFunction";
import addIcon from "../../assets/Images/addIconWhite.svg";
import sendIcon from "../../assets/Images/send.svg";
import arrowDownIcon from "../../assets/Images/arrow-downn.svg";
import { Link } from "react-router-dom";

const TransactionHistorysp = () => {
  return (
    <div>
      <div className="flex items-center justify-between mt-6">
        <p className="text-yellow_gold text-lg font-bold mb-2">
          Earning History
        </p>
        <Link to={"/serviceProviderWebApp/transactionHistory"}>
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
export default TransactionHistorysp;

export const TransactionHistoryRows = ({ data }) => {
  console.log({ data });
  const handleIcon = (type) => {
    return type === "paid"
      ? addIcon
      : type === "funded"
      ? sendIcon
      : type === "withdraw"
      ? arrowDownIcon
      : "";
  };
  return (
    <li className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <span className=" shadow-sm w-10 h-10 rounded-full bg-gold-purple flex items-center justify-center ">
          <img className="w-[1.5rem]" src={handleIcon(data.type)} alt="" />
        </span>
        <p className="text-yellow_gold text-base font-medium capitalize">
          {data.label}
        </p>
      </div>
      <div>
        <p className="text-orange_gold font-semibold">
          {handleFormatting(data.amount)}
        </p>
        <span className="text-gray text-[.63rem] block -mt-1">{`${data.date} ${data.time}`}</span>
      </div>
    </li>
  );
};

