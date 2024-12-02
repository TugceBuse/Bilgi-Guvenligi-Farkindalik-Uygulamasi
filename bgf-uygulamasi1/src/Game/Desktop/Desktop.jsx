import React from 'react';
import './Desktop.css';
import { useState,useEffect } from 'react';

import Mailbox, { useMailbox } from '../Mailbox/Mailbox';
import Todolist, { useTodoList } from '../Todolist/Todolist';
import Browser, { useBrowser } from '../Browser/Browser';
import ITsupport, { useITsupport } from '../ITsupport/ITsupport';
import Folder, { useFolder } from '../Folder/Folder';

import Alert from '../Notifications/Alert';
import { useGameContext } from '../Context';
import RansomScreen from '../Notifications/Ransom';



// Masaüstü bileşeni
const Desktop = () => {


  const { openMailbox, closeMailbox } = useMailbox();
  const { openBrowser, closeBrowser} = useBrowser();
  const { openTodoList, closeTodoList} = useTodoList();
  const { openITsupport, closeITsupport} = useITsupport();
  const { openFolder, closeFolder} = useFolder();


  const {
    openWindows, activeWindow,
    handleIconClick, isWificonnected,
    zindex , setZindex,
    isransomware, setIsransomware
        } = useGameContext();


  const [showRansom , setShowRansom] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Masaüstü bileşeni yüklendiğinde sayfayı kaydırmayı engelle
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const calculateWindowPosition = (index) => {
    const offset = 30;
    const initialLeft = window.innerWidth / 10;
    const initialTop = window.innerHeight / 10;
    let zindex = 100 + index;
    return {
      left: `${initialLeft + index * offset}px`,
      top: `${initialTop + index * offset}px`,
      zIndex: zindex
    };

    }
  
  

  //TodoList'in başlangıç durumu
  const [todos, setTodos] = useState([
    { text: "Yeni kurduğumuz ağ aktif olmalı,", completed: false },
    { text: 'Yapılacak 2', completed: false },
    { text: 'Yapılacak 3', completed: false },
]);

  useEffect(() => {
    if(openWindows.length === 0){
      setZindex(100);
    }
  },[openWindows]);

  useEffect(() => {
    if (isransomware) {
      const randomDelay = Math.floor(Math.random() * 20000) + 10000; // 10 ila 30 saniye arasında rastgele bir süre
      const timer = setTimeout(() => {
        setShowRansom(true);
      }, randomDelay);
      return () => clearTimeout(timer);
    }
  }, [isransomware]);

  useEffect(() => {
    let audio;
    if (showRansom) {
      audio = new Audio('/audio/ransomware.m4a');
      audio.play();
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [showRansom]);

  // masaüstü uygulamalarına  tıklandığında açar
  const handleDesktopClick = (windowName, openComponent) => {
    if (!openWindows.includes(windowName)) {//eğer bileşen açık değilse aç
      //eğer internet gerekli bileşen varsa ekle
      if (windowName === 'browser' || windowName === 'mailbox') {//browser ve mailbox için internet gerekli
        if (isWificonnected) {
          let newZindex = zindex + 1;
          setZindex(newZindex);
          openComponent();
          handleIconClick(windowName);
        } else {
          setShowAlert(true);
        }
      } else {
        let newZindex = zindex + 1;
        setZindex(newZindex);
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
        <div className="icon" onClick={() => handleDesktopClick('folder', openFolder)}>
          <img src="/icons/folder.png" alt="Folder Icon" />
          <span>Folder</span>
        </div>
      </div>



      {/* Bileşenler */}
      {openWindows.includes('browser') &&
       <Browser
          closeBrowser={closeBrowser}
          style={{
            ...calculateWindowPosition(openWindows.indexOf('browser'))
          }}
        />} 
      {openWindows.includes('mailbox') &&
       <Mailbox
          closeMailbox={closeMailbox}
          style={{
            ...calculateWindowPosition(openWindows.indexOf('mailbox'))
          }} 
        />} 
      {openWindows.includes('itsupport') &&
       <ITsupport
          closeITsupport={closeITsupport}
          style={{
            ...calculateWindowPosition(openWindows.indexOf('itsupport'))
          }} 
        />} 
      {openWindows.includes('todolist') &&
       <Todolist
          todos={todos}
          setTodos={setTodos}
          closeTodoList={closeTodoList}
          style={{
            ...calculateWindowPosition(openWindows.indexOf('todolist'))
          }} 
        />}
      {openWindows.includes('folder') &&
       <Folder
          closeFolder={closeFolder}
          style={{
            ...calculateWindowPosition(openWindows.indexOf('folder'))
          }} 
       />} 
      
      <Alert
       show={showAlert}
       handleClose={() => setShowAlert(false)}
       message={'Internete bağlantısı bulunamadı'} 
       />


      { showRansom && <RansomScreen/> }
      
    </div>
  );
};

export default Desktop;
