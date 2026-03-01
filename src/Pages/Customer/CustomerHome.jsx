import React from "react";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Content from "../../Components/SharedComponents/Content";
import TopServiceOfTheWeek from "../../Components/WebComponents/TopServiceOfTheWeek";
import ServiceCategories from "../../Components/WebComponents/ServiceCategories";
import ServiceCard from "../../Components/WebComponents/ServiceCard";
import CompletedService from "../../Components/WebComponents/CompletedService";
import SelectModal from "../../Components/SharedComponents/SelectModal";
import Header from "../../Components/SharedComponents/Header";
import notification from "../../assets/Images/notification-status.svg";
import SearchBar from "../../Components/SharedComponents/SearchBar";
import { useSearchCtx } from "../../Context/SearchCtx";
import searchIcon from "../../assets/Images/search-normal.svg";
import locationIcon from "../../assets/Images/locationIcon.svg";
import Notification from "../../Components/WebComponents/Notification";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import MobileLocation from "../../Components/SharedComponents/MobileLocation";
import { getFromLocalStorage } from "../../Utils/presistStorage";
import { useQueryFn } from "../../../hooks/queryFn";
import { getRisingStars } from "../../api/services";
import { getNotifications } from "../../api/notifications";
const CustomerHome = () => {
  const navigate = useNavigate();
  const { name } = getFromLocalStorage("customerData", "User");
  const [selectedService, setSelectedService] = React.useState(null);
  const { inputRef, setDebounceValue } = useSearchCtx();
  const {
    register,
    formState: { errors },
  } = useForm();
  const dialogRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const limit = 10;
  const { data, isPending, isError } = useQueryFn({
    key: ["rising_stars", limit],
    fun: () => getRisingStars(limit),
  });



  const howUlooksWorks = () => {
    navigate("/customerWebApp/profile", {
      state: { openInviteDrawer: true },
    });
  
  };
  return (
    <div className="pb-[8rem] relative  ">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        {/* <Notification dialogRef={dialogRef} notifications={notifications?.data } /> */}
        <div className=" mt-4 lg:mt-[8.5rem]" />
        <Header action={dialogRef} icon={notification} iconPresence={false}>
          Welcome back {name?.split(" ")[0]}
        </Header>
        <TopServiceOfTheWeek />
        <PageTransition>
          <Content useMargin={false}>
            <div className=" mt-4 flex gap-2 lg:hidden">
              <SearchBar
                setDebounceValue={setDebounceValue}
                icon={searchIcon}
                inputRef={inputRef}
              />
              <img
                onClick={() => dragRef.current?.openMobileDrawer()}
                src={locationIcon}
                alt="Location icon"
              />
            </div>
            <MobileLocation
              dragRef={dragRef}
              errors={errors}
              register={register}
            />
            <ServiceCategories />
            <div className="flex items-center justify-between ">
              <h2 className="text-darkerPurple font-fashion font-bold text-2xl mt-4">
                Rising Stars
              </h2>
              <Link to={"/customerWebApp/home/risingStars"}>
                <p className="text-xs hover:underline cursor-pointer text-blue">
                  See more
                </p>
              </Link>
            </div>
            <ul
              className=" flex cursor-grab items-center overflow-x-scroll gap-4 mt-4 "
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {data?.data?.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isPending={isPending}
                  isError={isError}
                />
              ))}
            </ul>
            {selectedService && (
              <SelectModal
                setSelectedService={setSelectedService}
                selectedService={selectedService}
              />
            )}

            <p className="text-sm cursor-pointer underline text-center text-purple mt-12" onClick={howUlooksWorks}>
              How Ulooks works
            </p>
            {/* <AlertDialogSlide/> */}

            {/* <CompletedService
              selectedService={selectedService}
              selected={setSelectedService}
            /> */}
          </Content>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default CustomerHome;
