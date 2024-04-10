import { useEffect, useContext } from "react";
import { useMap } from "react-leaflet";
import { LocationsContext } from "../../context";

export const LeafletMarkers = () => {
  const { selectedLocation } = useContext(LocationsContext);
  const [_, setSelectedLocations] = selectedLocation;
  const map = useMap();
  useEffect(() => {
    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      setSelectedLocations([{ lat, lng }]);
    });
  }, [map, setSelectedLocations]);
};
