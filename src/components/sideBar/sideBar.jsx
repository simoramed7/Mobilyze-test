import { useContext } from "react";
import { LocationsContext } from "../../context";

export const SideBar = () => {
  const { location, selectedLocation } = useContext(LocationsContext);
  const [locations, setLocations] = location;
  const [selectedLocations, setSelectedLocations] = selectedLocation;

  const handleLocationAdd = (location) => {
    setLocations([...locations, location]);
    setSelectedLocations([]);
  };
  const handleLocationRemove = (index) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  };
  const handleCenterPosition = (location) => {
    setSelectedLocations([location]);
  };

  // REFACTOR COORDS CARD AND RE USE IT FOR CURRENT COORDS AND SAVED COORDS ***
  // Move style to separate file ***
  return (
    <div
      style={{
        backgroundColor: "#2E4172",
        width: "20vw",
        margin: 8,
        padding: 16,
        textAlign: "center",
        borderRadius: 5,
      }}
    >
      <img src="mobilyze.png" alt="" width={120} height={40} />
      <h2>Current Location</h2>
      {selectedLocations.map((location, index) => (
        <div
          key={index}
          style={{ marginTop: 8, borderRadius: 4, backgroundColor: "#7886AB" }}
        >
          <div>Lat: {location.lat}</div>
          <div>Lng: {location.lng}</div>
          <div>
            <button
              onClick={() => handleLocationAdd(location)}
              style={{ margin: 8 }}
            >
              Add +
            </button>
          </div>
        </div>
      ))}
      <h2>Saved Locations List</h2>
      <ul style={{ padding: 8 }}>
        {locations.map((location, index) => (
          <div
            key={index}
            style={{
              marginBottom: 8,
              borderRadius: 4,
              backgroundColor: "#7886AB",
            }}
          >
            <div>Lat: {location.lat}</div>
            <div>Lng: {location.lng}</div>
            <div>
              <button
                onClick={() => handleLocationRemove(index)}
                style={{ margin: 8 }}
              >
                Remove
              </button>
              <button
                onClick={() => handleCenterPosition(location)}
                style={{ margin: 8 }}
              >
                Go To &#62;&#62;
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};
