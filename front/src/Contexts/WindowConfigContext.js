import React, { createContext, useContext, useState } from 'react';
import Mailbox, { useMailbox } from '../components/Mailbox/Mailbox';
import Todolist, { useTodoList } from '../components/Todolist/Todolist';
import Browser, { useBrowser } from '../components/Browser/Browser';
import ChatApp, { useChatApp } from '../components/ChatApp/ChatApp';
import Folder, { useFolder } from '../components/Folder/Folder';
import Scanner, { useScanner } from '../components/Scanner/Scanner';
import Antivirus, { useAntivirus } from '../components/Antivirus/Antivirus';

const WindowConfigContext = createContext();

const initialWindowConfig = {
  todolist: {
    icon: '/icons/to-do-list.png',
    label: 'To Do List',
    component: Todolist,
    useComponent: useTodoList,
    location: 'desktop',
    available: true,
  },
  mailbox: {
    icon: '/icons/mail.png',
    label: 'Mail',
    component: Mailbox,
    useComponent: useMailbox,
    location: 'desktop',
    available: true,
  },
  browser: {
    icon: '/icons/internet.png',
    label: 'Browser',
    component: Browser,
    useComponent: useBrowser,
    location: 'desktop',
    available: true,
  },
  chatapp: {
    icon: '/icons/speak.png',
    label: 'Sohbet',
    component: ChatApp,
    useComponent: useChatApp,
    location: 'desktop',
    available: true,
  },
  folder: {
    icon: '/icons/folder.png',
    label: 'Folder',
    component: Folder,
    useComponent: useFolder,
    location: 'desktop',
    available: true,
  },
  scanner: {
    icon: '/icons/qr-code.png',
    label: 'QR Scanner',
    component: Scanner,
    useComponent: useScanner,
    location: 'desktop',
    available: true,
  },
  antivirus: {
    icon: '/icons/shieldSecure.png',
    label: 'Antivirus',
    component: Antivirus,
    useComponent: useAntivirus,
    location: 'desktop',
    available: false,
  },
};

export const WindowConfigProvider = ({ children }) => {
  const [windowConfig, setWindowConfig] = useState(initialWindowConfig);

  const updateAvailableStatus = (windowName, available) => {
    setWindowConfig((prevConfig) => ({
      ...prevConfig,
      [windowName]: {
        ...prevConfig[windowName],
        available,
      },
    }));
  };

  return (
    <WindowConfigContext.Provider value={{ windowConfig, updateAvailableStatus }}>
      {children}
    </WindowConfigContext.Provider>
  );
};

export const useWindowConfig = () => useContext(WindowConfigContext);
