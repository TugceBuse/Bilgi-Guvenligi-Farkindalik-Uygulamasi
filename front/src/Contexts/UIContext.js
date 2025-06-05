import React, { createContext, useContext, useEffect, useState } from 'react';

const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [visibleWindows, setVisibleWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [zindex, setZindex] = useState(100);
  const [windowProps, setWindowProps] = useState({});
  const [mouseLocked, setMouseLocked] = useState(false);

  useEffect(() => {
    if (openWindows.length === 0 || visibleWindows.length === 0) return;
    setActiveWindow(visibleWindows[visibleWindows.length - 1]);
    updateZindex();
  }, [openWindows, visibleWindows]);

  const blockEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (openWindows.length === 0) return;
    openWindows.forEach((windowName) => {
      const el = document.querySelector(`[data-window="${windowName}"]`);
      if (el) {
        const z = window.getComputedStyle(el).zIndex;
        console.log(`[${windowName}] z-index: ${z}`, el);
      } else {
        console.log(`[${windowName}] => DOM'da bulunamadı.`);
      }
    });
  }, [openWindows,visibleWindows]);

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

  // YENİ: Açma fonksiyonu
  const openWindow = (windowName, props = {}) => {
  setOpenWindows((prev) => {
    if (!prev.includes(windowName)) return [...prev, windowName];
    return prev;
  });
  setVisibleWindows((prev) => {
    if (!prev.includes(windowName)) return [...prev, windowName];
    return prev;
  });
  setWindowProps((prev) => ({ ...prev, [windowName]: props }));
  setActiveWindow(windowName);
  updateZindex();
};

  useEffect(() => {
    // Tüm uygulama için sadece bir kere çalışacak event dinleyici
    const handler = (e) => {
      if (!openWindows.includes("browser")) {
        // Browser kapalıysa, açarken url/props ile birlikte aç
        openWindow("browser", e.detail || {});
      } else {
        // Browser açıksa, visibleWindows'ta EN SONA al → z-index olarak en önde olur
        setVisibleWindows(prev => {
          const filtered = prev.filter(win => win !== "browser");
          return [...filtered, "browser"];
        });
        setActiveWindow && setActiveWindow("browser");
        window.dispatchEvent(new CustomEvent("open-browser-url", { detail: e.detail }));
      }
    };
    window.addEventListener("open-browser-url", handler);

    return () => window.removeEventListener("open-browser-url", handler);
  }, [openWindows, setActiveWindow, openWindow]);

  const closeWindow = (windowName) => {
  setOpenWindows((prev) => prev.filter((name) => name !== windowName));
  setVisibleWindows((prev) => {
    const updated = prev.filter((name) => name !== windowName);
    setActiveWindow((currActive) =>
      currActive === windowName
        ? (updated.length > 0 ? updated[updated.length - 1] : null)
        : currActive
    );
    return updated;
  });
  // setWindowProps(prev => {
  //   const updated = { ...prev };
  //   delete updated[windowName];
  //   return updated;
  // });
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
        openWindow, closeWindow,   
        handleIconClick,
        lockMouse, unlockMouse, mouseLocked,
        windowProps, setWindowProps,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);
