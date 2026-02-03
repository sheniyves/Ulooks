import { Radio } from "@mui/material";
import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addTimeframe } from "../../redux/bookingsSlice";

const Timeframe = ({ submitRef }) => {
  const [selectedOption, setSelectedOption] = React.useState(timeframe[0]);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const dispatch = useDispatch();
  //Used in checkout
  React.useEffect(() => {
    dispatch(addTimeframe(selectedOption));
  }, []);

  const userData = useSelector((state) => {
    const {
      person,
      availableTime,
      date,
      bookingsForm,
      subService,
      monthsSubscribed,
      frequencyPerMonth,
    } = state.bookings;
    return {
      person,
      availableTime,
      date,
      bookingsForm,
      subService,
      monthsSubscribed,
      frequencyPerMonth,
    };
  });

  const form = userData.bookingsForm;

  const requiredFields = ["fullName", "email", "phoneNumber"];
  const hasFilledForm = requiredFields.every((field) => {
    const value = form?.[field];
    return typeof value === "string" && value.trim() !== "";
  });

  const hasSelectedSubService =
    Array.isArray(userData.subService) && userData.subService.length > 0;

  const isButtonReady = hasFilledForm && hasSelectedSubService;

  return (
    <div className="mt-4 px-4 md:px-0">
      <p className="text-darkPurple text-sm font-bold">Choose a Timeframe</p>
      <ul className="mt-6">
        {timeframe.map((time, i) => (
          <React.Fragment key={`${time}` + i}>
            <li className="text-darkPurple block capitalize -mb-2 font-medium">
              {time}
            </li>
            <div className="-ml-2">
              <Radio
                value={time}
                checked={selectedOption === time}
                onChange={handleChange}
                sx={{
                  color: "#6A0DAD",
                  "&.Mui-checked": {
                    color: "#6A0DAD",
                  },
                }}
              />
            </div>
          </React.Fragment>
        ))}
      </ul>
      <Button
        disabled={!isButtonReady}
        onClick={() => submitRef.current?.click()}
        backgroundColor={"#6A0DAD"}
        sx={{
          width: "100%",
          color: "#fff",
          marginTop: "3rem",
          "&:hover": {
            backgroundColor: "#5a0a99",
          },
        }}
      >
        Continue
      </Button>
    </div>
  );
};

export default Timeframe;

const timeframe = [
  "Mornings (7:30AM - 10:00AM)",
  "Mid-Morning (10:00AM - 12:000PM)",
  "Midday (12:000PM - 2:00PM)",
  "Afternoons (2: 00PM - 5:00PM)",
  "Evenings (5: 00PM - 9:00PM)",
];
