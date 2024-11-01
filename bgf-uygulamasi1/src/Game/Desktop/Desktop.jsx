import React from 'react';
import './Desktop.css';
import { useState,useEffect } from 'react';
import Mailbox, { useMailbox } from '../Mailbox/Mailbox';
import Todolist, { useTodoList } from '../Todolist/Todolist';
import Browser, { useBrowser } from '../Browser/Browser';
import Alert from '../Notifications/Alert';

// Masaüstü bileşeni
const Desktop = ({isWificonnected}) => {
  //baglanti olup olmadıgı ama bu kontrol değişkeni aynı zamanda
  // const [isWificonnected, setIsWificonnected] = useState(false);
  //Mailbox fonksiyonlarını kullanabilmek için import ettik
  const { isMailboxOpen, openMailbox, closeMailbox } = useMailbox();
  const {isBrowserOpen, openBrowser, closeBrowser} = useBrowser();
  const {isTodoListOpen, openTodoList, closeTodoList} = useTodoList();
  const [showAlert, setShowAlert] = useState(false);
  

  //TodoList'in başlangıç durumu
  const [todos, setTodos] = useState([
    { text: "Yeni kurduğumuz ağ aktif olmalı,", completed: false },
    { text: 'Yapılacak 2', completed: false },
    { text: 'Yapılacak 3', completed: false },
]);

  // Alert penceresi kapa
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  //recycleBin penceresini açmak için state tanımladık
  const [openWindow, setOpenWindow] = useState(null);
  const handleIconClick = (windowName) => {
    setOpenWindow(windowName);
  }
  
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



          <div className="icon" onClick={() => handleIconClick('recycleBin')}>
            <img src="/icons/recycle-bin.png" alt="Recycle Bin Icon" />
            <span>Recycle Bin</span>
          </div>
        </div>

        
        {openWindow === 'recycleBin' && (
        <div className="window">
          <h2>Recycle Bin</h2>
          <button onClick={() => setOpenWindow(null)}>Close</button>

          <div className="window-content">
            {/* Geri dönüşüm kutusu içeriği */}
            <p>Here is the content of the Recycle Bin.</p>
          </div>    
        </div>
      )}


      {/* Mailbox penceresi */}
      {isBrowserOpen && isWificonnected && <Browser closeBrowser={closeBrowser} />}
      {isMailboxOpen && isWificonnected && <Mailbox closeMailbox={closeMailbox} />}
      <Alert show={showAlert} handleClose={() => setShowAlert(false)} message={'Internete bağlantısı bulunamadı'}></Alert>
      {/* To Do List penceresi */}
      {isTodoListOpen && <Todolist todos={todos} setTodos={setTodos} closeTodoList={closeTodoList}/>}

    </div>);
};

export default Desktop;
