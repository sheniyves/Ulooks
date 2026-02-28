import React from "react";
import Input from "./Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { updateStep } from "../../redux/formStepsSlice";
import personalCard from "../../assets/Images/personalcardCu.svg";
import SelectDropDown from "./SelectDropDown";
import Upload from "../../Pages/Auth/ServiceProviderAuth/Upload";
import Button from "./Button";
import { KycSchemaStep2 } from "../../Schema/KycSchema";
import Input2 from "./Input2";
import SelectDropDown2 from "./SelectDropown2";
import { updateForm } from "../../redux/updateKyc";

const KYCStep2 = ({ useBaseColor = true }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(KycSchemaStep2),
    mode: "onTouched",
  });
  const dispatch = useDispatch();
  const uploadIdRef = React.useRef(null);
  const handleUpload = (ref) => () => {
    if (ref.current) {
      ref.current.click();
    }
  };
  const onSubmit = (data) => {
    console.log("Form submitted for form 2", data);
    dispatch(updateStep({ formKey: "KYC", step: 3 }));
      dispatch(updateForm({ stepKey: "step2", data }));
  };
  const InputField = useBaseColor ? Input : Input2;
  const SelectField = useBaseColor ? SelectDropDown : SelectDropDown2;
  const color = useBaseColor ? "text-darkPurple" : "text-orange_gold";
  const buttonColor = useBaseColor ? "#6A0DAD" : "#F79009";
  const buttonHoverColor = useBaseColor ? "#5a0a99" : "#dc7c06";
  const imageUpload = useBaseColor ? false : true ;
  return (
    <div className=" min-w-none md:min-w-[530px] ">
      <h2 className={`font-fashion text-2xl ${color}`}>
        🆔 Government Identity Verification
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectField
          control={control}
          name="identification"
          defaultValue={"nin"}
          error={errors.identification?.message}
          label={"Government Issued ID card"}
          placeholder={"Select an option"}
          list={[
            { value: "nin", label: "National Identification Number (NIN)" },
            { value: "bvn", label: "Bank Verification Number (BVN)" },
            { value: "internationalPassport", label: "International Passport" },
            { value: "driversLicense", label: "Drivers License" },
            { value: "votersCard", label: "Voters Card (PVC)" },
            { value: "nic", label: "National Identity Card (NIC)" },
            { value: "tin", label: "Tax Identification Number (TIN)" },
          ]}
        />
        <InputField
          icon={personalCard}
          label={"ID Card Number"}
          name={"identificationNumber"}
          inputType="text"
          placeholder={"Enter ID card number"}
          {...register("identificationNumber")}
          error={errors?.identificationNumber?.message}
        />
        <div className="relative">
          <Controller
            name="identificationImage"
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
                name="identificationImage"
                error={errors.identificationImage?.message}
                accept="image/jpeg, image/png, image/webp, image/gif"
                placeholder="Upload image of Certificate"
                optional={false}
                forSp={imageUpload}

              />
            )}
          />
        </div>
        <Button
          type="submit"
          backgroundColor={buttonColor}
          sx={{
            width: "100%",
            marginTop: "2.5rem",
            marginInline: "auto",
            "&:hover": {
              backgroundColor: { buttonHoverColor },
            },
          }}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default KYCStep2;
