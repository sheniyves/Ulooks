import { useParams } from "react-router-dom";
import React, { useRef } from "react";
import MobileNavbar from "../../Components/WebComponents/MobileNavbar";
import Navbar from "../../Components/SharedComponents/Navbar";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Container from "../../Components/SharedComponents/Container";
import HeaderCrumb from "../../Components/SharedComponents/HeaderCrumb";
import arrowLeft from "../../assets/Images/arrow-left.svg";
import { services } from "../../data/barbingService";
import ServiceDetail from "../../Components/SharedComponents/ServiceDetail";
import Dialog from "../../Components/SharedComponents/AlertDialog";
import Map from "../../Components/WebComponents/Map";
import { topService } from "../../data/topService";

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const combinedServices = [...topService, ...services];
  const serviceDetail = combinedServices.find(
    (service) => service.id.toString() === serviceId.toString()
  );

  const dialogRef = useRef(null);
  // const [dialogOpen, setDialogOpen] = React.useState(false);
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (dialogRef.current) {
  //       setDialogOpen(dialogRef.current.isOpen);
  //     }
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, []);
  if (!serviceId || !serviceDetail) return <div>Not found</div>;

  return (
    <div className="min-h-screen pb-[7rem]">
      <ConatinerWidth>
        <div className="relative z-0">
          <Sidebar />
          <Navbar />
          <MobileNavbar />

          <Dialog
            ref={dialogRef}
            dialogTitle=""
            action=""
            iconPresence={false}
            useFullWidth
            reduceIndex
          ></Dialog>
          <Container useMargin={window.innerWidth > 1024}>
            <div className="w-full h-full">
              <HeaderCrumb>
                <img src={arrowLeft} alt="An arrow icon facing left" />
                {serviceDetail.serviceType}
              </HeaderCrumb>
              <div className="w-full md:w-[95%] lg:w-[90%] mx-auto">
                <ServiceDetail
                  serviceDetail={serviceDetail}
                  dialogRef={dialogRef}
                />
              </div>
            </div>
          </Container>
        </div>
      </ConatinerWidth>
    </div>
  );
};

export default ServiceDetailPage;
