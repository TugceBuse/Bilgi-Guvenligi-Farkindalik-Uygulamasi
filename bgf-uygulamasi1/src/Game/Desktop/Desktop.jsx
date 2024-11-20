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


  const { isMailboxOpen, openMailbox, closeMailbox } = useMailbox();
  const {isBrowserOpen, openBrowser, closeBrowser} = useBrowser();
  const {isTodoListOpen, openTodoList, closeTodoList} = useTodoList();
  const {isITsupportOpen, openITsupport, closeITsupport} = useITsupport();


  const {isWificonnected} = useGameContext();
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
  useEffect(() => {
    if ((isMailboxOpen||isBrowserOpen) && !isWificonnected) {
      setShowAlert(true);
      closeMailbox();
      closeBrowser();
    }
  }, [isMailboxOpen,isBrowserOpen, isWificonnected]);

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

  
  return (

    <div className="desktop">

      {/* Masaüstü Arka Planı */}
        <div className="desktop-icons">
          {/* Masaüstü simgeleri */}
          <div className="icon" onClick={openTodoList}>
            <img src="/icons/to-do-list.png" alt="Todolist Icon" />
            <span>To Do List</span>
          </div>

          <div className="icon" onClick={openMailbox}>
            <img src="/icons/mail.png" alt="Mail Icon" />
            <span>Mail</span>
          </div>

          <div className="icon" onClick={openBrowser}>
            <img src="/icons/internet.png" alt="Internet Icon" />
            <span>Browser</span>
          </div>



          <div className="icon" onClick={openITsupport}>
            <img src="/icons/helpdesk.png" alt="IT Support Icon" />
            <span>IT Support</span>
          </div>
        </div>



      {/* Mailbox penceresi */}
      {isBrowserOpen && isWificonnected && <Browser closeBrowser={closeBrowser} />}
      {isMailboxOpen && isWificonnected && <Mailbox closeMailbox={closeMailbox} />}
      {isITsupportOpen && <ITsupport closeITsupport={closeITsupport} />}
      <Alert show={showAlert} handleClose={() => setShowAlert(false)} message={'Internete bağlantısı bulunamadı'}></Alert>
      {/* To Do List penceresi */}
      {isTodoListOpen && <Todolist todos={todos} setTodos={setTodos} closeTodoList={closeTodoList}/>}

    </div>);
};

export default Desktop;
