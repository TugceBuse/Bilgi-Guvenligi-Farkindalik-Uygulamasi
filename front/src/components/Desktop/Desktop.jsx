import React, { useState, useEffect } from 'react';
import './Desktop.css';
import { useWindowConfigState } from '../../config/windowConfig';
import { useUIContext } from '../../Contexts/UIContext';
import { useGameContext } from '../../Contexts/GameContext';
import TaskBar from '../TaskBar/TaskBar';
import Alert from '../Notifications/Alert';
import RansomScreen from '../Notifications/Ransom';
import { TodoProvider } from '../../Contexts/TodoContext';

const Desktop = () => {
  const { isWificonnected, isransomware } = useGameContext();
  const { openWindows, handleIconClick, zindex, setZindex} = useUIContext();

  const [showRansom, setShowRansom] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { windowConfig, updateAvailableStatus } = useWindowConfigState();

  // Yeni pencere konumlarını tutacak state
  const [windowPositions, setWindowPositions] = useState({});

  const handlers = {
    todolist: windowConfig.todolist.useComponent(),
    mailbox: windowConfig.mailbox.useComponent(),
    browser: windowConfig.browser.useComponent(),
    itsupport: windowConfig.itsupport.useComponent(),
    folder: windowConfig.folder.useComponent(),
    scanner: windowConfig.scanner.useComponent(),
    antivirus: windowConfig.antivirus.useComponent(),
    setup: windowConfig.setup.useComponent(),
  };

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    if (isransomware) {
      const randomDelay = Math.floor(Math.random() * 20000) + 10000;
      const timer = setTimeout(() => setShowRansom(true), randomDelay);
      return () => clearTimeout(timer);
    }
  }, [isransomware]);

  useEffect(() => {
    if (showRansom) {
      const audio = new Audio('/audio/ransomware.m4a');
      audio.play();
      return () => audio.pause();
    }
  }, [showRansom]);

  // Yeni açılan pencereler için rastgele konum ayarlıyoruz
  const getNewWindowPosition = (windowKey) => {
    if (windowPositions[windowKey]) {
      return windowPositions[windowKey]; // Eğer zaten konumu varsa, aynı konumu koru
    }
    const newPos = {
      left: `${window.innerWidth / 10 + Object.keys(windowPositions).length * 30}px`,
      top: `${window.innerHeight / 10 + Object.keys(windowPositions).length * 30}px`,
      zIndex: zindex + Object.keys(windowPositions).length,
    };
    setZindex(zindex + 1);
    console.log('newPos >> ', newPos);
    setWindowPositions((prev) => ({ ...prev, [windowKey]: newPos }));
    return newPos;
  };

  const handleDesktopClick = (windowKey) => {
    const { openHandler } = handlers[windowKey];
    if (!openHandler) {
      console.error(`openHandler is not defined for ${windowKey}`);
      return;
    }

    if (!openWindows.includes(windowKey)) {
      if ((windowKey === 'browser' || windowKey === 'mailbox') && !isWificonnected) {
        setShowAlert(true);
      } else {
        openHandler();
        handleIconClick(windowKey);
      }
    }
  };

  return (
    <div className="desktop">
      <div className="desktop-icons">
        {Object.keys(windowConfig)
          .filter((key) => windowConfig[key].available&&windowConfig[key].location==='desktop') // Sadece desktop konumunda available olanlar
          .map((key) => (
            <div key={key} className="icon" onClick={() => handleDesktopClick(key)}>
              <img src={windowConfig[key].icon} alt={`${windowConfig[key].label} Icon`} />
              <span>{windowConfig[key].label}</span>
            </div>
          ))}
      </div>

      <TodoProvider>
      {openWindows.map((windowKey) => {
          const { component: WindowComponent } = windowConfig[windowKey];
          const { closeHandler } = handlers[windowKey];
          return (
            <WindowComponent
              key={windowKey}
              closeHandler={closeHandler}
              style={getNewWindowPosition(windowKey)} // Yeni pozisyon yönetimi
              updateAvailableStatus={updateAvailableStatus}
            />
          );
        })}
      </TodoProvider>

      <TaskBar windowConfig={windowConfig} />

      <Alert
        show={showAlert}
        handleClose={() => setShowAlert(false)}
        message="Internet bağlantısı bulunamadı"
      />
      {showRansom && <RansomScreen />}
    </div>
  );
};

export default Desktop;
