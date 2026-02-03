import React from "react";
import Header from "../../Components/SharedComponents/Header";
import Navbar from "../../Components/SharedComponents/Navbar";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import MobileNavbar from "../../Components/WebComponents/MobileNavbar";
import Content from "../../Components/SharedComponents/Content";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import ServiceForWho from "../../Components/WebComponents/ServiceForWho";
import BookingServiceForm from "../../Components/WebComponents/BookingServiceForm";
import Calendar from "./Calandar";
import SubServices from "../../Components/WebComponents/SubServices";
import AvailableTime from "../../Components/WebComponents/AvailableTime";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import AddFromContact from "../../Components/WebComponents/AddFromContact";
import { useParams } from "react-router-dom";
import SubscribeToggleButton from "../../Components/WebComponents/SubscribeToggleButton";
import ScheduledService from "../../Components/WebComponents/ScheduledService";
import SmoothToggleVisibility from "../../Components/SharedComponents/SmoothToggleVisibility";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../Utils/presistStorage";
import NumberOfTimesAvailable from "../../Components/WebComponents/NumberOfTimesAvailable";
import Timeframe from "../../Components/WebComponents/Timeframe";
import { useDispatch } from "react-redux";
import { addSubscribed } from "../../redux/bookingsSlice";

const Booking = () => {
  const [selectedOption, setSelectedOption] = React.useState(
    getFromLocalStorage("serviceForWho", "self")
  );
  const [subscribed, setSubscribed] = React.useState(
    getFromLocalStorage("subscribed", false)
  );

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(addSubscribed(subscribed));
  }, [subscribed, dispatch]);

  const submitRef = React.useRef(null);
  const { serviceId } = useParams();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  React.useEffect(() => {
    setToLocalStorage("subscribed", subscribed);
    setToLocalStorage("serviceForWho", selectedOption);
  }, [subscribed, selectedOption]);

  return (
    <div className="pb-[8rem] relative">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <div className=" mt-4 lg:mt-[8.5rem]" />
        <Header iconPresence={false}>
          <div className="flex items-center gap-2">
            <img src={arrowLeft} alt="" />
            Booking a service
          </div>
        </Header>
        <PageTransition>
          <Content useInlinepadding={window.innerWidth > 768} useMargin={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-20 mt-4 ">
              <div className=" px-4 md:px-0">
                <BookingInputAndCalendar
                  setSubscribed={setSubscribed}
                  subscribed={subscribed}
                  submitRef={submitRef}
                  selectedOption={selectedOption}
                  handleChange={handleChange}
                />
              </div>

              <div>
                <BookingSubSeviceAndTime
                  selectedOption={selectedOption}
                  submitRef={submitRef}
                  subscribed={subscribed}
                />
              </div>
            </div>
          </Content>
        </PageTransition>
        <MobileNavbar />
      </ConatinerWidth>
    </div>
  );
};

export default Booking;

const BookingInputAndCalendar = ({
  selectedOption,
  subscribed,
  setSubscribed,
  handleChange,
  submitRef,
}) => {
  const [selected, setSelected] = React.useState(
    getFromLocalStorage("frequency", options[0])
  );

  React.useEffect(() => {
    if (!selected && !options.includes(selected)) {
      setSelected(options[0]);
    }
  }, [selected]);

  React.useEffect(() => {
    setToLocalStorage("frequency", selected);
  }, [selected]);

  const handleChangeFrequency = (option) => {
    if (option !== selected) {
      setSelected(option);
    }
  };

  return (
    <div>
      <ServiceForWho
        selectedOption={selectedOption}
        handleChange={handleChange}
      />
      <BookingServiceForm submitRef={submitRef} />
      <SubscribeToggleButton
        isSubscribed={subscribed}
        onToggle={() => setSubscribed(!subscribed)}
      />
      {subscribed && <ScheduledService />}
      {subscribed && (
        <NumberOfTimesAvailable
          options={options}
          value={selected}
          onChange={handleChangeFrequency}
        />
      )}
      <div className="mb-6" />
      <SmoothToggleVisibility>
        <Calendar />
      </SmoothToggleVisibility>
    </div>
  );
};
const BookingSubSeviceAndTime = ({ submitRef, selectedOption, subscribed }) => {
  return (
    <div>
      <SubServices />
      {selectedOption === "someone" && <AddFromContact />}

      <PageTransition key={subscribed}>
        <SmoothToggleVisibility>
          {subscribed ? (
            <Timeframe submitRef={submitRef} />
          ) : (
            <AvailableTime submitRef={submitRef} />
          )}
        </SmoothToggleVisibility>
      </PageTransition>
    </div>
  );
};

const options = [
  "Twice a Month",
  "Three times a month",
  "Four times a month",
  "Five times a month",
];
