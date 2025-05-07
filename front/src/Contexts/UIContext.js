import React, { createContext, useContext, useEffect, useState } from 'react';

const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [visibleWindows, setVisibleWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [zindex, setZindex] = useState(100);
  const [mouseLocked, setMouseLocked] = useState(false);
  

   
  useEffect(() => {
    console.log('openWindows:', openWindows, 'visibleWindows:', visibleWindows);
    if (openWindows.length === 0 || visibleWindows.length === 0 ) return;

      setActiveWindow(visibleWindows[visibleWindows.length - 1]);
      updateZindex(); // Kapatılan pencere sonrası z-index sıralamasını yenile
    
  }, [openWindows]);


  const blockEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const lockMouse = () => {
    window.alert('Fareyi kilitleme çalıştı!');
    const existing = document.getElementById('mouse-lock-overlay');
    if (existing) return;
  
    const overlay = document.createElement('div');
    overlay.id = 'mouse-lock-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.zIndex = '999999';
    overlay.style.cursor = 'progress';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.01)';
    // overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.01)'; // 🔁 opacity > 0 olmalı ki bazı tarayıcılar işlesin
    overlay.addEventListener('mousedown', blockEvent, true);
    overlay.addEventListener('mousemove', blockEvent, true);
    overlay.addEventListener('click', blockEvent, true);
    document.body.appendChild(overlay);
  
    setMouseLocked(true);
  };
  
  
  
  const unlockMouse = () => {
    const overlay = document.getElementById('mouse-lock-overlay');
    if (overlay) {
      overlay.remove();
    }
    setMouseLocked(false);
  };

  const trackGhostMouse = () => {
    const handleMove = (e) => {
      const ghost = document.createElement('div');
      ghost.className = 'ghost-cursor';
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
      document.body.appendChild(ghost);
  
      setTimeout(() => {
        ghost.remove();
      }, 800); // 0.8 saniyede silinir
    };
  
    document.addEventListener('mousemove', handleMove);
  
    // disableMouseGhost() çağrıldığında dinleyici silinir
    return () => document.removeEventListener('mousemove', handleMove);
  };
  
  

  

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
      toggleWindow, handleIconClick,
      lockMouse, unlockMouse, mouseLocked,
      trackGhostMouse
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  return useContext(UIContext);
};