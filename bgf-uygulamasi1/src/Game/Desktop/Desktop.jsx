import React, { useState, useEffect } from 'react';
import './Desktop.css';

import Mailbox, { useMailbox } from '../Mailbox/Mailbox';
import Todolist, { useTodoList } from '../Todolist/Todolist';
import Browser, { useBrowser } from '../Browser/Browser';
import ITsupport, { useITsupport } from '../ITsupport/ITsupport';
import Folder, { useFolder } from '../Folder/Folder';
import Scanner, { useScanner } from '../Scanner/Scanner';

import Alert from '../Notifications/Alert';
import { useGameContext } from '../Context/GameContext';
import { useUIContext } from '../Context/UIContext';
import RansomScreen from '../Notifications/Ransom';

// Pencereler için yapılandırma nesnesi
const windowConfig = {
  todolist: {
    icon: '/icons/to-do-list.png',
    label: 'To Do List',
    component: Todolist,
  },
  mailbox: {
    icon: '/icons/mail.png',
    label: 'Mail',
    component: Mailbox,
  },
  browser: {
    icon: '/icons/internet.png',
    label: 'Browser',
    component: Browser,
  },
  itsupport: {
    icon: '/icons/helpdesk.png',
    label: 'IT Support',
    component: ITsupport,
  },
  folder: {
    icon: '/icons/folder.png',
    label: 'Folder',
    component: Folder,
  },
  scanner: {
    icon: '/icons/qr-code.png',
    label: 'QR Scanner',
    component: Scanner,
  },
};

const Desktop = () => {
  const { isWificonnected, isransomware } = useGameContext();
  const { openWindows, handleIconClick, zindex, setZindex } = useUIContext();

  const { openMailbox, closeMailbox } = useMailbox();
  const { openBrowser, closeBrowser } = useBrowser();
  const { openTodoList, closeTodoList } = useTodoList();
  const { openITsupport, closeITsupport } = useITsupport();
  const { openFolder, closeFolder } = useFolder();
  const { openScanner, closeScanner } = useScanner();

  const [showRansom, setShowRansom] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // TodoList başlangıç durumu
  const [todos, setTodos] = useState([
    { text: 'Yeni kurduğumuz ağ aktif olmalı', completed: false },
    { text: 'Yapılacak 2', completed: false },
    { text: 'Yapılacak 3', completed: false },
  ]);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    if (isransomware) {
      const randomDelay = Math.floor(Math.random() * 20000) + 10000; // 10-30 saniye
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

  useEffect(() => {
    if (openWindows.length === 0) {
      setZindex(100);
    }
  }, [openWindows]);

  const calculateWindowPosition = (index) => ({
    left: `${window.innerWidth / 10 + index * 30}px`,
    top: `${window.innerHeight / 10 + index * 30}px`,
    zIndex: 100 + index,
  });

  const handleDesktopClick = (windowKey) => {
    if (!openWindows.includes(windowKey)) {
      const { openHandler } = getHandlers(windowKey);
      if ((windowKey === 'browser' || windowKey === 'mailbox') && !isWificonnected) {
        setShowAlert(true);
      } else {
        openHandler();
        handleIconClick(windowKey);
        setZindex((prevZIndex) => prevZIndex + 1);
      }
    }
  };

  const getHandlers = (windowKey) => {
    const handlers = {
      browser: { openHandler: openBrowser, closeHandler: closeBrowser },
      mailbox: { openHandler: openMailbox, closeHandler: closeMailbox },
      todolist: { openHandler: openTodoList, closeHandler: closeTodoList },
      itsupport: { openHandler: openITsupport, closeHandler: closeITsupport },
      folder: { openHandler: openFolder, closeHandler: closeFolder },
      scanner: { openHandler: openScanner, closeHandler: closeScanner },
    };
    return handlers[windowKey];
  };

  return (
    <div className="desktop">
      {/* Masaüstü ikonları */}
      <div className="desktop-icons">
        {Object.keys(windowConfig).map((key) => (
          <div
            key={key}
            className="icon"
            onClick={() => handleDesktopClick(key)}
          >
            <img src={windowConfig[key].icon} alt={`${windowConfig[key].label} Icon`} />
            <span>{windowConfig[key].label}</span>
          </div>
        ))}
      </div>

      {/* Açık pencereler */}
      {openWindows.map((windowKey, index) => {
        const { component: WindowComponent } = windowConfig[windowKey];
        const { closeHandler } = getHandlers(windowKey);
        return (
          <WindowComponent
            key={windowKey}
            closeHandler={closeHandler}
            style={calculateWindowPosition(index)}
            todos={windowKey === 'todolist' ? todos : undefined}
            setTodos={windowKey === 'todolist' ? setTodos : undefined}
          />
        );
      })}

      {/* Uyarılar ve Ransomware */}
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
