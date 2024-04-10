import { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LeafletMarkers } from "./leafletMarkers";
import { LocationsContext } from "../../context";
import { selectedIcon } from "./markerIcon";

export const MainMap = () => {
  const { location, selectedLocation } = useContext(LocationsContext);
  const [locations] = location;
  const [selectedLocations, setSelectedLocations] = selectedLocation;
  const [position, setPosition] = useState([51.505, -0.09]);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    if (selectedLocations.length) {
      setPosition(selectedLocations);
    }
  }, [selectedLocations]);

  const handleTileLoadError = (event) => {
    setLoadingError("Error loading map tiles");
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      {loadingError ? (
        <div>{loadingError}</div>
      ) : (
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          onLoadError={handleTileLoadError}
        />
      )}
      <LeafletMarkers />
      {locations?.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          onClick={() => {
            setSelectedLocations(location);
          }}
        >
          <Popup>Saved !</Popup>
        </Marker>
      ))}

      {selectedLocations?.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={selectedIcon}
          onClick={() => {
            setSelectedLocations(location);
          }}
        >
          <Popup>Please Click Add + to pin this location</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
