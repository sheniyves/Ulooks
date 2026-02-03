import ConatinerWidth from "../../Components/SharedComponents/ConatinerWidth";
import Navbar from "../../Components/SharedComponents/Navbar";
import Sidebar from "../../Components/SharedComponents/Sidebar";
import React from "react";
import { fetchCoordinates } from "../../Utils/fetchCoordinates";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Content from "../../Components/SharedComponents/Content";
import "leaflet/dist/leaflet.css";
import closeCircle from "../../assets/Images/close-circle.svg";
import L from "leaflet";
import { Backdrop, IconButton } from "@mui/material";
import AlertDialog from "../../Components/SharedComponents/AlertDialog";
import { topService } from "../../data/topService";
import { services } from "../../data/barbingService";
import { useParams } from "react-router-dom";
import BookingNowMobile from "../../Components/WebComponents/BookingNowMobile";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

import { useMediaQuery } from "@mui/material";
import BookNowStep1 from "../../Components/WebComponents/BookNowStep1";
import { useSelector } from "react-redux";
import BookNowStep2 from "../../Components/WebComponents/BookNowStep2";
import BookNowStep3 from "../../Components/WebComponents/BookNowStep3";
import BookNowStep4 from "../../Components/WebComponents/BookNowStep4";
import BookNowStep5 from "../../Components/WebComponents/BookNowStep5.jsx";
import BookNowSuccessful from "../../Components/WebComponents/BookNowSuccessful";
import ViewBookedSevice from "../../Components/WebComponents/ViewBookedSevice";

const BookNow = () => {
  const { serviceId } = useParams();
  const data = [...services, ...topService];
  const singleData = data.find((d) => d.id === serviceId);
  const [coordinates, setCoordinates] = React.useState(null);
  const location = "742 Evergreen Terrace, Springfield, IL 62704, USA";
  const dialogRef = React.useRef(null);
  const mobileRef = React.useRef(null);
  const step = useSelector((state) => state.newBookings.step);

  const isMobile = useMediaQuery("(max-width:770px)");

  React.useEffect(() => {
    if (!location) return;
    const getCoords = async () => {
      const coords = await fetchCoordinates(location);
      if (coords) setCoordinates(coords);
    };
    getCoords();
  }, [location]);

  React.useEffect(() => {
    if (coordinates) {
      if (isMobile) {
        mobileRef.current?.openMobileDrawer();
      } else {
        dialogRef.current?.openDialog();
      }
    }
  }, [coordinates, isMobile]);

  return (
    <div className="overflow-y-hidden relative">
      <ConatinerWidth>
        <Sidebar />
        <Navbar />

        <BookingNowMobile dragRef={mobileRef} data={singleData} />

        <AlertDialog
          dialogTitle=""
          ref={dialogRef}
          iconPresence={false}
          background={step === 6 ? "#F4E2FE" : "white"}
        >
          <div className="px-4  pb-4  -mt-8 md:min-w-[32rem]">
            <div className="text-right">
              <IconButton onClick={() => dialogRef.current?.closeDialog()}>
                <img src={closeCircle} alt="close icon" />
              </IconButton>
            </div>
            {step === 1 && <BookNowStep1 data={singleData} />}
            {step === 2 && <BookNowStep2 />}
            {step === 3 && <BookNowStep3 />}
            {step === 4 && <BookNowStep4 />}
            {step === 5 && <BookNowStep5 serviceId={serviceId} />}
            {step === 6 && <BookNowSuccessful />}
            {step === 7 && <ViewBookedSevice data={singleData} />}
          </div>
        </AlertDialog>

        <Content
          useInlinepadding={false}
          useMargin={true}
          useMarginRight={false}
        >
          {coordinates ? (
            <div
              style={{ height: "85svh", width: "100%", marginTop: "-1.3rem" }}
            >
              <MapContainer
                center={coordinates}
                zoom={15}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "400px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={coordinates}>
                  <Popup>{location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <Backdrop />
          )}
        </Content>
      </ConatinerWidth>
    </div>
  );
};

export default BookNow;
