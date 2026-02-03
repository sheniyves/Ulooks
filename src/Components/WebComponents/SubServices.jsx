import React from "react";
import image1 from "../../assets/Images/subImage1.svg";
import image2 from "../../assets/Images/subImage2.svg";
import image3 from "../../assets/Images/subImage3.svg";
import image4 from "../../assets/Images/subImage4.svg";
import image5 from "../../assets/Images/subImage5.svg";
import image6 from "../../assets/Images/subImage6.svg";
import { handlePriceFormatting } from "../../Utils/formattingFunction";
import CheckCircleIcon from "./CheckCircleIcon";
import { useDispatch } from "react-redux";
import { addSubService } from "../../redux/bookingsSlice";

const SubServices = () => {
  const [selectedService, setSelectedService] = React.useState([]);

  const dispatch = useDispatch();

  const handleSelectedService = (ID) => {
    setSelectedService((prev) => {
      const isAlreadySelected = prev.includes(ID);
      const updated = isAlreadySelected
        ? prev.filter((id) => id !== ID)
        : [...prev, ID];
      return updated;
    });
  };

  React.useEffect(() => {
    dispatch(addSubService(selectedService));
  }, [selectedService, dispatch]);

  const progressPercent = (selectedService.length / sub_Services.length) * 100;

  return (
    <div className="bg-[#E7CBFB] p-4 rounded-lg shadow-md">
      <p className="text-darkPurple text-sm font-medium">Choose Sub service</p>
      <span className="text-[#667085] text-sm font-normal">
        You can select multiple
      </span>

      <div className="mt-4">
        <ul className="grid grid-cols-4 gap-1">
          {sub_Services.map((service) => {
            const isSelected = selectedService.includes(service.id);
            return (
              <li
                key={service.id}
                className="flex flex-col items-center relative"
              >
                <div
                  onClick={() => handleSelectedService(service.id)}
                  className="relative w-[60px] h-[60px] cursor-pointer"
                >
                  <img
                    src={service.image}
                    alt="service"
                    className="rounded-full w-full h-full object-cover"
                  />
                  {isSelected && (
                    <>
                      <div className="absolute inset-0 bg-black/40 rounded-full z-10" />
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <CheckCircleIcon className="w-6 h-6" />
                      </div>
                    </>
                  )}
                </div>

                <div className="text-center mt-1">
                  <p className="text-darkPurple font-medium text-[12px] ">
                    {service.service}
                  </p>
                  <p className="text-sm text-darkPurple font-bold">
                    {handlePriceFormatting(service.amount)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="mt-4 w-[80%] mx-auto"
        style={{
          backgroundColor: "#F4E2FE",
          borderRadius: "4px",
          height: "8px",
          padding: "1.8px",
        }}
      >
        <div
          style={{
            borderRadius: "4px",
            backgroundColor: "#6A0DAD",
            width: `${progressPercent}%`,
            height: "100%",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>
    </div>
  );
};

export default SubServices;

export const sub_Services = [
  {
    id: 1,
    service: "Dreads",
    amount: 5000,
    image: image1,
    duration: 90,
    audience: "Adult",
  },
  {
    id: 2,
    service: "Simple Haircut",
    amount: 1000,
    image: image2,
    duration: 30,
    audience: "Adult & Children",
  },
  {
    id: 3,
    service: "Designer Haircut",
    amount: 2000,
    image: image3,
    duration: 45,
    audience: "Adult",
  },
  {
    id: 4,
    service: "Female Haircut",
    amount: 5000,
    image: image4,
    duration: 60,
    audience: "Female",
  },
  {
    id: 5,
    service: "Low Fade",
    amount: 3000,
    image: image4,
    duration: 40,
    audience: "Adult & Children",
  },
  {
    id: 6,
    service: "Spotting Waves",
    amount: 500,
    image: image5,
    duration: 25,
    audience: "Children",
  },
  {
    id: 7,
    service: "Spotting Waves",
    amount: 500,
    image: image6,
    duration: 25,
    audience: "Children",
  },
  {
    id: 8,
    service: "Spotting Waves",
    amount: 500,
    image: image1,
    duration: 25,
    audience: "Children",
  },
];
