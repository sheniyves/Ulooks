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
import { recentlyUsedServices } from "../../data/recentlyUsedServices";
import { Link } from "react-router-dom";
import PageTransition from "../../Components/SharedComponents/PageTransition";
import { notifications } from "../../data/notification";
import MobileLocation from "../../Components/SharedComponents/MobileLocation";
import { getFromLocalStorage } from "../../Utils/presistStorage";
const CustomerHome = () => {
     const {name} = getFromLocalStorage("customerData", "User")
  const [selectedService, setSelectedService] = React.useState(null);
  const { inputRef, setDebounceValue } = useSearchCtx();
  const {
    register,
    formState: { errors },
  } = useForm();

  const dialogRef = React.useRef(null);
  const dragRef = React.useRef(null);

  // React.useEffect(() => {
  //   if (location.state?.openKYCDialog) {
  //     dialogRefKYC.current?.openDialog();
  //     navigate(location.pathname, { replace: true });
  //   }
  // }, [location.state]);

  return (
    <div className="pb-[8rem] relative  ">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />
        <Notification dialogRef={dialogRef} notifications={notifications} />
        <div className=" mt-4 lg:mt-[8.5rem]" />
        <Header action={dialogRef} icon={notification}>
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
            <Link to={"/customerAuth/getStarted_SignIn"}>
              <h2 className="text-darkerPurple font-fashion font-bold text-2xl mt-4">
                Recently Used Services
              </h2>
            </Link>
            <ul className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(342px,_1fr))] gap-4 mt-4">
              {recentlyUsedServices.slice(0, 3).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </ul>
            {selectedService && (
              <SelectModal
                setSelectedService={setSelectedService}
                selectedService={selectedService}
              />
            )}
        {/* <AlertDialogSlide/> */}

            <CompletedService
              selectedService={selectedService}
              selected={setSelectedService}
            />
          </Content>
        </PageTransition>
      </ConatinerWidth>
    </div>
  );
};

export default CustomerHome;
