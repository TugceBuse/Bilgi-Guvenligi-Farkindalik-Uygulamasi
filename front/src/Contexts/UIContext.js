import React, { createContext, useContext, useEffect, useState } from 'react';

const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [visibleWindows, setVisibleWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [zindex, setZindex] = useState(100);


  useEffect(() => {
    if (openWindows.length === 0) {
      setZindex(100);
    } else {
      setActiveWindow(visibleWindows[visibleWindows.length - 1]);
      updateZindex(); // Kapatılan pencere sonrası z-index sıralamasını yenile
    }
  }, [openWindows]);
  

  useEffect(() => {
    console.log(`OpenWindows: ${openWindows}`, `VisibleWindows: ${visibleWindows}`, `ActiveWindow: ${activeWindow}`);
  }, [openWindows, visibleWindows, activeWindow]);

  useEffect(() => {
    console.log(`Zindex: ${zindex}`);
  }, [zindex]);

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

  const updateZindex = () => {
    setZindex((prevZindex) => {
      let newZindex = prevZindex;
      visibleWindows.forEach((window, index) => {
        const element = document.querySelector(`.${window}-window`);
        if (element) {
          element.style.zIndex = 100 + index;  // Z-index değerlerini güncelle
        }
      });
  
      return newZindex; // Eğer pencere kapandıysa z-index aynı kalmalı
    });
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