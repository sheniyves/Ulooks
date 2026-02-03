import React from "react";
import MapDialog from "../SharedComponents/MapDialog";
import Container from "../SharedComponents/Container";
import arrowLeft from "../../assets/Images/arrow-left.svg";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchCoordinates } from "../../Utils/fetchCoordinates";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const Map = ({ dialogRef, location }) => {
  const [coordinates, setCoordinates] = React.useState(null);
React.useEffect(() => {
  const location = "742 Evergreen Terrace, Springfield, IL 62704, USA";
  if (!location) return;

  const getCoords = async () => {
    const coords = await fetchCoordinates(location);
    if (coords) setCoordinates(coords);
  };

  getCoords();
}, []);


  return (
    <div className="overflow-hidden ">
      <MapDialog
        ref={dialogRef}
        dialogTitle={"↙"}
        action={""}
        iconPresence={false}
      >
        <Container>
          <div className="-mt-[10rem] -ml-9 -mr-9 top-20 h-[85vh] relative z-0 overflow-hidden">
            {coordinates ? (
              <MapContainer
                center={coordinates}
                zoom={15}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={coordinates}>
                  <Popup>{location}</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p className="text-center text-white mt-4">Loading map...</p>
            )}

            <div
              onClick={() => dialogRef.current?.closeDialog()}
              className="z-[500] inline bg-red"
            >
              <img
                className="absolute z-[4000] w-10 top-10"
                src={arrowLeft}
                alt="close"
              />
            </div>
          </div>
        </Container>
      </MapDialog>
    </div>
  );
};

export default Map;
