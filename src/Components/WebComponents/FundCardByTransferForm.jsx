import React from "react";
import Input from "./Input";
import userIcon from "../../assets/Images/user.svg";
import cardIcon from "../../assets/Images/cardPurple.svg";
import bankIcon from "../../assets/Images/bank.svg";
import nairaIcon from "../../assets/Images//₦.svg";
import { Controller, useForm } from "react-hook-form";
import Upload from "../../Pages/Auth/ServiceProviderAuth/Upload";
import { transferSchema } from "../../Schema/transferSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { isTransferDetailsSubmitted } from "../../redux/addFundsSlice";
import { useDispatch } from "react-redux";

const FundCardByTransferForm = ({ isActive, buttonRef }) => {
  const uploadIdRef = React.useRef(null);

  const handleUpload = (ref) => () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    resolver: zodResolver(transferSchema),
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(isTransferDetailsSubmitted(true));
    reset();
    console.log("Card form submitted", data);
  };

  React.useEffect(() => {
    if (!isActive) reset();
  }, [isActive, reset]);

  return (
    <motion.div
      className={`${!isActive ? " hidden md:inline-block" : "inline-block"}`}
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0.6,
        padding: isActive ? "0rem" : "1rem",
        pointerEvents: isActive ? "auto" : "none",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          icon={cardIcon}
          label="Card Holder's Name"
          name="accountName"
          inputType="text"
          placeholder="Type name in correct order"
          backgroundInput="bg-[#f9fafb]"
          {...register("accountName")}
          error={errors?.accountName?.message}
          readOnly={!isActive}
        />
        <Input
          icon={bankIcon}
          label="Bank"
          name="bank"
          inputType="text"
          placeholder="E.g Moniepoint"
          backgroundInput="bg-[#f9fafb]"
          {...register("bank")}
          error={errors?.bank?.message}
          readOnly={!isActive}
        />

        <Input
          icon={cardIcon}
          label="Account Number"
          name="accountNumber"
          inputType="text"
          placeholder="Type in the account number"
          backgroundInput="bg-[#f9fafb]"
          {...register("accountNumber")}
          error={errors?.accountNumber?.message}
          readOnly={!isActive}
        />

        <div className=" text-left sm:text-center  w-full xs:w-[90%] sm:w-[70%] mx-auto  ">
          <Input
            icon={nairaIcon}
            label="Amount to Fund"
            name="amountToFund"
            inputType="text"
            placeholder="000-000-000"
            backgroundInput="bg-[#f9fafb]"
            {...register("amountToFund")}
            error={errors?.amountToFund?.message}
            readOnly={!isActive}
          />

          <div className="relative">
            <Controller
              name="transferReceipt"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Upload
                  uploadRef={uploadIdRef}
                  onUpload={handleUpload(uploadIdRef)}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      field.onChange(files);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  label="Add Image of ID card"
                  name="transferReceipt"
                  error={errors.transferReceipt?.message}
                  accept="image/jpeg, image/png, image/webp, image/gif"
                  placeholder="Upload Transfer Receipt"
                  optional={false}
                  forSp={false}
                  disabled={!isActive}
                />
              )}
            />
          </div>
        </div>
        <button ref={buttonRef} className="hidden" type="submit"></button>
      </form>
    </motion.div>
  );
};

export default FundCardByTransferForm;
