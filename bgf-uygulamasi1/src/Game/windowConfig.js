import React, { useState } from 'react';
import Mailbox, { useMailbox } from './Mailbox/Mailbox';
import Todolist, { useTodoList } from './Todolist/Todolist';
import Browser, { useBrowser } from './Browser/Browser';
import ITsupport, { useITsupport } from './ITsupport/ITsupport';
import Folder, { useFolder } from './Folder/Folder';
import Scanner, { useScanner } from './Scanner/Scanner';
import Setup, { useSetup } from './Setup/Setup';
import Antivirus, { useAntivirus } from './Antivirus/Antivirus';

// Başlangıç windowConfig
const initialWindowConfig = {
  todolist: {
    icon: '/icons/to-do-list.png',
    label: 'To Do List',
    component: Todolist,
    useComponent: useTodoList,
    downloaded: true,
  },
  mailbox: {
    icon: '/icons/mail.png',
    label: 'Mail',
    component: Mailbox,
    useComponent: useMailbox,
    downloaded: true,
  },
  browser: {
    icon: '/icons/internet.png',
    label: 'Browser',
    component: Browser,
    useComponent: useBrowser,
    downloaded: true,
  },
  itsupport: {
    icon: '/icons/helpdesk.png',
    label: 'IT Support',
    component: ITsupport,
    useComponent: useITsupport,
    downloaded: true,
  },
  folder: {
    icon: '/icons/folder.png',
    label: 'Folder',
    component: Folder,
    useComponent: useFolder,
    downloaded: true,
  },
  scanner: {
    icon: '/icons/qr-code.png',
    label: 'QR Scanner',
    component: Scanner,
    useComponent: useScanner,
    downloaded: true,
  },
  antivirus: {
    icon: '/icons/shieldSecure.png',
    label: 'Antivirus',
    component: Antivirus,
    useComponent: useAntivirus,
    downloaded: false,
  },
};

// windowConfig'i state olarak yönetmek için hook
export const useWindowConfigState = () => {
  const [windowConfig, setWindowConfig] = useState(initialWindowConfig);

  // Belirli bir pencerenin downloaded durumunu güncelle
  const updateDownloadedStatus = (key, downloaded) => {
    setWindowConfig((prevConfig) => ({
      ...prevConfig,
      [key]: {
        ...prevConfig[key],
        downloaded,
      },
    }));
  };

  return { windowConfig, updateDownloadedStatus };
};
