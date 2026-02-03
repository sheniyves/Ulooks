import React from "react";
import { IconButton } from "@mui/material";
import addIcon from "../../assets/Images/add.svg";
import Input2 from "../WebComponents/Input2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ServiceEssentials = ({ register, errors, fields, setFields }) => {
  const handleAddField = () => {
    setFields([...fields, { name: "", price: "" }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm mb-2 block text-yellow_gold">
          Essentials
        </p>
        <IconButton onClick={handleAddField}>
          <img src={addIcon} alt="add essential button" />
        </IconButton>
      </div>
      <span className="text-gray font-normal text-sm max-w-[45ch]">
        Service essentials are the needed items required to complete your
        selected service — for example, a weave or attachment for a hair styling
        service. You are to fill this form if service essential is needed.
      </span>

      {fields.map((field, index) => (
        <div key={index} className="flex items-center justify-end gap-2">
          <div className="grid w-full grid-cols-2 gap-4 items-end mt-4">
            <Input2
              label="Service Name"
              inputType="text"
              placeholder="Enter service name"
              {...register(`serviceEssential.${index}.name`)}
              error={errors?.serviceEssential?.[index]?.name?.message}
              defaultValue={field.name}
            />
            <Input2
              label="Price"
              inputType="number"
              placeholder="Enter price"
              {...register(`serviceEssential.${index}.price`, {
                valueAsNumber: true,
              })}
              error={errors?.serviceEssential?.[index]?.price?.message}
              defaultValue={field.price}
            />
          </div>
          <div className="flex items-center justify-center mt-7">
            <IconButton
              onClick={() => handleRemoveField(index)}
              sx={{
                backgroundColor: "#FEE2E2",
                "&:hover": { backgroundColor: "#FCA5A5" },
              }}
            >
              <DeleteOutlineIcon sx={{ color: "red" }} />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceEssentials;
