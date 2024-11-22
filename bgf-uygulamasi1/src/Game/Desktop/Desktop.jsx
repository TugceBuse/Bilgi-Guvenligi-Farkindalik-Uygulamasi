import React from 'react';
import './Desktop.css';
import { useState,useEffect } from 'react';

import Mailbox, { useMailbox } from '../Mailbox/Mailbox';
import Todolist, { useTodoList } from '../Todolist/Todolist';
import Browser, { useBrowser } from '../Browser/Browser';
import ITsupport, { useITsupport } from '../ITsupport/ITsupport';

import Alert from '../Notifications/Alert';
import { useGameContext } from '../Context';


// Masaüstü bileşeni
const Desktop = () => {


  const { openMailbox, closeMailbox } = useMailbox();
  const { openBrowser, closeBrowser} = useBrowser();
  const { openTodoList, closeTodoList} = useTodoList();
  const { openITsupport, closeITsupport} = useITsupport();


  const {openWindows, activeWindow, isWificonnected} = useGameContext();
  const [showAlert, setShowAlert] = useState(false);

  // Masaüstü bileşeni yüklendiğinde sayfayı kaydırmayı engelle
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);
  
  

  //TodoList'in başlangıç durumu
  const [todos, setTodos] = useState([
    { text: "Yeni kurduğumuz ağ aktif olmalı,", completed: false },
    { text: 'Yapılacak 2', completed: false },
    { text: 'Yapılacak 3', completed: false },
]);

  // Mailbox penceresi açıldığında internet bağlantısı kontrolü
  // Eğer internet bağlantısı yoksa kullanıcıya alert gösterir
  // useEffect(() => {
  //   if ((isMailboxOpen||isBrowserOpen) && !isWificonnected) {
  //     setShowAlert(true);
  //     closeMailbox();
  //     closeBrowser();
  //   }
  // }, [isMailboxOpen,isBrowserOpen, isWificonnected]);

  // Sağ tıklamayı engellemek ve sol click tetikleme
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      // Sağ tıklama yapıldığında sol tıklama olayını tetikleyin
      // event.target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    };

    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // masaüstü uygulamalarına  tıklandığında açar
  const handleIconClick = (windowName, openFunction) => {
    if (!openWindows.includes(windowName)) {
      //eğer internet gerekli bileşen varsa ekle
      if (windowName === 'browser' || windowName === 'mailbox') {
        if (isWificonnected) {
          openFunction();
        } else {
          setShowAlert(true);
        }
      } else {
        openFunction();
      }
    }
  };

  return (
    //masaüstü içeriği
    <div className="desktop">
      <div className="desktop-icons">
        <div className="icon" onClick={() => handleIconClick('todolist', openTodoList)}>
          <img src="/icons/to-do-list.png" alt="Todolist Icon" />
          <span>To Do List</span>
        </div>
        <div className="icon" onClick={() => handleIconClick('mailbox', openMailbox)}>
          <img src="/icons/mail.png" alt="Mail Icon" />
          <span>Mail</span>
        </div>
        <div className="icon" onClick={() => handleIconClick('browser', openBrowser)}>
          <img src="/icons/internet.png" alt="Internet Icon" />
          <span>Browser</span>
        </div>
        <div className="icon" onClick={() => handleIconClick('itsupport', openITsupport)}>
          <img src="/icons/helpdesk.png" alt="IT Support Icon" />
          <span>IT Support</span>
        </div>
      </div>



      {/* Bileşenler */}
      {openWindows.includes('browser') && <Browser closeBrowser={closeBrowser} />}
      {openWindows.includes('mailbox') && <Mailbox closeMailbox={closeMailbox} />}
      {openWindows.includes('itsupport') && <ITsupport closeITsupport={closeITsupport} />}
      {openWindows.includes('todolist') && <Todolist todos={todos} setTodos={setTodos} closeTodoList={closeTodoList}/>}
      <Alert show={showAlert} handleClose={() => setShowAlert(false)} message={'Internete bağlantısı bulunamadı'}></Alert>
  
      

    </div>);
};

export default Desktop;
