import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [visibleWindows, setVisibleWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [zindex, setZindex] = useState(100);

  const toggleWindow = (windowName) => {
    setOpenWindows((prevOpenWindows) =>
      prevOpenWindows.includes(windowName)
        ? prevOpenWindows.filter((name) => name !== windowName)
        : [...prevOpenWindows, windowName]
    );
    setVisibleWindows((prevVisibleWindows) =>
      prevVisibleWindows.includes(windowName)
        ? prevVisibleWindows.filter((name) => name !== windowName)
        : [...prevVisibleWindows, windowName]
    );
    handleIconClick(windowName);
  };

  const handleIconClick = (windowName) => {
    if (activeWindow === windowName) {
      setActiveWindow(null);
    } else {
      setActiveWindow(windowName);
    }
  };

  return (
    <UIContext.Provider 
    value={{
      openWindows, setOpenWindows,
      visibleWindows, setVisibleWindows,
      activeWindow, setActiveWindow,
      zindex, setZindex,
      toggleWindow, handleIconClick 
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  return useContext(UIContext);
};