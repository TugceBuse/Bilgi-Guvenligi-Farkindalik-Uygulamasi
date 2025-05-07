import React, { createContext, useContext, useEffect, useState } from 'react';

const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [visibleWindows, setVisibleWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [zindex, setZindex] = useState(100);
  const [mouseLocked, setMouseLocked] = useState(false);

  useEffect(() => {
    if (openWindows.length === 0 || visibleWindows.length === 0) return;
    setActiveWindow(visibleWindows[visibleWindows.length - 1]);
    updateZindex();
  }, [openWindows]);

  const blockEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const lockMouse = () => {
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

    overlay.addEventListener('mousedown', blockEvent, true);
    overlay.addEventListener('mousemove', blockEvent, true);
    overlay.addEventListener('click', blockEvent, true);

    document.body.appendChild(overlay);
    setMouseLocked(true);
  };

  const unlockMouse = () => {
    const overlay = document.getElementById('mouse-lock-overlay');
    if (overlay) overlay.remove();
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
      }, 800);
    };

    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  };

  const toggleWindow = (windowName) => {
    setOpenWindows((prev) =>
      prev.includes(windowName)
        ? prev.filter((name) => name !== windowName)
        : [...prev, windowName]
    );
    setVisibleWindows((prev) =>
      prev.includes(windowName)
        ? prev.filter((name) => name !== windowName)
        : [...prev, windowName]
    );
    handleIconClick(windowName);
  };

  const handleIconClick = (windowName) => {
    setActiveWindow((prev) => (prev === windowName ? null : windowName));
  };

  const updateZindex = () => {
    setZindex((prev) => {
      visibleWindows.forEach((win, index) => {
        const el = document.querySelector(`.${win}-window`);
        if (el) el.style.zIndex = 100 + index;
      });
      return prev;
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
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);
