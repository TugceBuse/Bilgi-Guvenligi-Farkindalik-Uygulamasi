// windowConfig.js
import Mailbox, { useMailbox } from './Mailbox/Mailbox';
import Todolist, { useTodoList } from './Todolist/Todolist';
import Browser, { useBrowser } from './Browser/Browser';
import ITsupport, { useITsupport } from './ITsupport/ITsupport';
import Folder, { useFolder } from './Folder/Folder';
import Scanner, { useScanner } from './Scanner/Scanner';
import Setup, { useSetup } from './Setup/Setup';

// Ortak konfigürasyon dosyası
export const windowConfig = {
  todolist: {
    icon: '/icons/to-do-list.png',
    label: 'To Do List',
    component: Todolist,
    useComponent: useTodoList,
  },
  mailbox: {
    icon: '/icons/mail.png',
    label: 'Mail',
    component: Mailbox,
    useComponent: useMailbox,
  },
  browser: {
    icon: '/icons/internet.png',
    label: 'Browser',
    component: Browser,
    useComponent: useBrowser,
  },
  itsupport: {
    icon: '/icons/helpdesk.png',
    label: 'IT Support',
    component: ITsupport,
    useComponent: useITsupport,
  },
  folder: {
    icon: '/icons/folder.png',
    label: 'Folder',
    component: Folder,
    useComponent: useFolder,
  },
  scanner: {
    icon: '/icons/qr-code.png',
    label: 'QR Scanner',
    component: Scanner,
    useComponent: useScanner,
  },
  setup: {
    icon: '/icons/setting.png',
    label: 'Setup',
    component: Setup,
    useComponent: useSetup,
  },
};
