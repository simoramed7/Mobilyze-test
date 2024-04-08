import { useState, useEffect } from 'react';
import { SideBar } from './components/sideBar/sideBar';
import { MainMap } from './components/map/leafletMap';
import {LocationsContext} from './context'

export const App = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const storageKey = 'pinnedList';

  const saveStateToLocalStorage = (value) => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  };

  const loadStateFromLocalStorage = () => {
    const storedList = localStorage.getItem(storageKey);
    if (storedList) {
      setLocations(JSON.parse(storedList));
    }
  };
  
  useEffect(() => {
    loadStateFromLocalStorage();

    return () => {
      saveStateToLocalStorage(locations);
    };
  }, []);

  return (
    <div style={{display:'flex', width: '100%'}}>
      <LocationsContext.Provider value={{location :[locations, setLocations], selectedLocation :[selectedLocations, setSelectedLocations]}}>
        <SideBar />
        <MainMap />     
      </LocationsContext.Provider>

    </div>
  );
}
