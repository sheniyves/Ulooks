import React from "react";
import Button from "./Button";
import {
  setToLocalStorage,
} from "../../Utils/presistStorage";

const ServiceLocationPicker = ({locationPicker, setLocationPicker}) => {
 
  React.useEffect(() => {
    setToLocalStorage("serviceLocation", locationPicker);
  }, [locationPicker]);
  const buttonStyle = locationPicker
    ? { backgroundColor: "#6A0DAD", color: "#FFF" }
    : {
        backgroundColor: "#FFF",
        color: "#6A0DAD",
        border: "1px solid #6A0DAD",
      };
  return (
    <div className="flex items-center justify-between">
      <Button
        backgroundColor={
          locationPicker === "inShop" ? buttonStyle : "transparent"
        }
        sx={{
          border: locationPicker !== "inShop" ? "1px solid #6A0DAD" : "1px solid #6A0DAD",
          color: locationPicker !== "inShop" ? "#6A0DAD" : "#FFF",
        }}
        onClick={() => setLocationPicker("inShop")}
      >
        I'll go to the shop
      </Button>
      <Button
        backgroundColor={
          locationPicker === "atHome" ? buttonStyle : "transparent"
        }
        sx={{
          border: locationPicker !== "atHome" ? "1px solid #6A0DAD" : "1px solid #6A0DAD",
          color: locationPicker !== "atHome" ? "#6A0DAD" : "#FFF",
        }}
        onClick={() => setLocationPicker("atHome")}
      >
        Home Service
      </Button>
    </div>
  );
};

export default ServiceLocationPicker;
