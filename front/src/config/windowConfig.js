import React, { useState } from 'react';
import Mailbox, { useMailbox } from '../components/Mailbox/Mailbox';
import Todolist, { useTodoList } from '../components/Todolist/Todolist';
import Browser, { useBrowser } from '../components/Browser/Browser';
import ITsupport, { useITsupport } from '../components/ITsupport/ITsupport';
import Folder, { useFolder } from '../components/Folder/Folder';
import Scanner, { useScanner } from '../components/Scanner/Scanner';
import Antivirus, { useAntivirus } from '../components/Antivirus/Antivirus';
import Setup,{ useSetup } from '../components/Setup/Setup';

// Başlangıç windowConfig
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
  itsupport: {
    icon: '/icons/helpdesk.png',
    label: 'IT Support',
    component: ITsupport,
    useComponent: useITsupport,
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
  setup: {
    icon: '/icons/setting.png',
    label: 'Antivirus Setup',
    component: Setup,
    useComponent: useSetup,
    location: 'downloads',
    available: true,
  }
};

// windowConfig'i state olarak yönetmek için hook
export const useWindowConfigState = () => {
  const [windowConfig, setWindowConfig] = useState(initialWindowConfig);

  // Belirli bir pencerenin available durumunu güncelle
  const updateAvailableStatus = (windowName, available) => {
    setWindowConfig((prevConfig) => ({
      ...prevConfig,
      [windowName]: {
        ...prevConfig[windowName],
        available,
      },
    }));
  };

  return { windowConfig, updateAvailableStatus };
};
