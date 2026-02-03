import React from "react";
import addIcon from "../../../assets/Images/add.svg";
import { IconButton } from "@mui/material";
import SelectDropDown2 from "../../../Components/WebComponents/SelectDropown2";
import { Controller, useForm } from "react-hook-form";
import Upload from "./Upload";
import currency from "../../../assets/Images/₦.svg";
import Input2 from "../../../Components/WebComponents/Input2";

const CreateServiceEssentialForm = ({ control, register, errors }) => {
  const uploadCertificateRef = React.useRef(null);

  const handleUpload = (ref) => () => {
    if (ref.current) {
      ref.current.click();
    }
  };
  return (
    <div className="mt-10">
      <h2 className="text-orange_gold font-fashion text-[1.75rem] font-bold ">
        Create Service Essential
      </h2>
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-yellow_gold text-xl font-medium">
          Service essentials 1
        </h2>
        <IconButton>
          <img className="w-[90%]" src={addIcon} alt="Add icon" />
        </IconButton>
      </div>

      <p className="text-gray font-normal text-sm max-w-[45ch]">
        Service essentials are the needed items required to complete your
        selected service — for example, a weave or attachment for a hair styling
        service. You are to fill this form if service essential is needed.
      </p>

      <Input2
        label={"Essential title"}
        name={"serviceEssentialTitle"}
        inputType="text"
        placeholder={"Enter the service essential title here"}
        {...register("serviceEssentialTitle")}
        error={errors?.serviceEssentialTitle?.message}
      />
      <SelectDropDown2
        control={control}
        name="selectedService"
        error={errors.selectedService?.message}
        label={"Select service to add -Service essentials- "}
        list={[
          { value: "harstyling", label: "Hairstyling" },
          { value: "makeup", label: "Makeup" },
          { value: "barbing", label: "Barbing" },
          { value: "spa_session", label: "SPA session" },
          {
            value: "beauty_and_grooming_services",
            label: "Beauty and grooming services",
          },
          { value: "special_service", label: "Special service" },
          {
            value: "hair_coloring_and_treatment",
            label: "Hair coloring and treatment",
          },
          { value: "laundry", label: "Laundry" },
        ]}
      />

      <Input2
        label={"Color"}
        name={"color"}
        inputType="text"
        placeholder={"Black"}
        {...register("color")}
        error={errors?.color?.message}
      />
      <div className="relative">
        <Controller
          name="picture"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <Upload
              uploadRef={uploadCertificateRef}
              onUpload={handleUpload(uploadCertificateRef)}
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  field.onChange(files);
                } else {
                  field.onChange(null);
                }
                console.log("Selected file:", files?.[0]);
              }}
              label="Picture"
              name="picture"
              error={errors.picture?.message}
              accept="image/jpeg, image/png, image/webp, image/gif"
              placeholder="Upload image of Certificate"
              optional={true}
            />
          )}
        />
      </div>
      <Input2
        label={"Amount to charge"}
        name={"essentialAmount"}
        inputType="number"
        placeholder={""}
        {...register("essentialAmount", { valueAsNumber: true })}
        icon={currency}
        error={errors?.essentialAmount?.message}
      />
      <Input2
        textArea
        label={"Service essential description"}
        name={"essentialDesc"}
        inputType="text"
        placeholder={"E.g dye mixer..."}
        {...register("essentialDesc")}
        error={errors?.essentialDesc?.message}
      />
    </div>
  );
};

export default CreateServiceEssentialForm;
