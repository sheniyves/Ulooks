import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  createServiceSchema,
  createServiceWithEssentialSchema,
} from "../../../Schema/personalizeExperienceSchema";
import Button from "../../../Components/WebComponents/Button";
import SelectDropDown2 from "../../../Components/WebComponents/SelectDropown2";
import Upload from "./Upload";
import Input2 from "../../../Components/WebComponents/Input2";
import spinner from "../../../assets/Animations/spinner.json";
import Lottie from "lottie-react";
import currency from "../../../assets/Images/₦.svg";
import CreateServiceEssentialForm from "./CreateServiceEssentialForm";
import { useToast } from "../../../../hooks/useToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createService, getServiceCatalog } from "../../../api/services";
import Toast from "../../../Components/Toast";
import { buttonStatus as getButtonStatus } from "../../../Utils/updateStatus";
import ActionButton from "../../../Components/SharedComponents/ActionButton";
import { serviceOptions } from "../../../Utils/serviceOptions";
import ServiceEssentials from "../../../Components/ServiceProvider/ServiceEssentials";
import ServiceSelectField from "../../../Components/WebComponents/ServiceSelectField";

const CreateServiceForm = () => {
  //We might need to combine both forms in the case where service essential is needed.

  const conditionalResolver = async (data, context, options) => {
    const essentialFields = [
      "serviceEssentialTitle", // string
      "selectedService", // string (after your update)
      "color", // string
      "essentialDesc", // string
      "essentialAmount", // number
    ];

    const hasEssentialData = essentialFields.some((field) => {
      const value = data?.[field];

      // String fields → must not be empty
      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      // Number fields → must be a valid number
      if (typeof value === "number") {
        return !isNaN(value);
      }

      // Array fields → must not be empty
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      // Default: ignore null/undefined/NaN
      return false;
    });

    console.log("hasEssentialData:", hasEssentialData, data);

    return zodResolver(
      hasEssentialData ? createServiceWithEssentialSchema : createServiceSchema
    )(data, context, options);
  };

  const { data: catalog, isPending: isCatalogPending  } = useQuery({
    queryKey: ["service_catalog"],
    queryFn: getServiceCatalog,
  });

  const catalogData = catalog?.data;
  console.log({ catalog, });

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: conditionalResolver,
  });

  const [status, setStatus] = React.useState("idle");
  const [fields, setFields] = React.useState([{ name: "", price: "" }]);
  const { toastMessage, toastRef, showToast } = useToast();
  const uploadCertificateRef = React.useRef(null);
  const handleUpload = (ref) => () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const { mutate: createNewService, isSuccess } = useMutation({
    mutationFn: (data) => createService(data),
    onMutate: () => setStatus("loading"),
    onSuccess: (data) => {
      showToast(data.message || "Service created successfully!");
      setStatus("success");
      // setTimeout(() => {
      //   navigate("/serviceProviderAuth/account_personalize_successfully");
      // }, 4000);
      console.log("Success in creating service data", data);
    },
    onError: (error) => {
      console.log({ error });
      setStatus("error");
      showToast("Error occured");
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted", data);

    const picture =
      data.picture instanceof FileList ? data.picture[0] : data.picture;

    const essentials =
      Array.isArray(data.serviceEssential) && data.serviceEssential.length > 0
        ? data.serviceEssential.map((item) => ({
            name: item.name,
            price: Number(item.price),
          }))
        : null;

    const existingPayload = {
      existing_service_id: data.serviceCategory,
      timeframe: Number(data.serviceTimeFrame),
      amount: Number(data.amount),
      essentials: essentials,
      gender: data.gender,
    };

    const formData = new FormData();

    Object.entries(existingPayload).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (typeof value === "object" && !(value instanceof File)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });

    if (picture) {
      formData.append("picture", picture);
    }
    console.log({ existingPayload, formData });
    createNewService(formData);
  };

  const config = getButtonStatus({
    idleContent: "Done",
    loadingContent: "Processing...",
    successContent: "Service Created Successfully",
    errorContent: "Done",

    idleStyle: { backgroundColor: "#F79009", color: "#fff" },
    errorStyle: { backgroundColor: "#F79009", color: "#fff" },
    successStyle: { backgroundColor: "#F79009", color: "#fff" },
  });

  const { content, style } = config[status];

  console.log({ serviceOptions });

  return (
    <div>
      <Toast ref={toastRef} status={isSuccess ? "success" : "error"}>
        {toastMessage}
      </Toast>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {/* <Input2
          label={"Service Name"}
          name={"serviceName"}
          inputType="text"
          placeholder={"Enter the service name here"}
          {...register("serviceName")}
          error={errors?.serviceName?.message}
        /> */}
     <ServiceSelectField
  label="Service Name"
  name="serviceName"
  list={[
    ...catalogData,
    { value: "hello", label: "Hello" },
    { value: "world", label: "World" },
  ]}
  control={control}
  isListPending={isCatalogPending}
/>

        <SelectDropDown2
          control={control}
          name="serviceCategory"
          error={errors.serviceCategory?.message}
          defaultValue={""}
          label={"Select service to add -Service essentials- "}
          list={serviceOptions}
        />
        <SelectDropDown2
          control={control}
          name="gender"
          error={errors.gender?.message}
          label={"Gender"}
          list={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "non_binary", label: "Non-binary" },
            { value: "prefer_not_to_say", label: "Prefer not to say" },
          ]}
        />

        {/* <Input2
          label={"Tag"}
          name={"tag"}
          inputType="text"
          placeholder={"Enter the tag here"}
          {...register("tag")}
          error={errors?.tag?.message}
        /> */}

        <SelectDropDown2
          defaultValue={""}
          control={control}
          name="serviceTimeFrame"
          error={errors.serviceTimeFrame?.message}
          label={"Approximated Service Timeframe"}
          list={[
            { value: 10, label: "10min" },
            { value: 20, label: "20min" },
            { value: 30, label: "30min" },
            { value: 40, label: "40min" },
            { value: 50, label: "50min" },
            { value: 60, label: "1 hour" },
            { value: 120, label: "2 hours" },
            { value: 180, label: "Over two hours" },
          ]}
        />
        <Input2
          label={"Amount to charge"}
          name={"amount"}
          inputType="text"
          placeholder={""}
          {...register("amount", { valueAsNumber: true })}
          icon={currency}
          error={errors?.amount?.message}
        />

        {/* <Input2
          label={"Essential"}
          name={"serviceEssential"}
          inputType="text"
          placeholder={"Enter service essential here"}
          {...register("serviceEssential")}
          error={errors?.serviceEssential?.message}
        /> */}

        <ServiceEssentials
          register={register}
          errors={errors}
          fields={fields}
          setFields={setFields}
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
                label="Service essential image"
                name="picture"
                error={errors.picture?.message}
                accept="image/jpeg, image/png, image/webp, image/gif"
                placeholder="Upload image of Certificate"
                optional={true}
              />
            )}
          />
        </div>

        {/* <CreateServiceEssentialForm
          control={control}
          register={register}
          errors={errors}
        /> */}

        <ActionButton
          type="submit"
          disabled={status === "loading"}
          // padding="1rem"
          sx={{
            ...style,
            width: "100%",
            marginTop: "1rem",
            "&:hover": {
              backgroundColor:
                status === "idle" ? "#DB7F1A" : style.backgroundColor,
            },
          }}
        >
          {status === "loading" && (
            <Lottie
              size={20}
              className="w-6"
              animationData={spinner}
              loop={true}
            />
          )}{" "}
          {content}
        </ActionButton>
      </form>
    </div>
  );
};

export default CreateServiceForm;
