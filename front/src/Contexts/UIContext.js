import React, { createContext, useContext, useEffect, useState } from 'react';

const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [visibleWindows, setVisibleWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [zindex, setZindex] = useState(100);

  useEffect(() => {
    console.log('openWindows:', openWindows, 'visibleWindows:', visibleWindows);
    if (openWindows.length === 0 || visibleWindows.length === 0 ) return;

      setActiveWindow(visibleWindows[visibleWindows.length - 1]);
      updateZindex(); // Kapatılan pencere sonrası z-index sıralamasını yenile
    
  }, [openWindows]);

  // useEffect(() => {
  //   console.log('🧭 Z-Index Durumu:');
  
  //   visibleWindows.forEach((windowName) => {
  //     // Dosya mı değil mi ayırt edebilmek için hem class hem data-filename kontrolü yapılabilir
  //     const element = document.querySelector(`.${windowName}-window`) || document.querySelector(`[data-filename="${windowName}"]`);
  //     if (element) {
  //       console.log(`🔹 ${windowName}: z-index = ${element.style.zIndex}`);
  //     } else {
  //       console.warn(`❌ ${windowName} pencere elementi bulunamadı`);
  //     }
  //   });
  
  // }, [visibleWindows, activeWindow]);
  

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