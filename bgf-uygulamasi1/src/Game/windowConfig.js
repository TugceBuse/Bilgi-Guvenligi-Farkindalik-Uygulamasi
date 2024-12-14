import Browser from './Browser/Browser';
import Mailbox from './Mailbox/Mailbox';
import ITsupport from './ITsupport/ITsupport';
import Todolist from './Todolist/Todolist';
import Folder from './Folder/Folder';
import Scanner from './Scanner/Scanner';
import { useTodoList } from './Todolist/Todolist';
import { useMailbox } from './Mailbox/Mailbox';
import { useBrowser } from './Browser/Browser';
import { useITsupport } from './ITsupport/ITsupport';
import { useFolder } from './Folder/Folder';
import { useScanner } from './Scanner/Scanner';

const windowConfig = () => {
  const todoListHandlers = useTodoList();
  const mailboxHandlers = useMailbox();
  const browserHandlers = useBrowser();
  const itSupportHandlers = useITsupport();
  const folderHandlers = useFolder();
  const scannerHandlers = useScanner();

  return {
    todolist: {
      icon: '/icons/to-do-list.png',
      label: 'To Do List',
      component: Todolist,
      ...todoListHandlers,
    },
    mailbox: {
      icon: '/icons/mail.png',
      label: 'Mail',
      component: Mailbox,
      ...mailboxHandlers,
    },
    browser: {
      icon: '/icons/internet.png',
      label: 'Browser',
      component: Browser,
      ...browserHandlers,
    },
    itsupport: {
      icon: '/icons/it-support.png',
      label: 'IT Support',
      component: ITsupport,
      ...itSupportHandlers,
    },
    folder: {
      icon: '/icons/folder.png',
      label: 'Folder',
      component: Folder,
      ...folderHandlers,
    },
    scanner: {
      icon: '/icons/scanner.png',
      label: 'Scanner',
      component: Scanner,
      ...scannerHandlers,
    },
  };
};

export default windowConfig;