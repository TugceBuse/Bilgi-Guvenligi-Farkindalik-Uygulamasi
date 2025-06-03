import React, { useState, useEffect } from 'react';
import './Desktop.css';
import { useWindowConfig }  from '../../Contexts/WindowConfigContext'
import { useUIContext } from '../../Contexts/UIContext';
import { useGameContext } from '../../Contexts/GameContext';
import { useFileContext } from '../../Contexts/FileContext';
import TaskBar from '../TaskBar/TaskBar';
import Alert from '../Notifications/Alert';
import RansomScreen from '../Notifications/Ransom';
import FileOpener from '../../viewers/FileOpener';
import { TodoProvider } from '../../Contexts/TodoContext';
import { useVirusContext } from '../../Contexts/VirusContext';
import TaskApp from '../TaskApp/TaskApp';
import PopupThrower from '../PopupThrower/PopupThrower';

const Desktop = () => {
  const { isWificonnected, isransomware } = useGameContext();
  const { openWindows, visibleWindows, handleIconClick, zindex, setZindex, windowProps } = useUIContext();
  const { openedFiles, closeFile, files } = useFileContext();
  const { viruses } = useVirusContext();

  const [showAlert, setShowAlert] = useState(false);

  const { windowConfig } = useWindowConfig();

  // Yeni pencere konumlarını tutacak state
  const [windowPositions, setWindowPositions] = useState({});

  // handlers nesnesini dinamik oluşturma
  const handlers = Object.keys(windowConfig).reduce((acc, key) => {
    acc[key] = windowConfig[key].useComponent();
    return acc;
  }, {});

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  // ✅ Açık olan pencere sırasına göre pozisyon belirleme
  useEffect(() => {
    setWindowPositions((prevPositions) => {
      let updatedPositions = { ...prevPositions };

      visibleWindows.forEach((windowKey, index) => {
        if (!updatedPositions[windowKey]) {
          updatedPositions[windowKey] = {
            left: `${window.innerWidth / 10 + index * 30}px`,
            top: `${window.innerHeight / 10 + index * 30}px`,
            zIndex: 100 + index,
          };
          console.log('windowpositions:', updatedPositions[windowKey], 'zindex:', 100 + index);
          
        }
      });

      return updatedPositions;
    });
    setZindex((prevZindex) => prevZindex + 1);
  }, [visibleWindows]);

  useEffect(() => {
    if (openWindows.length === 0 && openedFiles.length === 0) {
      setWindowPositions({});
      setZindex(100);
    }
  }, [openWindows, openedFiles]);

  const handleDesktopClick = (windowKey) => {
    const { openHandler } = handlers[windowKey];
    if (!openHandler) {
      console.error(`openHandler is not defined for ${windowKey}`);
      return;
    }
    if (!openWindows.includes(windowKey)) {
      const requiresInternet = windowConfig[windowKey]?.requiresInternet;
      if (requiresInternet && !isWificonnected) {
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

        {/* 🪟 Pencere ikonları */}
        {Object.keys(windowConfig)
          .filter((key) => windowConfig[key].available && windowConfig[key].location === 'desktop')
          .map((key) => (
            <div
              key={key}
              className="icon"
              {...(windowConfig[key].clickable && { onClick: () => handleDesktopClick(key) })}
            >
              <img src={windowConfig[key].icon} alt={`${windowConfig[key].label} Icon`} />
              <span>{windowConfig[key].label}</span>
            </div>
          ))}

        {/* 📂 Dosya ikonları */}
        {Object.entries(files)
          .filter(([_, file]) => file.available && file.location === 'desktop')
          .map(([fileName, file]) => (
            <div
              key={fileName}
              className="icon"
              {...(file.clickable && { onClick: () => handleDesktopClick(fileName) })}
            >
              <img src={file.icon} alt={`${file.label} Icon`} />
              <span>{file.label}</span>
            </div>
          ))}
      </div>


      <TodoProvider>
        {/* 📂 **Açılan Uygulamalar (windowConfig içindekiler) ** */}
        {openWindows.map((windowKey) => {
          if (!windowConfig[windowKey]) return null;
          const { component: WindowComponent } = windowConfig[windowKey];
          const { closeHandler } = handlers[windowKey];
          const props = windowProps[windowKey] || {}; // 👈 ekstra props al

          return (
            <WindowComponent
              key={windowKey}
              closeHandler={closeHandler}
              style={windowPositions[windowKey] || {}}
              {...props} // 👈 props'u geçir
            />
          );
        })}


        {/* 📂 **Açılan Dosyalar İçin Pencere Yönetimi** */}
        {openedFiles.map((fileName) => {
          const file = files[fileName];
          return (
            <div key={fileName} className="window file-window" 
            style={windowPositions[fileName] || {}}
            >
              <FileOpener file={file} fileName={fileName} {...(windowProps[fileName] || {})}/>
            </div>
          );
        })}
      </TodoProvider>

      <TaskBar windowConfig={windowConfig} />

      <Alert
        show={showAlert}
        handleClose={() => setShowAlert(false)}
        message="Internet bağlantısı bulunamadı"
      />
      {viruses.some(v => v.type === 'adware') && <PopupThrower/>}
      {viruses.some(v => v.type === 'ransomware') && <RansomScreen />}
      <TaskApp />
    </div>
  );
};

export default Desktop;
