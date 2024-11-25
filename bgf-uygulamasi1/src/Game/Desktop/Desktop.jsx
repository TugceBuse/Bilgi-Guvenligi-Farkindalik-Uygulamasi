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
  const [zIndex, setZIndex] = useState(100);

  const {openWindows, activeWindow, handleIconClick, isWificonnected} = useGameContext();
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

  useEffect(() => {
    if(openWindows.length === 0){
      setZIndex(100);
    }
  },[openWindows]);

  // masaüstü uygulamalarına  tıklandığında açar
  const handleDesktopClick = (windowName, openComponent) => {
    if (!openWindows.includes(windowName)) {//eğer bileşen açık değilse aç
      //eğer internet gerekli bileşen varsa ekle
      if (windowName === 'browser' || windowName === 'mailbox') {//browser ve mailbox için internet gerekli
        if (isWificonnected) {
          setZIndex((prevZIndex) => prevZIndex + 1);
          console.log(`Opening ${windowName} with zIndex: ${zIndex + 1}`);
          openComponent();
          handleIconClick(windowName);
        } else {
          setShowAlert(true);
        }
      } else {
        setZIndex((prevZIndex) => prevZIndex + 1);
        console.log(`Opening ${windowName} with zIndex: ${zIndex + 1}`);
        openComponent();
        handleIconClick(windowName);
      }
    }
  };
  
  return (
    //masaüstü içeriği
    <div className="desktop">
      <div className="desktop-icons">
        <div className="icon" onClick={() => handleDesktopClick('todolist', openTodoList)}>
          <img src="/icons/to-do-list.png" alt="Todolist Icon" />
          <span>To Do List</span>
        </div>
        <div className="icon" onClick={() => handleDesktopClick('mailbox', openMailbox)}>
          <img src="/icons/mail.png" alt="Mail Icon" />
          <span>Mail</span>
        </div>
        <div className="icon" onClick={() => handleDesktopClick('browser', openBrowser)}>
          <img src="/icons/internet.png" alt="Internet Icon" />
          <span>Browser</span>
        </div>
        <div className="icon" onClick={() => handleDesktopClick('itsupport', openITsupport)}>
          <img src="/icons/helpdesk.png" alt="IT Support Icon" />
          <span>IT Support</span>
        </div>
      </div>



      {/* Bileşenler */}
      {openWindows.includes('browser') && <Browser closeBrowser={closeBrowser} style={{ zIndex: zIndex }} />}
      {openWindows.includes('mailbox') && <Mailbox closeMailbox={closeMailbox} style={{ zIndex: zIndex }} />}
      {openWindows.includes('itsupport') && <ITsupport closeITsupport={closeITsupport} style={{ zIndex: zIndex }} />}
      {openWindows.includes('todolist') && <Todolist todos={todos} setTodos={setTodos} closeTodoList={closeTodoList} style={{ zIndex: zIndex }}/>}
      
      <Alert show={showAlert} handleClose={() => setShowAlert(false)} message={'Internete bağlantısı bulunamadı'} />
  
      

    </div>);
};

export default Desktop;
