import React from "react";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Container from "../../Components/SharedComponents/Container";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import Navbar from "../../Components/SharedComponents/Navbar";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import HeaderCrumb from "../../Components/SharedComponents/HeaderCrumb";
import { services } from "../../data/barbingService";
import ServiceCard from "../../Components/WebComponents/ServiceCard";
import { useSearchCtx } from "../../Context/SearchCtx";
import MobileNavbar from "../../Components/WebComponents/MobileNavbar";
import searchIcon from "../../assets/Images/search-normal.svg";
import SearchBar from "../../Components/SharedComponents/SearchBar";
import PageTransition from "../../Components/SharedComponents/PageTransition";

const SearchScreen = () => {
  const { debouncedSearchTerm, inputRef, setDebounceValue } = useSearchCtx();

  const filteredServices = React.useMemo(() => {
    const value = debouncedSearchTerm.toLowerCase();
    return services.filter((service) => {
      const nameMatch = service.name.toLowerCase().includes(value);
      const typeMatch = Array.isArray(service.serviceType)
        ? service.serviceType.some((type) => type.toLowerCase().includes(value))
        : service.serviceType.toLowerCase().includes(value);
      return nameMatch || typeMatch;
    });
  }, [debouncedSearchTerm]);

  return (
    <PageTransition>
      <div className="min-h-screen pb-[7rem]">
        <ConatinerWidth>
          <Sidebar />
          <Navbar />
          <MobileNavbar />

          <Container useMargin={window.innerWidth > 1024}>
            <HeaderCrumb>
              <img src={arrowLeft} alt="An arrow icon facing left" />
              Search
            </HeaderCrumb>

            <div className=" mt-4 flex gap-2 lg:hidden">
              <SearchBar
                setDebounceValue={setDebounceValue}
                icon={searchIcon}
                inputRef={inputRef}
              />
              {/* <img
                      onClick={() => dragRef.current?.openMobileDrawer()}
                      src={locationIcon}
                      alt="Location icon"
                    /> */}
            </div>
            {filteredServices.length > 0 ? (
              <ul className="flex flex-col gap-y-6 mt-6">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-center text-gray-500">
                No services found.
              </p>
            )}
          </Container>
        </ConatinerWidth>
      </div>
    </PageTransition>
  );
};

export default SearchScreen;
